package com.cn.shike.service;

import com.cn.shike.pojo.User;

public interface IUserService {
    public User getUserById(User user);

    User login(User user);

    void register(User user);

    int updateUser(User user);

    int updateImg(User user);

    User getImgId(User user);
}