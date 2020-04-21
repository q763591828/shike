package com.cn.shike.dao;

import com.cn.shike.pojo.User;
//import test.domain.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(User record);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User selectByUsernameAndPassword(User user);

    int updateImg(User record);

    User selectImgId(User user);
}