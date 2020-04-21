package com.cn.shike.pojo;

public class Order {
    private Integer orderId;

    private String date;

    private Integer caiId;

    private Integer sumNumber;

    private Integer nowNumber;

    private String message;

    private Integer orderRoot;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date == null ? null : date.trim();
    }

    public Integer getCaiId() {
        return caiId;
    }

    public void setCaiId(Integer caiId) {
        this.caiId = caiId;
    }

    public Integer getSumNumber() {
        return sumNumber;
    }

    public void setSumNumber(Integer sumNumber) {
        this.sumNumber = sumNumber;
    }

    public Integer getNowNumber() {
        return nowNumber;
    }

    public void setNowNumber(Integer nowNumber) {
        this.nowNumber = nowNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message == null ? null : message.trim();
    }

    public Integer getOrderRoot() {
        return orderRoot;
    }

    public void setOrderRoot(Integer orderRoot) {
        this.orderRoot = orderRoot;
    }
}