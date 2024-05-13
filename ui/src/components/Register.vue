<template>
  <v-app id="register">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>注册</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                   <v-text-field
                    label="账户"
                    name="fldloginid"
                    prepend-icon="fa fa-user"
                    type="text"
                    v-model="fldloginid"
                    @keydown.enter.native="loginEnterFun2"
                  />
                  <v-text-field
                    label="用户名"
                    name="fldname"
                    prepend-icon="fa fa-user"
                    type="text"
                    v-model="fldname"
                    ref="fldname"
                    @keydown.enter.native="loginEnterFun"
                  />
                  <v-text-field
                    id="password"
                    label="密码"
                    name="fldpassword"
                    prepend-icon="fa fa-unlock-alt"
                    type="password"
                    v-model="fldpassword"
                    ref="password"
                    @keydown.enter.native="doLogin"
                  />
                </v-form>
              </v-card-text>
              <v-card-text>
                <v-spacer />
                <div class="text-center">
                  <v-btn color="primary" @click="doRegSubmit">提交</v-btn>
                  <v-btn color="success" @click="toLoginPage">返回登录页</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <span>注册成功</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text align="center">
          <v-btn color="success" @click="toLoginPage">返回登录页</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
     <v-dialog v-model="tipdialog" width="500">
      <v-card>
        <v-card-title>
          <span>{{tips}}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text align="center">
          <v-btn color="success" @click="tipdialog=false">确定</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      fldloginid: "",
      fldname: "",
      fldpassword: "",
      dialog: "",
      tipdialog:false,
      tips:""
    };
  },
  methods: {
    doRegSubmit() {
      if(!this.fldloginid){
           this.tipdialog=true;
           this.tips='请输入账户';
           return;
      }
      if(!this.fldname){
           this.tipdialog=true;
           this.tips='请输入用户名';
           return;
      }
       if(!this.fldpassword){
           this.tipdialog=true;
           this.tips='请输入密码';
           return;
      }
      this.$post("/register", {
          fldloginid: this.fldloginid,
          fldname: this.fldname,
          fldpassword:this.fldpassword
        })
        .then(r => {
         if(r==-1){    
            this.tipdialog=true;
            this.tips='账户已经存在了,请换个账户注册';
          }else{
              this.dialog = true;
          }
  
        });
    },
    toLoginPage() {
      this.$router.push({ name: "HelloWorld", params: {} });
    },
    loginEnterFun() {
      this.$refs.password.$refs.input.focus();
    },
    loginEnterFun2() {
      this.$refs.fldname.$refs.input.focus();
    }
  }
};
</script>
