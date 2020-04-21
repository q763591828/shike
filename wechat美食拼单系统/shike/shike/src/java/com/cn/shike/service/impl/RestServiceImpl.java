package com.cn.shike.service.impl;

import com.cn.shike.dao.RestMapper;
import com.cn.shike.pojo.Rest;
import com.cn.shike.service.IRestService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("restService")
public class RestServiceImpl implements IRestService {


    @Resource
    private RestMapper restDao;
    public int restInput(Rest rest) {

        if( restDao.selectByRestname(rest)!= null){

            System.out.println("数据库中找到餐馆即将返回主键:\n" + restDao.selectByRestname(rest).getRestId());
            return restDao.selectByRestname(rest).getRestId();
        }else {
            System.out.println("数据库中没有找到餐馆即将注入。\n");
            restDao.insert(rest);
            return rest.getRestId();
        }


    }

    public Rest FindRest(Rest rest) {
        return restDao.selectByRestIdAndPassword(rest);
    }

    public Rest selectByPrimaryKey(Rest rest) {
        return restDao.selectByPrimaryKey(rest);
    }

    public Rest selectRestInfo(Integer restId) {
        return restDao.selectRestInfo(restId);
    }

    public int updateImg(Rest rest) {
        return restDao.updateImg(rest);
    }

    public Rest getImgId(Rest rest) {
        return restDao.selectImgId(rest);
    }

    public int updateRest(Rest rest) {
        return restDao.updateByPrimaryKey(rest);
    }


}
