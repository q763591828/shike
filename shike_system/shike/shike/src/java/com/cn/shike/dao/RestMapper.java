package com.cn.shike.dao;

import com.cn.shike.pojo.Rest;
//import test.domain.Rest;

public interface RestMapper {
    int deleteByPrimaryKey(Integer restId);

    int insert(Rest record);

    Rest selectByRestname(Rest record);

    int insertSelective(Rest record);

    Rest selectByPrimaryKey(Rest record);

    int updateByPrimaryKeySelective(Rest record);

    int updateByPrimaryKey(Rest record);

    Rest selectByRestIdAndPassword(Rest record);

    Rest selectRestInfo(Integer restId);

    int updateImg (Rest record);

    Rest selectImgId(Rest record);
}