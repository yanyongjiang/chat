<template>
  <v-app>
    <v-app-bar app id="chatlist">
      <div style="width:100%;">
        <div style="float:left;">简聊</div>
        <div style="float:right;cursor: pointer;" @click="logout">退出</div>
      </div>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-item v-else :key="item.title" @click="toChat(item)">
              <v-list-item-avatar>
                <!-- <v-img :src="item.avatar"></v-img> -->
                <i class="fa fa-user fa-lg" aria-hidden="true">
                  <sup style="color:red;">{{item.unreadNum}}</sup>
                </i>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>
<script>
export default {
  name: "chatList",
  data() {
    return {
      password: "",
      u: "",
      items: []
    };
  },
  created() {
    this.getParams();
    this.getChatList();
    this.initializeChat();
  },
  methods: {
    getParams() {
      this.u = this.$route.params.u;
      if (this.u) {
        sessionStorage.setItem("u", JSON.stringify(this.u));
      } else {
        if (sessionStorage.getItem("u")) {
          this.u = JSON.parse(sessionStorage.getItem("u"));
        } else {
          this.logout();
        }
      }
    },
    toChat(item) {
      this.$router.push({
        name: "ChatToChat",
        params: { item: item, u: this.u }
      });
    },
    getChatList() {
      if (!this.u) return;
      this.$post("/listFriend", { id: this.u.id }).then(r => {
        if (r && r.length > 0) {
          for (var i = 0; i < r.length; i++) {
            var fid = r[i].fldfriendid;
            if (fid == this.u.id) {
              fid = r[i].flduserid;
            }
            var oneItem = {
              id: fid,
              fid: r[i].id,
              title: r[i].fldname,
              subtitle: r[i].fldlastcont || ""
            };
            this.items.push(oneItem);
          }
        }
      });
    },
    logout() {
      if (window.$ChatWs && window.$ChatWs.socket) {
        window.$ChatWs.socket.close();
        window.$ChatWs.socket = null;
        window.$ChatWs = null;
      }
      sessionStorage.clear();
      this.$router.push({ name: "HelloWorld", params: {} });
    },
    initializeChat() {
      var me = this;

      function showImNum(message) {
   
        var data = message.data;
        if (data) {
          var data0 = JSON.parse(message.data);
          var fldfrom = data0.fldfrom;
          var r = me.items;
          for (var i = 0; i < r.length; i++) {
            if (r[i].id == fldfrom) {
              var unreadNum = r[i].unreadNum;
              if (!unreadNum) {
                unreadNum = 1;
              } else {
                unreadNum++;
              }
              r[i].unreadNum = unreadNum;
              r[i].subtitle = data0.fldtext || data0.fldlastcont || "";
            }
          }
        }
      }

      if (window.$ChatWs && window.$ChatWs.socket) {
        window.$ChatWs.socket.onmessage = function(message) {
          showImNum(message);
        };
        return;
      }
      if (!this.u) return;
      var uid = this.u.id;
      var url = me.$urlContextPath;
      var Chat = {};
      Chat.connect = function(host) {
        if ("WebSocket" in window) {
          Chat.socket = new WebSocket(host);
        } else if ("MozWebSocket" in window) {
          Chat.socket = new MozWebSocket(host);
        } else {
          return;
        }

        Chat.socket.onopen = function() {};

        Chat.socket.onclose = function() {
          if (window.$ChatWs) {
            window.$ChatWs.socket = null;
            window.$ChatWs = null;
          }
        };

        Chat.socket.onmessage = function(message) {
          showImNum(message);
        };
      };
      Chat.initialize = function() {
        if (window.location.protocol == "http:") {
          Chat.connect(
            "ws://" + window.location.host + url + "/websocket/chat/" + uid
          );
        } else {
          Chat.connect(
            "wss://" + window.location.host + url + "/websocket/chat/" + uid
          );
        }
      };
      if (!Chat.socket) {
        Chat.socket = null;
        Chat.initialize();
      }
      window.$ChatWs = Chat;
    }
  }
};
</script>
