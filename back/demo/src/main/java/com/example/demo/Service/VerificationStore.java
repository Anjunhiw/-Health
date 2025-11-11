package com.example.demo.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 이메일 인증코드 임시 저장소 (메모리)
 * - issue(email): 6자리 코드 생성 & 5분 TTL 저장
 * - verify(email, code): 유효/일치 확인 (성공 시 1회성 사용 후 제거 + 검증완료 표시)
 * - consumeVerified(email): 검증완료 상태를 1회 소비(10분 TTL)
 */
@Service
public class VerificationStore {

    private static final Logger log = LoggerFactory.getLogger(VerificationStore.class);

    /** 인증코드 유효 5분 */
    private static final long TTL_SECONDS = 300;
    /** 검증완료 후 비밀번호 재설정 허용 시간 10분 */
    private static final long VERIFIED_TTL_SECONDS = 600;

    /** email -> 코드 엔트리 */
    private final Map<String, Entry> store = new ConcurrentHashMap<>();
    /** email -> 검증완료 만료시각(epoch sec) */
    private final Map<String, Long> verifiedEmails = new ConcurrentHashMap<>();

    private static class Entry {
        final String code;
        final long expiresAtEpochSec;
        Entry(String code, long expiresAtEpochSec) {
            this.code = code;
            this.expiresAtEpochSec = expiresAtEpochSec;
        }
        boolean expired() {
            return Instant.now().getEpochSecond() > expiresAtEpochSec;
        }
    }

    /** 인증코드 발급(저장) */
    public String issue(String email) {
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1_000_000));
        long exp = Instant.now().getEpochSecond() + TTL_SECONDS;
        store.put(email, new Entry(code, exp));
        log.warn("[TEST] code issued: email={}, code={}, ttlSec={}", email, code, TTL_SECONDS);
        return code;
    }

    /**
     * 인증코드 검증(성공 시 일회성 사용 + 검증완료 상태 기록)
     * 이후 10분 안에만 비밀번호 재설정 허용.
     */
    public boolean verify(String email, String code) {
        Entry e = store.get(email);
        if (e == null || e.expired()) {
            store.remove(email);
            return false;
        }
        boolean ok = e.code.equals(code);
        if (ok) {
            store.remove(email); // 코드 일회성 소진
            long until = Instant.now().getEpochSecond() + VERIFIED_TTL_SECONDS;
            verifiedEmails.put(email, until); // 검증완료 표시(10분)
        }
        return ok;
    }

    /**
     * 비밀번호 재설정 전에 호출: 검증완료 상태가 유효한지 확인하고 1회 소비
     */
    public boolean consumeVerified(String email) {
        Long until = verifiedEmails.get(email);
        long now = Instant.now().getEpochSecond();
        if (until == null || now > until) {
            verifiedEmails.remove(email);
            return false;
        }
        verifiedEmails.remove(email); // 1회 사용
        return true;
    }
}
