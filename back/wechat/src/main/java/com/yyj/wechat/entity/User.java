package com.yyj.wechat.entity;

import java.util.Date;

public class User {
    private Integer id;

    private String fldloginid;

    private String fldname;

    private String fldpassword;

    private Date fldngdate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFldloginid() {
        return fldloginid;
    }

    public void setFldloginid(String fldloginid) {
        this.fldloginid = fldloginid == null ? null : fldloginid.trim();
    }

    public String getFldname() {
        return fldname;
    }

    public void setFldname(String fldname) {
        this.fldname = fldname == null ? null : fldname.trim();
    }

    public String getFldpassword() {
        return fldpassword;
    }

    public void setFldpassword(String fldpassword) {
        this.fldpassword = fldpassword == null ? null : fldpassword.trim();
    }
    public Date getFldngdate() {
        return fldngdate;
    }

    public void setFldngdate(Date fldngdate) {
        this.fldngdate = fldngdate;
    }

}