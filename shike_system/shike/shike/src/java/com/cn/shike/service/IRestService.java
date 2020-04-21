package com.cn.shike.service;

import com.cn.shike.pojo.Rest;

public interface IRestService {

    int restInput(Rest rest);

    Rest FindRest(Rest rest);

    Rest selectByPrimaryKey(Rest rest);

    Rest selectRestInfo(Integer restId);

    int updateImg(Rest rest);

    Rest getImgId(Rest rest);

    int updateRest(Rest rest);
}
