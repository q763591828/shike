package com.cn.shike.service.impl;

import com.cn.shike.dao.UserOrderMapper;
import com.cn.shike.pojo.UserOrder;
import com.cn.shike.service.IUserOrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service("orderUserService")
public class UserOrderServiceImpl implements IUserOrderService {

    @Resource
    private UserOrderMapper userOrderDao;

    public int userOrderInput(UserOrder userOrder){
        userOrderDao.insert(userOrder);
        return  userOrder.getOrderId();
    }

    public List<Map> findMyOrder(UserOrder userOrder) {
        return userOrderDao.getMyOrder(userOrder);
    }

    public List<Map> getSearchOrder(int userId, String caiName) {
        return userOrderDao.getSearchOrder(userId,caiName);
    }

    //在用户删除拼单时，当now_number > 1 时执行此函数
    public void deleteByUserIdAndOrderId(UserOrder userOrder) {
        userOrderDao.updateNowNumber(userOrder);
        userOrderDao.deleteByUserIdAndOrderId(userOrder);
    }

    //在用户删除拼单时，当now_number = 1时执行此函数
    public void deleteAll(UserOrder userOrder) {
        userOrderDao.deleteT_order(userOrder);
        userOrderDao.deleteUser_order(userOrder);
        userOrderDao.deleteRest_order(userOrder);
    }

    //当用户加入拼单时，当now_number < sum_number时执行此函数
    public void addUserOrder(UserOrder userOrder) {
        userOrderDao.updateNowNumberAdd(userOrder);
        userOrderDao.insert(userOrder);  //小心此函数没有返回值，很有可能出错
    }

    public UserOrder selectByUserIdAndOrderId(UserOrder userOrder) {
        return userOrderDao.selectByUserIdAndOrderId(userOrder);
    }

}
