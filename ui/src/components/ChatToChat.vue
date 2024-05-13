<template>
  <v-app id="chattochat">
    <v-app-bar app id>
      <span @click="toChatList" class="leftpointer">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{name}}
      </span>
    </v-app-bar>
    <v-content>
      <v-container id="chatcontainer" @mousewheel="onMouseWheel($event)">
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-item v-else-if="item.leftP" :key="item.title">
              <v-list-item-avatar>
                <!-- <v-img :src="item.avatar"></v-img> -->
                <i class="fa fa-user fa-lg" aria-hidden="true"></i>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle class v-html="item.subtitle"></v-list-item-subtitle>
                <span>{{item.time}}</span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :key="item.title">
              <v-list-item-content>
                <v-list-item-subtitle class="itemChat right" v-html="item.subtitle"></v-list-item-subtitle>
                <span class="right">{{item.time}}</span>
              </v-list-item-content>
              <v-list-item-avatar>
                <!-- <v-img :src="item.avatar"></v-img> -->
                <i class="fa fa-user fa-lg" aria-hidden="true"></i>
              </v-list-item-avatar>
            </v-list-item>
          </template>
        </v-list>
      </v-container>
    </v-content>
    <v-footer app>
      <v-textarea auto-grow rows="1" row-height="10" label="请输入" v-model="message"></v-textarea>
      <v-btn small color="primary" @click="sendMessage">发送</v-btn>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "chatList",
  data() {
    return {
      u: "",
      chatU: "",
      name: "",
      message: "",
      start: 0,
      items: []
    };
  },
  created() {
    this.getParams();
    this.getChatConts();
    this.initChatSocket();
  },
  methods: {
    getParams() {
      var u = this.$route.params.u;
      this.u = u;
      if (this.u) {
        sessionStorage.setItem("u", JSON.stringify(this.u));
      } else {
        if (sessionStorage.getItem("u")) {
          this.u = JSON.parse(sessionStorage.getItem("u"));
        } else {
          this.logout();
        }
        this.u = JSON.parse(sessionStorage.getItem("u"));
      }
      var item = this.$route.params.item;
      this.chatU = item;
      if (this.chatU) {
        sessionStorage.setItem("chatU", JSON.stringify(this.chatU));
      } else {
        this.chatU = JSON.parse(sessionStorage.getItem("chatU"));
      }
      this.name = this.chatU.title;
    },
    toChatList() {
      this.$router.push({ name: "ChatList", params: {} });
    },
    getChatConts() {
      if (this.onloadingCont) return;
      this.onloadingCont = true;
      this.$post("/listChatCont", {
        fldfrom: this.u.id,
        fldto: this.chatU.id,
        start: this.start
      }).then(r => {
        if (r && r.length > 0) {
          var tempItems = [];
          for (var i = r.length - 1; i >= 0; i--) {
            var today = new Date().toJSON().substring(0, 10);
            var fldngdate = r[i].fldngdate;
            if (fldngdate && fldngdate.substring(0, 10) == today) {
              fldngdate = fldngdate.substring(11);
            }
            fldngdate = fldngdate.substring(0, fldngdate.length - 3);
            var oneItem = {
              title: r[i].fldname,
              subtitle: r[i].fldtext || "",
              time: fldngdate
            };
            var fldfrom = r[i].fldfrom;
            if (fldfrom && fldfrom != this.u.id) {
              oneItem.leftP = true;
            }
            tempItems.push(oneItem);
          }
          this.items = tempItems.concat(this.items);
          this.start = this.start + 10;

          this.scrollToBottom();
          this.onloadingCont = false;
        }
      });
    },
    scrollToBottom() {
      setTimeout(function() {
        window.scrollTo(0, document.body.clientHeight);
      }, 0);
    },
    sendMessage() {
      this.sendSocket();
    },
    sendSocket() {
      var m = {
        fldfrom: this.u.id,
        fldto: this.chatU.id,
        fldtext: this.message,
        fid: this.chatU.fid
      };
      function toSend(me) {
        me.Chat.socket.send(JSON.stringify(m));
        me.message = "";
      }
      if (!this.Chat) {
        this.initChatSocket(function(me) {
          toSend(me);
        });
      } else {
        toSend(this);
      }
    },
    initChatSocket(callback) {
      var me = this;
      function showImNum(message) {
        var data = message.data;
        if (data) {
          var data0 = JSON.parse(message.data);
          var ids = data0.ids;
          if (ids) {
            var idsA = ids.split(",");
            var name = loginUser.fldname + "<已读>";
            $.each(idsA, function(index, v) {
              $("span[textid=" + v + "]").text(name);
            });
            return;
          }
          var from = data0.fldfrom;
          var to = data0.fldto;
          var today = new Date().toJSON().substring(0, 10);
          var fldngdate = data0.fldngdate;
          if (fldngdate && fldngdate.substring(0, 10) == today) {
            fldngdate = fldngdate.substring(11);
          }
          fldngdate = fldngdate.substring(0, fldngdate.length - 3);
          if (from == me.u.id) {
            var nowto = me.chatU.id;
            if (to == nowto) {
              var text = data0.fldtext;
              var name = me.u.fldname;
              var onecont = {
                subtitle: text,
                rightP: true,
                time: fldngdate
              };
              me.items.push(onecont);
            }
          }
          else if (to == me.u.id) {
            var nowto = me.chatU.id;
            if (from == nowto) {
              var text = data0.fldtext;
              var onecont = {
                subtitle: text,
                leftP: true,
                time: fldngdate
              };
              me.items.push(onecont);
            }
          }
          me.scrollToBottom();
        }
      }

      if (window.$ChatWs) {
        var Chat = window.$ChatWs;
        this.Chat = Chat;
        Chat.socket.onmessage = function(message) {
          //服务器发送过来的消息
          showImNum(message);
        };
        return;
      }
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

        Chat.socket.onopen = function() {
          if (callback) callback.call(me);
        };

        Chat.socket.onclose = function() {
          //alert(4);
          window.$ChatWs.socket = null;
          window.$ChatWs = null;
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
      this.Chat = Chat;
    },
    onMouseWheel(e) {
      var ev = ev || window.event;
      var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
      down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
      if (down) {
      } else {
        this.getChatConts();
      }
    },
    logout() {
      if (window.$ChatWs && window.$ChatWs.socket) {
        window.$ChatWs.socket.close();
        window.$ChatWs.socket = null;
        window.$ChatWs = null;
      }
      sessionStorage.clear();
      this.$router.push({ name: "HelloWorld", params: {} });
    }
  }
};
</script>
<style scoped>
.v-list-item__content .itemChat {
  white-space: normal;
  -webkit-box-orient: vertical;
  display: block;
}
.v-list-item__content .right {
  text-align: right;
}
.v-list-item__content span {
  font-size: 14px;
}
.leftpointer {
  cursor: pointer;
}
html {
  overflow: auto;
}
</style>