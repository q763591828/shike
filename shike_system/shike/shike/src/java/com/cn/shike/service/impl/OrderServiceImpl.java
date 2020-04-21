package com.cn.shike.service.impl;


import com.cn.shike.dao.CaiMapper;
import com.cn.shike.dao.OrderMapper;
import com.cn.shike.pojo.Order;
import com.cn.shike.service.IOrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("orderService")
public class OrderServiceImpl implements  IOrderService{

    @Resource
    private OrderMapper orderDao;

    @Resource
    private CaiMapper caiDao;

    public int orderInput(Order order){
        int cai_id = order.getCaiId();
        System.out.println("正在更新餐品点击量，餐品的id为："+cai_id);
        caiDao.updateClick(cai_id);

        orderDao.insert(order);
        return  order.getOrderId();
    }

    public List<Map> getOrderById(int orderId) {
        return orderDao.getOrderById(orderId);
    }

    public int updateOrderRoot(Order order) {
        return orderDao.updateOrderRoot(order);
    }

    public Map findByPrimaryKey(int oId) {
        return orderDao.findByPrimaryKey(oId);
    }

    public int myUpdateByPrimaryKey(Order order) {
        return orderDao.myUpdateByPrimaryKey(order);
    }
}
