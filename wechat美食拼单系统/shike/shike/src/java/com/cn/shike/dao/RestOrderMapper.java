package com.cn.shike.dao;

import com.cn.shike.pojo.RestOrder;
import sun.security.krb5.internal.crypto.RsaMd5CksumType;

import java.util.List;
import java.util.Map;
//import test.domain.RestOrder;

public interface RestOrderMapper {
    int deleteByPrimaryKey(Integer roId);

    int insert(RestOrder record);

    int insertSelective(RestOrder record);

    RestOrder selectByPrimaryKey(Integer roId);

    int updateByPrimaryKeySelective(RestOrder record);

    int updateByPrimaryKey(RestOrder record);

    List<RestOrder> selectByRestId(RestOrder record);

    List<Map> getOrderAndCaiByRestId(RestOrder record);

    List<Map> getOrderAndCaiByRestId2(RestOrder record);

    List<Map> getSearchOrder(Integer rest_id,Integer order_root,String cai_name);

    void deleteOrder(RestOrder record);

    void deleteUserOrder(RestOrder record);

    void deleteRestOrder(RestOrder record);

    List<Map> selectRestInfoByOrderId(RestOrder record);

}