package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Mapper.CommunityMapper;
import com.example.demo.Model.Community;

@Service
public class CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    // 게시글 등록
    public void insertCommunity(Community community) {
        communityMapper.insertCommunity(community);
    }
    // 게시글 전체 조회
    public List<Community> getAllCommunity() {
        return communityMapper.selectAllCommunity();
    
    }
}
