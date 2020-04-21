package com.cn.shike.service;

import com.cn.shike.pojo.RestOrder;

import java.util.List;
import java.util.Map;

public interface IRestOrderService {

    int restOrderInput(RestOrder restOrder);

    List<Map> orderAndCaiFind(RestOrder restOrder);

    List<Map> orderAndCaiFind2(RestOrder restOrder);

    void deleteAll(RestOrder restOrder);

    List<Map> selectRestInfoByOrderId(RestOrder restOrder);

    List<Map> getSearchOrder(int rest_id , int order_root ,String cai_name);
}
