package com.cn.shike.service;

import com.cn.shike.pojo.UserOrder;

import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Map;

public interface IUserOrderService {

    int userOrderInput(UserOrder userOrder);

    List<Map> findMyOrder(UserOrder userOrder);

    List<Map> getSearchOrder(int userId,String caiName);

    void deleteByUserIdAndOrderId(UserOrder userOrder);

    void deleteAll(UserOrder userOrder);

    void addUserOrder(UserOrder userOrder);

    UserOrder selectByUserIdAndOrderId(UserOrder userOrder);
}
