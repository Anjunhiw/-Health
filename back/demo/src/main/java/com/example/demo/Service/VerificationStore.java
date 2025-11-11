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
 * - verify(email, code): 유효/일치 확인 (성공 시 1회성 사용 후 제거)
 */
@Service
public class VerificationStore {

    private static final Logger log = LoggerFactory.getLogger(VerificationStore.class);

    /** 코드 유효시간(초) = 5분 */
    private static final long TTL_SECONDS = 300;

    /** email -> Entry */
    private final Map<String, Entry> store = new ConcurrentHashMap<>();

    private static class Entry {
        final String code;
        final long expiresAtEpochSec; // 만료시각(초)
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

        // 테스트 편의를 위한 로그 (운영 전 제거 권장)
        log.warn("[TEST] code issued: email={}, code={}, ttlSec={}", email, code, TTL_SECONDS);
        return code;
    }

    /** 인증코드 검증(성공 시 일회성 사용으로 제거) */
    public boolean verify(String email, String code) {
        Entry e = store.get(email);
        if (e == null || e.expired()) {
            store.remove(email);
            return false;
        }
        boolean ok = e.code.equals(code);
        if (ok) {
            store.remove(email); // 일회성 사용
        }
        return ok;
    }
}
