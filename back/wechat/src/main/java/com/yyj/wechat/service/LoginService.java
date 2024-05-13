package com.yyj.wechat.service;

import com.yyj.wechat.entity.ChartCont;
import com.yyj.wechat.entity.Friend;
import com.yyj.wechat.entity.User;
import com.yyj.wechat.mapper.ChartContMapper;
import com.yyj.wechat.mapper.FriendMapper;
import com.yyj.wechat.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author:wjup
 * @Date: 2018/9/26 0026
 * @Time: 15:23
 */
@Service
public class LoginService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    FriendMapper friendMapper;

    @Autowired
    ChartContMapper chartContMapper;

    public int insert(User record) {
        User user=userMapper.selectByLoginId(record.getFldloginid());
        if(user!=null){
            return -1;
        }
        return userMapper.insert(record);
    }
    public Map doLogin(User record) {
        User user=userMapper.selectByLoginId(record.getFldloginid());
        Map r=new HashMap();
        r.put("r",true);
        if(user==null){
            r.put("r",false);
            r.put("e","账户不存在");
        }else{
            if(!user.getFldpassword().equals(record.getFldpassword())){
                r.put("r",false);
                r.put("e","密码不正确");
            }
        }
        boolean rr= (boolean) r.get("r");
        if(rr){
            r.put("d",user);
        }
        return r;
    }

    public List<Map> listFriend(Integer loginId) {
        Map params=new HashMap();
        params.put("flduserid",loginId);
        List<Map> friends=friendMapper.selectByflduserid(params);
        if(friends==null||friends.size()==0){
             List<User> users=userMapper.selectOrderByDate();
             if(users!=null){
                 for(User u:users){
                         Friend f=new Friend();
                         f.setFlduserid(loginId);
                         f.setFldfriendid(u.getId());
                         f.setFldngdate(new Date());
                         friendMapper.insert(f);
                 }
             }
            friends=friendMapper.selectByflduserid(params);
        }
        return friends;
    }
    public List<ChartCont> listChatCont(Map params) {
        return chartContMapper.listChatCont(params);
    }
}