package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;  // Logger import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Community;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import com.example.demo.Service.CommunityService;

@RestController
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
@CrossOrigin(origins = "http://192.168.219.102:8081")
=======
@CrossOrigin(origins = "http://10.42.56.241:8081")
>>>>>>> Stashed changes
=======
@CrossOrigin(origins = "http://192.168.219.213:8081")
>>>>>>> Stashed changes
=======
@CrossOrigin(origins = "http://192.168.219.202:8081")
>>>>>>> Stashed changes
public class SignController {

    private static final Logger logger = LoggerFactory.getLogger(SignController.class);

    @Autowired
    private UserService userService;
    @Autowired
    private CommunityService communityService;
    
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
            logger.info("로그인 성공: {}", user.getName());
        } else {
            response.put("success", false);
            response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            logger.warn("로그인 실패: userId={}, password={}", userId, password);
        }
        return response;
    }
    // 아이디 중복 확인------------------------------------------------------------------------------------------------
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
        List<Community> list = communityService.getAllCommunity();  // DB에서 전체 게시글 조회
        return ResponseEntity.ok(list);
    }
    
    
    
    
    
}
