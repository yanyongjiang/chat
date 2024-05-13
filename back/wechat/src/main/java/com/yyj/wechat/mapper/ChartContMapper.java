package com.yyj.wechat.mapper;

import com.yyj.wechat.entity.ChartCont;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
@Component
public interface ChartContMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ChartCont record);

    int insertSelective(ChartCont record);

    ChartCont selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChartCont record);

    int updateByPrimaryKeyWithBLOBs(ChartCont record);

    int updateByPrimaryKey(ChartCont record);

    List<ChartCont> listChatCont(Map params);
}