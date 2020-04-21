package com.cn.shike.dao;

import com.cn.shike.pojo.UserOrder;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
//import test.domain.UserOrder;

public interface UserOrderMapper {
    int deleteByPrimaryKey(Integer uoId);

    int insert(UserOrder record);

    int insertSelective(UserOrder record);

    UserOrder selectByPrimaryKey(Integer uoId);

    int updateByPrimaryKeySelective(UserOrder record);

    int updateByPrimaryKey(UserOrder record);

    List<Map> getMyOrder(UserOrder record);

    List<Map> getSearchOrder(Integer userId, String caiName);

    void updateNowNumber(UserOrder record);

    void deleteByUserIdAndOrderId(UserOrder record);

    void deleteT_order(UserOrder record);

    void deleteUser_order(UserOrder record);

    void deleteRest_order(UserOrder record);

    void updateNowNumberAdd(UserOrder record);

    UserOrder selectByUserIdAndOrderId(UserOrder record);

}