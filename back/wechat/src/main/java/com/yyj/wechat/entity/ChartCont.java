package com.yyj.wechat.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ChartCont {
    private Integer id;

    private String fldfrom;

    private String fldto;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date fldngdate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date fldrdate;

    private String fldtext;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFldfrom() {
        return fldfrom;
    }

    public void setFldfrom(String fldfrom) {
        this.fldfrom = fldfrom == null ? null : fldfrom.trim();
    }

    public String getFldto() {
        return fldto;
    }

    public void setFldto(String fldto) {
        this.fldto = fldto == null ? null : fldto.trim();
    }

    public Date getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Date fldngdate) {
        this.fldngdate = fldngdate;
    }

    public Date getFldrdate() {
        return fldrdate;
    }

    public void setFldrdate(Date fldrdate) {
        this.fldrdate = fldrdate;
    }

    public String getFldtext() {
        return fldtext;
    }

    public void setFldtext(String fldtext) {
        this.fldtext = fldtext == null ? null : fldtext.trim();
    }
}