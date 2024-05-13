package com.yyj.wechat.mapper;

import com.yyj.wechat.entity.Friend;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface FriendMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Friend record);

    int insertSelective(Friend record);

    Friend selectByPrimaryKey(Integer id);

    List<Map> selectByflduserid(Map params);

    int updateByPrimaryKeySelective(Friend record);

    int updateByPrimaryKey(Friend record);
}