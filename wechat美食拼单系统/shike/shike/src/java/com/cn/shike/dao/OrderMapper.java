package com.cn.shike.dao;

import com.cn.shike.pojo.Order;

import java.util.List;
import java.util.Map;
//import test.domain.Order;

public interface OrderMapper {
    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    List<Map> getOrderById(int orderId);

    int updateOrderRoot(Order record);

    Map findByPrimaryKey(int oId);

    int myUpdateByPrimaryKey(Order record);
}