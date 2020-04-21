package com.cn.shike.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.shike.dao.UserMapper;
import com.cn.shike.pojo.User;
import com.cn.shike.service.IUserService;

@Service("userService")  //userService加入ioc容器？
public class UserServiceImpl implements IUserService {


    /*
     *相当于
     * <bean id="" class="">
     *     <property name = "userDao" ref = "userDao"/> @Resource相当于此处的对象
     * </bean>
     */
    @Resource//会从IOC容器中找userDao对象，注入到当前字段
    private UserMapper userDao;

    //@Override
    public User getUserById(User user) {
        // TODO Auto-generated method stub
        return this.userDao.selectByPrimaryKey(user);
    }

    public void register(User user) {
        userDao.insert(user);
    }

    public int updateUser(User user) {
        return  userDao.updateByPrimaryKey(user);
    }

    public int updateImg(User user) {
        return userDao.updateImg(user);
    }

    public User getImgId(User user) {
        return userDao.selectImgId(user);
    }

    public User login(User user) {
        return userDao.selectByUsernameAndPassword(user);
    }

}