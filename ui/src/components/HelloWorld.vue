<template>
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>欢迎</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="用户名"
                    name="fldloginid"
                    prepend-icon="fa fa-user"
                    type="text"
                    v-model="fldloginid"
                    @keydown.enter.native="loginEnterFun"
                  />

                  <v-text-field
                    id="fldpassword"
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
                  <v-btn color="primary" @click="doLogin">登录</v-btn>
                  <v-btn color="success" @click="doRegister">注册</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog v-model="tipdialog" width="500">
      <v-card>
        <v-card-title>
          <span>{{tips}}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text align="center">
          <v-btn color="success" @click="tipdialog=false">关闭</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="exitdialog" width="500">
      <v-card>
        <v-card-title>
          <span>{{exittip}}</span>
        </v-card-title>
        <v-card-text align="center">
          <v-btn color="primary" @click="exitApp">确定</v-btn>
          <v-btn color="success" @click="exitdialog=false">取消</v-btn>
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
      fldpassword: "",
      fldloginid: "",
      tipdialog: false,
      tips: "",
      exitdialog: "",
      exittip: ""
    };
  },
  created() {
    if (sessionStorage.getItem("u")) {
      this.$router.push({ name: "ChatList", params: {} });
      return;
    }
    this.toBackQuit();
  },
  beforeDestroy(){
    var me=this;
    window.removeEventListener("popstate", me.onBackKeyDown, false); // 注销返回键
  },
  methods: {
    doLogin() {
      this.$post("/login", {
        fldloginid: this.fldloginid,
        fldpassword: this.fldpassword
      }).then(r => {
        if (r.e) {
          this.tips = r.e;
          this.tipdialog = true;
        } else {
          var u = r.d;
          this.$router.push({ name: "ChatList", params: { u: u } });
        }
      });
    },
    doRegister() {
      this.$router.push({ name: "Register", params: {} });
    },
    loginEnterFun() {
      this.$refs.password.$refs.input.focus();
    },
    exitApp() {
      navigator.app.exitApp();
    },
    toBackQuit() {
      var me = this;
      var state = {
          title: "简聊",
          url: "#"
      };
      window.history.pushState(state, "简聊", "#");
      window.addEventListener("popstate", me.onBackKeyDown, false);
    },
    onBackKeyDown() {
      var me = this;
      this.exitdialog = true;
      this.exittip = "退出?"; 
    }
  }
};
</script>
