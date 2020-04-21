package com.cn.shike.controller;


import com.cn.shike.pojo.ResponseData;
import com.cn.shike.pojo.Rest;
import com.cn.shike.service.IRestService;
import com.cn.shike.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/rest")
public class RestController {

    @Resource
    private IRestService restService;

    @RequestMapping("/input")
    @ResponseBody
    public ResponseData input(Rest rest, Model model){
        System.out.println("餐馆注入" + rest.getTitle() + rest.getAddress() + rest.getTelephone());

        int rest_id = 0;
        try {
            rest_id = restService.restInput(rest);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseData(rest_id,"餐馆注入成功",null);


    }

    @RequestMapping("/find")
    @ResponseBody
    public ResponseData find(Rest rest){
        System.out.println("餐馆管理用户寻找" + rest.getRestId()+ rest.getPassword());

        Rest findRest =null;

        try {
            findRest = restService.FindRest(rest);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(findRest==null){
            return new ResponseData(0,"餐馆注入成功",findRest);
        }
        return new ResponseData(1,"餐馆注入成功",findRest);


    }

    @RequestMapping("/findByRestId")
    @ResponseBody
    public ResponseData findByRestId(Rest rest){
        System.out.println("餐馆信息寻找" + rest.getRestId());

        Rest findRest =null;

        try {
            findRest = restService.selectByPrimaryKey(rest);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(findRest==null){
            return new ResponseData(0,"餐馆注入成功",findRest);
        }
        return new ResponseData(1,"餐馆注入成功",findRest);


    }


    @RequestMapping("/findRestInfo")
    @ResponseBody
    public ResponseData findRestInfo(@RequestParam int restId){
        System.out.println("正在查找餐馆所有信息:" + restId);

        Rest findRest =null;

        try {
            findRest = restService.selectRestInfo(restId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(findRest==null){
            return new ResponseData(0,"未能找到餐馆信息",findRest);
        }
        return new ResponseData(1,"成功找到餐馆信息",findRest);


    }

    @RequestMapping("/showImgId")
    @ResponseBody
    public ResponseData showImgId(Rest rest){
        System.out.println("正在查询图像的餐馆的Id为："+rest.getRestId());
        Rest newRest = null;
        try {
            newRest = restService.getImgId(rest);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String path = "http://localhost:8080/photo/" + newRest.getImgId();  //之后如果部署到服务器上需要注意域名的修改
        newRest.setImgId(path);
        return new ResponseData(1,"成功的找到用户的图像",newRest);
    }

    @RequestMapping("update")
    @ResponseBody
    public ResponseData update(Rest rest){

        System.out.println("正在修改餐馆信息："+rest.getRestId());
        int restId = 0;
        try {
            restId = restService.updateRest(rest);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(restId,"请求失败",null);//其实处理有一定的问题
    }
}
