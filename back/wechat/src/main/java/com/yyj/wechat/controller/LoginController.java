package com.yyj.wechat.controller;


import com.yyj.wechat.entity.ChartCont;
import com.yyj.wechat.entity.Friend;
import com.yyj.wechat.entity.User;
import com.yyj.wechat.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @auther yyj
 * @create 2020-02-22 11:57
 */
@RestController
public class LoginController
{
    @Autowired
    LoginService loginService;
    @PostMapping(value = "/login")
    public Map login(@RequestBody User chartUser)
    {
        return loginService.doLogin(chartUser);
    }

    @PostMapping(value = "/register")
    public Integer register(@RequestBody User chartUser)
    {

        return loginService.insert(chartUser);
    }

    @PostMapping(value = "/listFriend")
    public List<Map> listFriend(@RequestBody Map params) {
        int loginId= (int) params.get("id");
        return loginService.listFriend(loginId);
    }

    @PostMapping(value = "/listChatCont")
    public List<ChartCont> listChatCont(@RequestBody Map params) {
        return loginService.listChatCont(params);
    }
}
