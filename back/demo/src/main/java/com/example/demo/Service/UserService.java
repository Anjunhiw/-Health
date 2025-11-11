package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Mapper.UserMapper;
import com.example.demo.Model.User;

@Service
public class UserService {
	
	@Autowired
	public UserMapper userMapper;
	
	public int InsertUser(User user) {
		
		return userMapper.InsertUser(user);
	}
	
	public List<User> SelectUser(){
		return userMapper.SelectUser();
	}

	public User findByUserId(String userId) {
	    return userMapper.findByUserId(userId); // 매퍼 호출
	}
	//아이디 중복확인
	public boolean existsByUserId(String userId) {
	    return userMapper.existsByUserId(userId) > 0;
	}
	//마이페이지 수정
	public int updateUser(String userId, User updatedUser) {
	    return userMapper.updateUser(userId, updatedUser);
	}
	// 이름, 전화번호, 이메일로 아이디 찾기
	public User findByNameContactEmail(String name, String contact, String email) {
	    return userMapper.findByNameContactEmail(name, contact, email);
	}
	// 비밀번호 재설정 (email 기준)
	public int updatePasswordByEmail(String email, String newPassword) {
	    // 운영에서는 반드시 해싱(BCrypt 등) 후 저장 권장
	    return userMapper.updatePasswordByEmail(email, newPassword);
	}
	// 이메일 찾기 (userId 기준)
	public boolean existsByUserIdAndEmail(String userId, String email) {
	    return userMapper.existsByUserIdAndEmail(userId, email) > 0;
	}
}