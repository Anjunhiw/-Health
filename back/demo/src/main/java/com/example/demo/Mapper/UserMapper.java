package com.example.demo.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.Model.User;


@Mapper
public interface UserMapper {
	int InsertUser(User user);
	List<User> SelectUser();
	User findByUserId(String userId);
	int existsByUserId(String userId); // 아이디 중복확인
}
