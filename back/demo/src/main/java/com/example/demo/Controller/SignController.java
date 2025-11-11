package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory; // Logger import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Community;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import com.example.demo.Service.VerificationStore;
import com.example.demo.Service.CommunityService;
import com.example.demo.Service.MailService;


@RestController
// @CrossOrigin(origins = "http://192.168.219.202:8081")
// --------------------------------------------------------- 테스트중 주 아래다가 추가해
// 써보도록 안되면 위에꺼 교체해서 사용
@CrossOrigin(origins = {
        "http://192.168.219.101:8081",
        "http://192.168.219.102:8081",
        "http://192.168.219.202:8081",
        "http://192.168.219.116:8081",
        "http://10.42.56.241:8081",
        "http://localhost:8081"
})

public class SignController {

    private static final Logger logger = LoggerFactory.getLogger(SignController.class);

    @Autowired
    private UserService userService;
    @Autowired
    private CommunityService communityService;
    @Autowired
    private MailService mailService;
    @Autowired
    private VerificationStore verificationStore;

    // 회원가입------------------------------------------------------------------------------------------------
    @PostMapping("/signup")
    public int signUp(@RequestBody User user) {
        logger.info("✅ [회원가입 요청] ID: {}, PW: {}", user.getUser_id(), user.getPassword());
        try {
            boolean exists = userService.existsByUserId(user.getUser_id());
            if (exists) {
                logger.warn("🚫 [회원가입 실패] 이미 존재하는 아이디: {}", user.getUser_id());
                return 0;
            }
            int result = userService.InsertUser(user);
            if (result > 0) {
                logger.info("🎉 [회원가입 성공] ID: {}", user.getUser_id());
                return 1;
            } else {
                logger.error("⚠️ [회원가입 실패] DB 삽입 오류: {}", user.getUser_id());
                return 0;
            }
        } catch (Exception e) {
            logger.error("🔥 [회원가입 예외 발생] {}: {}", user.getUser_id(), e.getMessage());
            return 0;
        }
    }

    // 로그인------------------------------------------------------------------------------------------------
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        logger.info("✅ 로그인 요청 들어옴: {}", payload);
        String userId = payload.get("user_id");
        String password = payload.get("password");
        Map<String, Object> response = new HashMap<>();
        User user = userService.findByUserId(userId);
        if (user != null && user.getPassword().trim().equals(password.trim())) {
            response.put("success", true);
            response.put("name", user.getName());
            response.put("user_id", user.getUser_id());
            logger.info("로그인 성공: {}", user.getName());
        } else {
            response.put("success", false);
            response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            logger.warn("로그인 실패: userId={}, password={}", userId, password);
        }
        return response;
    }

    // 아이디 중복
    // 확인------------------------------------------------------------------------------------------------
    @GetMapping("/check-id/{userId}")
    public Map<String, Boolean> checkUserId(@PathVariable("userId") String userId) {
        logger.info("🧐 아이디 중복 확인 요청: {}", userId);

        boolean exists = userService.existsByUserId(userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        if (exists) {
            logger.warn("이미 존재하는 아이디: {}", userId);
        } else {
            logger.info("사용 가능한 아이디: {}", userId);
        }
        return response;
    }

    // 게시글------------------------------------------------------------------------------------------------
    @PostMapping("/write")
    public ResponseEntity<String> writePost(@RequestBody Community community) {
        logger.info("📝 [게시글 등록 요청] 제목: {}, 내용: {}", community.getTitle(), community.getContent());

        communityService.insertCommunity(community); //
        return ResponseEntity.ok("✅ 게시글 등록 성공!");
    }

    @GetMapping("/community/list")
    public ResponseEntity<List<Community>> getAllPosts() {
        logger.info("📋 [게시글 목록 조회 요청]");
        List<Community> list = communityService.getAllCommunity(); // DB에서 전체 게시글 조회
        return ResponseEntity.ok(list);
    }

    // 사용자 정보
    // 조회------------------------------------------------------------------------------------------
    @GetMapping("/users/info/{userId}")
    public ResponseEntity<User> getUserInfo(@PathVariable("userId") String userId) {
        logger.info("👤 [사용자 정보 요청] userId: {}", userId);

        User user = userService.findByUserId(userId);

        if (user != null) {
            logger.info("✅ [조회 성공] {}", user);
            return ResponseEntity.ok(user);
        } else {
            logger.warn("❌ [조회 실패] 사용자 없음: {}", userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 마이페이지
    // 수정------------------------------------------------------------------------------------------------
    @PutMapping("/users/update/{userId}")
    public ResponseEntity<String> updateUser(
            @PathVariable("userId") String userId,
            @RequestBody User updatedUser) {

        logger.info("✏️ [사용자 정보 수정 요청] ID: {}", userId);
        logger.info("📦 수정 데이터: {}", updatedUser);

        try {
            int result = userService.updateUser(userId, updatedUser);

            if (result > 0) {
                logger.info("✅ [수정 성공] {}", userId);
                return ResponseEntity.ok("정보가 수정되었습니다.");
            } else {
                logger.warn("⚠️ [수정 실패] {}", userId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패");
            }

        } catch (Exception e) {
            logger.error("🔥 [수정 중 오류 발생]: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
        }
    }

    // 아이디 찾기------------------------------------------------------------------------------------------------
    @PostMapping("/users/find-id")
    public ResponseEntity<?> findId(@RequestBody Map<String, String> body) {
        String name  = body.getOrDefault("name", "").trim();
        String contactOnly = body.getOrDefault("contact", "").replaceAll("\\D", "");
        String email = body.getOrDefault("email", "").trim();

        logger.info("🔎 [아이디 찾기] name={}, contact={}, email={}", name, contactOnly, email);

        try {
        	User u = userService.findByNameContactEmail(name, contactOnly, email);
            if (u != null) return ResponseEntity.ok(Map.of("user_id", u.getUser_id()));
            return ResponseEntity.ok(new HashMap<>()); // 못 찾으면 빈 응답
        } catch (Exception e) {
            logger.error("🔥 find-id 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "server error"));
        }
    }
    
 // ✅ 이메일 인증: 코드 발송 (검증은 나중에)
    @PostMapping("/auth/send-code")
    public ResponseEntity<?> sendCode(@RequestBody Map<String, Object> body) {
        String email = String.valueOf(body.get("email")).trim();
        logger.info("📨 [인증코드 발송] email={}", email);

        try {
            // 1) 코드 생성 & 저장(5분 유효)
        	String code = verificationStore.issue(email);

            // 2) 메일 발송 (제목/본문은 MailService.sendCode에서 고정 처리)
            mailService.sendCode(email, code);

            Map<String, Object> res = new HashMap<>();
            res.put("ok", true);
            return ResponseEntity.ok(res);

        } catch (IllegalStateException e) { // 과도한 요청 등 정책 위반 시
            logger.warn("⏱️ [인증코드 발송 제한] {}", e.getMessage());
            Map<String, Object> res = new HashMap<>();
            res.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(res);

        } catch (Exception e) {
            logger.error("🔥 [인증코드 발송 실패] {}", e.getMessage());
            Map<String, Object> res = new HashMap<>();
            res.put("message", "send fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
 // ✅ 이메일 인증: 코드 검증
    @PostMapping("/auth/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, Object> body) {
        String email = String.valueOf(body.get("email")).trim();
        String code  = String.valueOf(body.get("code")).trim();
        logger.info("✅ [인증코드 검증] email={}, code={}", email, code);

        try {
            boolean ok = verificationStore.verify(email, code); // 5분 TTL + 일치 확인(성공 시 1회성 삭제)
            Map<String, Object> res = new HashMap<>();
            res.put("verified", ok);

            if (ok) {
                return ResponseEntity.ok(res); // 200 { verified: true }
            } else {
                res.put("message", "invalid or expired code");
                return ResponseEntity.badRequest().body(res); // 400
            }
        } catch (Exception e) {
            logger.error("🔥 [인증 처리 오류] {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "server error"));
        }
    }


    

    }
    
    
    
    
    
    
    
    
    
    

