package com.example.demo.Controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;  // Logger import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class SignController {

    private static final Logger logger = LoggerFactory.getLogger(SignController.class);

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public int signUp(@RequestBody User user) {
        logger.info("✅ 회원가입 요청 들어옴");
        logger.info("ID: {}, PW: {}", user.getUser_id(), user.getPassword());
        return userService.InsertUser(user);
    }

    // 로그인
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
    @PostMapping("/auth/google")
    public Map<String, Object> googleLogin(@RequestBody Map<String, String> payload) {
        
        String idToken = payload.get("idToken");
        logger.info("✅ 구글 로그인 요청 들어옴. idToken: {}", idToken);

        // (중요) 여기에 idToken을 검증하고, 
        // 이미 회원이면 JWT를 발급하고, 
        // 회원이 아니면 회원가입 처리 후 JWT를 발급하는 로직이 필요합니다.
        
        // --- (임시 응답) ---
        // 우선은 정상적으로 토큰을 받았다는 의미로 임시 JWT를 발급합니다.
        // 추후에 Google 토큰 검증 로직으로 교체해야 합니다.
        Map<String, Object> response = new HashMap<>();
        
        if (idToken != null && !idToken.isEmpty()) {
            // TODO: idToken 검증 로직 (e.g., GoogleIdTokenVerifier 사용)
            
            // 임시로 "가짜" JWT 토큰 발급
            String fakeJwt = "임시_JWT_토큰_입니다." + idToken.substring(0, 10); 
            
            response.put("success", true);
            response.put("access_token", fakeJwt); // Login.js가 이 키를 기다립니다.
            logger.info("구글 로그인 성공 (임시), JWT 발급: {}", fakeJwt);
        } else {
            response.put("success", false);
            response.put("message", "idToken이 없습니다.");
            logger.warn("구글 로그인 실패: idToken 없음");
        }
        
        return response;
    }
}
