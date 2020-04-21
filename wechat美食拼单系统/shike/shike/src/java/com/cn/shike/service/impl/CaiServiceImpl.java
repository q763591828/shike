package com.cn.shike.service.impl;

import com.cn.shike.dao.CaiMapper;
import com.cn.shike.pojo.Cai;
import com.cn.shike.service.ICaiService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("caiService")
public class CaiServiceImpl implements ICaiService{


    @Resource
    private CaiMapper caiDao;
    public int caiInput(Cai cai) {
        caiDao.insert(cai);

        return  cai.getCaiId();
    }

    public int releaseFood(Cai cai) {
        caiDao.insertFood(cai);
        return cai.getCaiId();
    }

    public Cai selectCaiInfo(int orderId) {
        return caiDao.selectCaiInfo(orderId);
    }

    public int updateImg(Cai cai) {
        return caiDao.updateImg(cai);
    }

    public List<Map> findAll(int number,int rest_id) {
        return caiDao.selectAll(number,rest_id);
    }

    public List<Map> getSearchFood(int rest_id, String cai_name) {
        return  caiDao.getSearchFood(rest_id,cai_name);
    }

    public int deleteByPrimaryKey(int cai_id) {
        return caiDao.deleteByPrimaryKey(cai_id);
    }
}
