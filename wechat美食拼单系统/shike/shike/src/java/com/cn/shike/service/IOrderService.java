package com.cn.shike.service;

import com.cn.shike.pojo.Order;

import java.util.List;
import java.util.Map;

public interface IOrderService {

    int orderInput(Order order);

    List<Map> getOrderById(int orderId);

    int updateOrderRoot(Order order);

    Map findByPrimaryKey(int oId);

    int myUpdateByPrimaryKey(Order order);
}
