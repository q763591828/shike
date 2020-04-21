package com.cn.shike.service;

import com.cn.shike.pojo.Cai;

import java.util.List;
import java.util.Map;

public interface ICaiService {

    int caiInput(Cai cai);

    int releaseFood(Cai cai);

    public Cai selectCaiInfo(int orderId);

    int updateImg(Cai cai);

    List<Map> findAll(int number,int rest_id);

    List<Map> getSearchFood(int rest_id, String cai_name);

    int deleteByPrimaryKey(int cai_id);
}
