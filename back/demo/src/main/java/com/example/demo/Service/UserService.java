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
	
}