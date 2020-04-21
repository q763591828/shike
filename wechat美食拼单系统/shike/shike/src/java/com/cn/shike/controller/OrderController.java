package com.cn.shike.controller;


import com.cn.shike.pojo.Order;
import com.cn.shike.pojo.ResponseData;
import com.cn.shike.service.IOrderService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;


@Controller
@RequestMapping("/order")
public class OrderController {

    @Resource
    private IOrderService orderService;


    @RequestMapping("/input")
    @ResponseBody
    public ResponseData input(Order order, Model modle){

        int order_id=0;
        System.out.println("订单注入,餐品的id为：" + order.getCaiId()+ " 餐品当前人数为："+order.getNowNumber() +" 餐品的额外信息为：" +order.getMessage() );
        try {
            order_id = orderService.orderInput(order);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(order_id,"订单注入成功",null);
    }

    @RequestMapping("/pass")
    @ResponseBody
    public ResponseData pass(Order order){
        System.out.println("修改权限的订单id为：" + order.getOrderId());

        int sum =0;
        try {
            sum = orderService.updateOrderRoot(order);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  new ResponseData(sum,"拼单审核通过",null);
    }


    @RequestMapping("/findOrderInfo")
    @ResponseBody
    public ResponseData findOrderInfo(Order order){
        System.out.println("查找的订单id为：" + order.getOrderId());
        int oId=order.getOrderId();
        Order findOrder = null;
        try {
            Map map = orderService.findByPrimaryKey(oId);
            return new ResponseData(1,"查到了order信息",map);
        } catch (Exception e) {
            e.printStackTrace();
            return  new ResponseData(0,"没有查到order信息",null);
        }

    }


    @RequestMapping("/myUpdate")
    @ResponseBody
    public ResponseData myUpdate(Order order){
        System.out.println("正在修改拼单，该拼单的id为：" + order.getOrderId());
        int num=0;

        try {
            num = orderService.myUpdateByPrimaryKey(order);
            return new ResponseData(num,"查到了order信息",null);
        } catch (Exception e) {
            e.printStackTrace();
            return  new ResponseData(num,"没有查到order信息",null);
        }

    }
}
