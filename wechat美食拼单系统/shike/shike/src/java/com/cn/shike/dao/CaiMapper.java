package com.cn.shike.dao;

import com.cn.shike.pojo.Cai;

import java.util.List;
import java.util.Map;
//import test.domain.Cai;

public interface CaiMapper {
    int deleteByPrimaryKey(Integer caiId);

    int insert(Cai record);

    int insertFood(Cai record);

    int insertSelective(Cai record);

    Cai selectByPrimaryKey(Integer caiId);

    int updateByPrimaryKeySelective(Cai record);

    int updateByPrimaryKey(Cai record);

    Cai selectCaiInfo(Integer orderId);

    int updateImg(Cai record);

    List<Map> selectAll(Integer number,Integer rest_id);

    List<Map> getSearchFood(Integer rest_id , String cai_name);

    int updateClick(Integer cai_id);
}