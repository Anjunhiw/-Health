package com.example.demo.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.Model.Community;

@Mapper
public interface CommunityMapper {
    void insertCommunity(Community community);
@Select("SELECT id, title, content FROM community ORDER BY id DESC")
    List<Community> selectAllCommunity();
}
