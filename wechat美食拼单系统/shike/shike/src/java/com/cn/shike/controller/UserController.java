package com.cn.shike.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.cn.shike.pojo.ResponseData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.shike.pojo.User;
import com.cn.shike.service.IUserService;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    private IUserService userService;

    @RequestMapping("/showUser")
    @ResponseBody
    public ResponseData toIndex(User user){
        System.out.println("用户的Id："+user.getUserId());
        User newUser = null;
        try {
            newUser = userService.getUserById(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(1,"注册成功",newUser);
    }

    @RequestMapping("regist")
    @ResponseBody
    public ResponseData regist(User user,Model model){

        System.out.println("用户注册："+user.getUserName()+user.getPassword());

        try{
            userService.register(user);

        } catch (Exception e){
            e.printStackTrace();
        }

        model.addAttribute("msg", "注册成功");
        //注册成功后跳转success.jsp页面
        return new ResponseData(1,"注册成功",null);
    }

    @RequestMapping("login")
    @ResponseBody
    public ResponseData login(User user, HttpServletRequest request){
        User loginUser = null;
        try {
            System.out.println("------login--qian----"+user.getUserName()+","+user.getPassword()+".");
            loginUser=userService.login(user);

        } catch (Exception e) {
            e.printStackTrace();
        }
        if(loginUser!=null){
            request.setAttribute("loginUser", loginUser.getUserName());
            return new ResponseData(1,"请求成功",loginUser);
        }else{
            request.setAttribute("loginUser", "登录失败");
            return new ResponseData(0,"请求失败",loginUser);
        }

    }


    @RequestMapping("update")
    @ResponseBody
    public ResponseData update(User user){

        System.out.println("正在修改用户信息："+user.getUserName()+user.getPassword());
        int userId = 0;
        try {
            userId = userService.updateUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseData(userId,"请求失败",null);//返回的值中code为userId
    }


    @RequestMapping("/showImgId")
    @ResponseBody
    public ResponseData showImgId(User user){
        System.out.println("正在查询图像的用户的Id："+user.getUserId());
        User newUser = null;
        try {
            newUser = userService.getImgId(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String path = "http://localhost:8080/photo/" + newUser.getImgId();  //之后如果部署到服务器上需要注意域名的修改
        newUser.setImgId(path);
        return new ResponseData(1,"成功的找到用户的图像",newUser);
    }

}