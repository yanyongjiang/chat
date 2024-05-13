package com.yyj.wechat.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.yyj.wechat.entity.ChartCont;
import com.yyj.wechat.entity.Friend;
import com.yyj.wechat.mapper.ChartContMapper;
import com.yyj.wechat.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;


@Service
@ServerEndpoint(value = "/websocket/chat/{userno}")
public class ChatAnnotation {


    public static ChartContMapper chartContMapper;

    public static FriendMapper friendMapper;

    private static final Map connections =
            new HashMap<>();

    private Session session;

    public ChatAnnotation() {
    }
    @Autowired
    public void setChartContMapper(ChartContMapper chartContMapper) {
        ChatAnnotation.chartContMapper = chartContMapper;
    }
    @Autowired
    public void setFriendMapper(FriendMapper friendMapper) {
        ChatAnnotation.friendMapper = friendMapper;
    }

    @OnOpen
    public void start(@PathParam(value = "userno") String userno, Session session) throws IOException {
        this.session = session;
        if(connections.get(userno)!=null){
            ChatAnnotation ca= (ChatAnnotation) connections.get(userno);
            String sid=ca.session.getId();
            connections.remove(sid);
            ca.session.close();
        }
        connections.put(userno, this);
        connections.put(session.getId(), userno);
    }

    @OnClose
    public void end(Session session, CloseReason closeReason) {
        String userno = (String) connections.remove(session.getId());
        if (userno != null)
            connections.remove(userno);
    }

    @OnMessage
    public void incoming(String message) throws IllegalAccessException, IOException, EncodeException {

        Map<String, Object> mapJson = JSON.parseObject(message);
        String fldrdate = (String) mapJson.get("fldrdate");
        if (fldrdate != null) {
//              String ids=(String) mapJson.get("ids");
//              $update(Bbschartcont.class,ids.split(","),"fldrdate",fldrdate);
//              String fldto=(String) mapJson.get("fldto");
//              if(fldto!=null){
//                  ChatAnnotation to = (ChatAnnotation) connections.get(fldto);
//                  if(to!=null){
//                      Map rM=new HashMap<>();
//                      rM.put("ids",ids);
//                      rM.put("fldrdate",fldrdate);
//                      JSONObject contjson = JSONObject.fromObject(rM);
//                      to.session.getBasicRemote().sendText(contjson.toString());
//                  }
//              }
        } else {
            ChartCont cont = JSON.parseObject(message,ChartCont.class);
            Date time = new Date();
            cont.setFldngdate(time);
            int i=chartContMapper.insert(cont);
            String fldto = cont.getFldto();
            String fldfrom = cont.getFldfrom();
            Integer fid= (Integer) mapJson.get("fid");
            Friend f=new Friend();
            f.setId(fid);
            f.setFldlastcdate(time);
            f.setFldlastcont(cont.getFldtext());
            friendMapper.updateByPrimaryKeySelective(f);
//
           if (fldto != null) {
                ChatAnnotation to = (ChatAnnotation) connections.get(fldto);
                if(fldto.equals(fldfrom)){
                    to.session.getBasicRemote().sendText(JSON.toJSONStringWithDateFormat(cont,"yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat));
                    cont.setFldrdate(time);
                    chartContMapper.updateByPrimaryKey(cont);
                }
                else {
                    if (to != null) { //对方在线
                        to.session.getBasicRemote().sendText(JSON.toJSONStringWithDateFormat(cont,"yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat));
                        cont.setFldrdate(time);
                        chartContMapper.updateByPrimaryKey(cont);
                    }
                    if (fldfrom != null) {
                        ChatAnnotation from = (ChatAnnotation) connections.get(fldfrom);
                        if (from != null) { //对方在线
                            from.session.getBasicRemote().sendText(JSON.toJSONStringWithDateFormat(cont,"yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat));
                        }
                    }
                }

            }
        }
    }

    @OnError
    public void onError(Throwable t) throws Throwable {

    }
}
