package com.yyj.wechat.entity;

import java.util.Date;

public class Friend {
    private Integer id;

    private Integer flduserid;

    private Integer fldfriendid;

    private Date fldngdate;

    private Date fldlastcdate;

    private String fldlastcont;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFlduserid() {
        return flduserid;
    }

    public void setFlduserid(Integer flduserid) {
        this.flduserid = flduserid;
    }

    public Integer getFldfriendid() {
        return fldfriendid;
    }

    public void setFldfriendid(Integer fldfriendid) {
        this.fldfriendid = fldfriendid;
    }

    public Date getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Date fldngdate) {
        this.fldngdate = fldngdate;
    }

    public Date getFldlastcdate() {
        return fldlastcdate;
    }

    public void setFldlastcdate(Date fldlastcdate) {
        this.fldlastcdate = fldlastcdate;
    }

    public String getFldlastcont() {
        return fldlastcont;
    }

    public void setFldlastcont(String fldlastcont) {
        this.fldlastcont = fldlastcont;
    }
}