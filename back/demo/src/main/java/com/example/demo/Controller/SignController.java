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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Community;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import com.example.demo.Service.CommunityService;

@RestController
//@CrossOrigin(origins = "http://192.168.219.202:8081")
//---------------------------------------------------------   테스트중 주 아래다가 추가해 써보도록 안되면 위에꺼 교체해서 사용                            
@CrossOrigin(origins = {
	    "http://192.168.219.101:8081",
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
    
    // 사용자 정보 조회------------------------------------------------------------------------------------------
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
    //마이페이지 수정------------------------------------------------------------------------------------------------
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
    
}
