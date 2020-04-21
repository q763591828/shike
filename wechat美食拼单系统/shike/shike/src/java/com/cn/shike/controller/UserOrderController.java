package com.cn.shike.controller;

import com.cn.shike.pojo.ResponseData;
import com.cn.shike.pojo.UserOrder;
import com.cn.shike.service.IUserOrderService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/user_order")
public class UserOrderController {


    @Resource
    private IUserOrderService userOrderService;

    @RequestMapping("/input")
    @ResponseBody
    public ResponseData input(UserOrder userOrder, Model model){
        System.out.println("用户_订单注入" + userOrder.getUserId() + userOrder.getOrderId() );

        int uoId = 0;
        try {
            uoId = userOrderService.userOrderInput(userOrder);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseData(uoId,"餐馆注入成功",null);


    }

    @RequestMapping("/find")
    @ResponseBody
    public ResponseData find(UserOrder userOrder){
        List<Map> orderInfo =userOrderService.findMyOrder(userOrder);
        return new ResponseData(1,"成功找到orderId",orderInfo);
    }


    @RequestMapping("/searchOrder")
    @ResponseBody
    public ResponseData searchOrder(@RequestParam int user_id ,@RequestParam String cai_name){
        System.out.println("正在搜索用户id为：" + user_id + " 搜索的关键字为 " + cai_name );

        List<Map> orderInfo = null;
        try {
            orderInfo =userOrderService.getSearchOrder(user_id,cai_name);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseData(0,"成功找到与关键自相关的信息",null);
        }

        return new ResponseData(1,"成功找到与关键自相关的信息",orderInfo);
    }


    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(@RequestParam int now_number, @RequestParam int user_id , @RequestParam int order_id){

        System.out.println(now_number + "  " + user_id + "  " + order_id);
        UserOrder userOrder = new UserOrder();
        userOrder.setUserId(user_id);
        userOrder.setOrderId(order_id);

        try {
            if(now_number >1){
                userOrderService.deleteByUserIdAndOrderId(userOrder);
            }else  if(now_number == 1){
                userOrderService.deleteAll(userOrder);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(1,"成功删除",null);
    }


    @RequestMapping("/add")
    @ResponseBody
    public ResponseData add(@RequestParam int sum_number,@RequestParam int now_number, @RequestParam int user_id , @RequestParam int order_id){
        UserOrder userOrder = new UserOrder();
        userOrder.setUserId(user_id);
        userOrder.setOrderId(order_id);

        if(sum_number == now_number ){
            return new ResponseData(0,"拼单人数已满",null);
        }else if(sum_number > now_number){
            if(userOrderService.selectByUserIdAndOrderId(userOrder)==null){
                try {
                    userOrderService.addUserOrder(userOrder);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }else{
                return new ResponseData(0,"你已是拼单成员",null);
            }
        }

        return new ResponseData(1,"成功加入拼单",null);
    }

}
