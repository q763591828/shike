package com.cn.shike.controller;


import com.cn.shike.pojo.ResponseData;
import com.cn.shike.pojo.RestOrder;
import com.cn.shike.service.IRestOrderService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/rest_order")
public class RestOrderController {

    @Resource
    private IRestOrderService restOrderService;

    @RequestMapping("/input")
    @ResponseBody
    public ResponseData input(RestOrder restOrder, Model model){

        int ro_id = 0;
        System.out.println("餐馆_订单注入,餐馆的id为：" + restOrder.getRestId() +" 订单的id为："+ restOrder.getOrderId());


        try {
            ro_id = restOrderService.restOrderInput(restOrder);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(ro_id,"菜注入成功",null);
    }

    @RequestMapping("/find")
    @ResponseBody
    public ResponseData find(RestOrder restOrder){
        List<Map> orderIds =restOrderService.orderAndCaiFind(restOrder);

        return new ResponseData(1,"成功找到orderId",orderIds);
    }

    @RequestMapping("/findRestByOrderId")
    @ResponseBody
    public ResponseData findRestByOrderId(RestOrder restOrder){
        System.out.println("正在查询id为：" + restOrder.getRestId() + "餐馆的待审核的拼单");
        List<Map> rest =restOrderService.selectRestInfoByOrderId(restOrder);

        return new ResponseData(1,"成功找到rest的信息",rest);
    }

    @RequestMapping("/find2")
    @ResponseBody
    public ResponseData find2(RestOrder restOrder){
        List<Map> orderIds =restOrderService.orderAndCaiFind2(restOrder);

        return new ResponseData(1,"成功找到orderId",orderIds);
    }


    @RequestMapping("/searchOrder")
    @ResponseBody
    public ResponseData searchOrder(@RequestParam int rest_id ,@RequestParam int order_root ,@RequestParam String cai_name){
        System.out.println("正在搜索餐馆id为：" + rest_id + "该拼单的权限为："+ order_root + " 搜索的关键字为 " + cai_name );

        List<Map> orderInfo = null;
        try {
            orderInfo =restOrderService.getSearchOrder(rest_id,order_root,cai_name);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseData(0,"成功找到与关键自相关的信息",null);
        }

        return new ResponseData(1,"成功找到与关键自相关的信息",orderInfo);
    }

    @RequestMapping("/deleteAll")
    @ResponseBody
    public ResponseData deleteAll(RestOrder restOrder){

        System.out.println("正在删除所有订单：" + restOrder.getOrderId());
        try {
            restOrderService.deleteAll(restOrder);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseData(1,"成功删除orderId",null);
    }


}
