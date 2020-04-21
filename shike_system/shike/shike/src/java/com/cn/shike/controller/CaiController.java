package com.cn.shike.controller;


import com.cn.shike.pojo.Cai;
import com.cn.shike.pojo.ResponseData;
import com.cn.shike.service.ICaiService;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/cai")
public class CaiController {

    @Resource
    private ICaiService caiService;

    @RequestMapping("/input")
    @ResponseBody
    public ResponseData input(Cai cai){

        int cai_id = 0;
        System.out.println("菜注入" + cai.getCaiName() + cai.getPrice());


        try {
            cai_id = caiService.caiInput(cai);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(cai_id,"菜注入成功",null);
    }


    @RequestMapping("/release")
    @ResponseBody
    public ResponseData release(Cai cai){

        int cai_id = 0;
        System.out.println("发布新食品" + cai.getCaiName() + cai.getPrice() + cai.getProperNumber());


        try {
            cai_id = caiService.releaseFood(cai);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(cai_id,"菜注入成功",null);  //返回的code的值为食物的id
    }


    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(@RequestParam int cai_id){

        int delete_number = 0;
        System.out.println("正在删除的餐品id为" + cai_id);


        try {
            delete_number = caiService.deleteByPrimaryKey(cai_id);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseData(0,"餐品删除失败",null);
        }

        return new ResponseData(1,"餐品删除成功",null);  //返回的code的值为食物的id
    }

    @RequestMapping("/findCaiInfo")
    @ResponseBody
    public ResponseData findCaiInfo(int orderId){


        System.out.println("查询菜信息时的订单的Id" + orderId);
        Cai findCai = null;

        try {
            findCai = caiService.selectCaiInfo(orderId);
            return new ResponseData(1,"菜信息查找成功",findCai);
        } catch (Exception e) {
            e.printStackTrace();

            return new ResponseData(0,"菜信息查找失败",findCai);
        }
    }



    @RequestMapping("/findAll")
    @ResponseBody
    public ResponseData findAll(@RequestParam int info_number,@RequestParam int rest_id){

        System.out.println("正在查找前" + info_number + "条信息");

        try {
            List<Map> caiIds = caiService.findAll(info_number,rest_id);
            System.out.println(caiIds);

            /*for(int i = 0 ; i< caiIds.size(); i++){
            }*/

            //String path = "http://localhost:8080/photo/" + newUser.getImgId();  之后如果部署到服务器上需要注意域名的修改
            return new ResponseData(1,"菜信息查找成功",caiIds);
        } catch (Exception e) {
            e.printStackTrace();


            return new ResponseData(0,"菜信息查找失败",null);
        }
    }

    @RequestMapping("/getSearchFood")
    @ResponseBody
    public ResponseData getSearchFood(@RequestParam int rest_id,@RequestParam String cai_name){

        System.out.println("正在查找的餐馆id为：" + rest_id + " 查找的关键字为：" +cai_name);

        List<Map> orderInfo = null;
        try {
            orderInfo =caiService.getSearchFood(rest_id,cai_name);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseData(0,"成功找到与关键自相关的信息",null);
        }

        return new ResponseData(1,"成功找到与关键自相关的信息",orderInfo);
    }
}
