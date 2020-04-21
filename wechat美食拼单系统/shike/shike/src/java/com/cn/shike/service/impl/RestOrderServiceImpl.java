package com.cn.shike.service.impl;

import com.cn.shike.dao.OrderMapper;
import com.cn.shike.dao.RestOrderMapper;
import com.cn.shike.pojo.RestOrder;
import com.cn.shike.service.IRestOrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service("restOrderService")
public class RestOrderServiceImpl implements IRestOrderService {

    @Resource
    private  RestOrderMapper  restOrderDao;

    public int restOrderInput(RestOrder restOrder){
        restOrderDao.insert(restOrder);

        return restOrder.getRoId();
    }

    public List<Map>orderAndCaiFind(RestOrder restOrder){

        return restOrderDao.getOrderAndCaiByRestId(restOrder);
    }

    public List<Map>orderAndCaiFind2(RestOrder restOrder){

        return restOrderDao.getOrderAndCaiByRestId2(restOrder);
    }

    public void deleteAll(RestOrder restOrder) {

        restOrderDao.deleteOrder(restOrder);
        restOrderDao.deleteRestOrder(restOrder);
        restOrderDao.deleteUserOrder(restOrder);
    }

    public List<Map> selectRestInfoByOrderId(RestOrder restOrder) {
        return restOrderDao.selectRestInfoByOrderId(restOrder);
    }

    public List<Map> getSearchOrder(int rest_id, int order_root, String cai_name) {
        return restOrderDao.getSearchOrder(rest_id,order_root,cai_name);
    }

}
