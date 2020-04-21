package com.cn.shike.pojo;

import java.math.BigDecimal;

public class Cai {
    private Integer caiId;

    private String caiName;

    private BigDecimal price;

    private Integer restId;

    private String imgId;

    private Integer properNumber;

    public Integer getCaiId() {
        return caiId;
    }

    public void setCaiId(Integer caiId) {
        this.caiId = caiId;
    }

    public String getCaiName() {
        return caiName;
    }

    public void setCaiName(String caiName) {
        this.caiName = caiName == null ? null : caiName.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getRestId(){
        return restId;
    }

    public void setRestId(Integer restId){
        this.restId = restId;
    }

    public String getImgId(){
        return imgId;
    }

    public void setImgId(String imgId){
        this.imgId = imgId == null ? null: imgId.trim()  ;
    }

    public Integer getProperNumber(){
        return properNumber;
    }

    public void setProperNumber(Integer properNumber){
        this.properNumber = properNumber;
    }


}