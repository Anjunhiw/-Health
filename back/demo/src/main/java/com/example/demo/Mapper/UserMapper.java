package com.example.demo.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.Model.User;


@Mapper
public interface UserMapper {
	int InsertUser(User user);
	List<User> SelectUser();
	User findByUserId(String userId);
	int existsByUserId(String userId); // 아이디 중복확인
	int updateUser(@Param("userId") String userId, @Param("user") User user);//마이페이지 수정
    User findByNameContactEmail( // 이름, 전화번호, 이메일로 아이디 찾기
    	    @Param("name")String name,
    	    @Param("contact")String contact,
    	    @Param("email")String email);
}
