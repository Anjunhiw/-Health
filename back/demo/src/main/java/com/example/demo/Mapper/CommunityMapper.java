package com.example.demo.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.demo.Model.Community;

@Mapper
public interface CommunityMapper {
    void insertCommunity(Community community);
    List<Community> selectAllCommunity(); // 게시글 전체 조회 추가
    Community selectCommunityById(@Param("id") int id); // 게시글 ID로 조회
}
