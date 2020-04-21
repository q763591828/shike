package com.cn.shike.controller;

import com.cn.shike.pojo.Cai;
import com.cn.shike.pojo.Rest;
import com.cn.shike.pojo.User;
import com.cn.shike.service.ICaiService;
import com.cn.shike.service.IRestService;
import com.cn.shike.service.IUserService;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.enterprise.inject.Model;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

/**
 * Created by majl on 2017/9/1.
 */
@Controller
@RequestMapping("/file")
public class UploadController {

    @Resource
    private IUserService userService;

    @Resource
    private ICaiService caiService;

    @Resource
    private IRestService restService;

    @RequestMapping(value="/upload",method= RequestMethod.POST)
    @ResponseBody
    public String upload( @RequestParam("file") MultipartFile file,HttpServletRequest request) throws IOException{

        User user = new User();
        String filename = null;
        int userId =0;
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getSize());
        System.out.println(request.getParameter("userId"));

        try {
            userId =Integer.parseInt(request.getParameter("userId")) ; //将原本为String类型的userId转换为int 类型
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        if(!file.isEmpty()) {
            //上传文件路径
            String path = request.getServletContext().getRealPath("/photo/");
            System.out.println(path);
            //上传文件名
            filename = file.getOriginalFilename();
            File filepath = new File(path,filename);
            //判断路径是否存在，如果不存在就创建一个
            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();
            }
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(path + File.separator + filename));


            user.setUserId(userId);
            user.setImgId(filename);


            try {
                userService.updateImg(user);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            return "success";
        } else {
            return "error";
        }

       /* //改成你的文件路径
        String path = request.getSession().getServletContext().getRealPath("/photo");

        System.out.println("path>>"+path);
        //改成你的文件名
        String fileName = UUID.randomUUID()+file.getOriginalFilename();
        System.out.println("fileName>>"+fileName);

        File dir = new File(path, fileName);
        System.out.println("dir.exists()>>"+dir.exists());
        if(!dir.exists()){
            dir.mkdirs();
        }
        System.out.println("dir.exists()>>"+dir.exists());

        return "ok";*/
    }




    @RequestMapping(value="/restImgUpload",method= RequestMethod.POST)
    @ResponseBody
    public String restImgUpload( @RequestParam("file") MultipartFile file,HttpServletRequest request) throws IOException{

        Rest rest = new Rest();
        String filename = null;
        int restId =0;
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getSize());
        System.out.println(request.getParameter("restId"));

        try {
            restId =Integer.parseInt(request.getParameter("restId")) ; //将原本为String类型的restId转换为int 类型
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        if(!file.isEmpty()) {
            //上传文件路径
            String path = request.getServletContext().getRealPath("/photo/");
            System.out.println(path);
            //上传文件名
            filename = file.getOriginalFilename();
            File filepath = new File(path,filename);
            //判断路径是否存在，如果不存在就创建一个
            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();
            }
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(path + File.separator + filename));


            rest.setRestId(restId);
            rest.setImgId(filename);


            try {
                restService.updateImg(rest);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            return "success";
        } else {
            return "error";
        }

    }


    @RequestMapping(value="/foodImgUpload",method= RequestMethod.POST)
    @ResponseBody
    public String foodImgUpload( @RequestParam("file") MultipartFile file,HttpServletRequest request) throws IOException {

        Cai cai = new Cai();
        String filename = null;
        int caiId = 0;
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getSize());
        System.out.println(request.getParameter("caiId"));

        try {
            caiId = Integer.parseInt(request.getParameter("caiId")); //将原本为String类型的userId转换为int 类型
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        if (!file.isEmpty()) {
            //上传文件路径
            String path = request.getServletContext().getRealPath("/photo/");
            System.out.println(path);
            //上传文件名
            filename = file.getOriginalFilename();
            File filepath = new File(path, filename);
            //判断路径是否存在，如果不存在就创建一个
            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();
            }
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(path + File.separator + filename));


            cai.setCaiId(caiId);
            cai.setImgId("http://localhost:8080/photo/" + filename);  //部署到服务器删给的时候要注意修改此处的域名，此处的代码最好为动态


            try {
                caiService.updateImg(cai);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            return "success";
        } else {
            return "error";
        }
    }


    @RequestMapping(value="/download")
    public ResponseEntity<byte[]> download(HttpServletRequest request,
                                           @RequestParam("filename") String filename,
                                           Model model)throws Exception {
        //下载文件路径
        String path = request.getServletContext().getRealPath("/photo/");
        System.out.println(path);


        File file = new File(path + File.separator + filename);
        HttpHeaders headers = new HttpHeaders();
        //下载显示的文件名，解决中文名称乱码问题
        String downloadFielName = new String(filename.getBytes("UTF-8"),"iso-8859-1");
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName);
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),
                headers, HttpStatus.CREATED);
    }

}