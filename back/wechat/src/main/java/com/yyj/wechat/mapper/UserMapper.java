package com.yyj.wechat.mapper;

import com.yyj.wechat.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    User selectByLoginId(String loginId);

    List<User> selectOrderByDate();

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}