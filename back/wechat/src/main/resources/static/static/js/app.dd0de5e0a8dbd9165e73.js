webpackJsonp([1],{"7zck":function(t,e){},"8Z9+":function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("//Fk"),s=i.n(n),o=(i("j1ja"),i("7+uW")),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=i("VU/8")({name:"App"},a,!1,function(t){i("8Z9+")},null,null).exports,l=i("/ocq"),c={props:{source:String},data:function(){return{fldpassword:"",fldloginid:"",tipdialog:!1,tips:"",exitdialog:"",exittip:""}},created:function(){sessionStorage.getItem("u")?this.$router.push({name:"ChatList",params:{}}):this.toBackQuit()},beforeDestroy:function(){window.removeEventListener("popstate",this.onBackKeyDown,!1)},methods:{doLogin:function(){var t=this;this.$post("/login",{fldloginid:this.fldloginid,fldpassword:this.fldpassword}).then(function(e){if(e.e)t.tips=e.e,t.tipdialog=!0;else{var i=e.d;t.$router.push({name:"ChatList",params:{u:i}})}})},doRegister:function(){this.$router.push({name:"Register",params:{}})},loginEnterFun:function(){this.$refs.password.$refs.input.focus()},exitApp:function(){navigator.app.exitApp()},toBackQuit:function(){window.history.pushState({title:"简聊",url:"#"},"简聊","#"),window.addEventListener("popstate",this.onBackKeyDown,!1)},onBackKeyDown:function(){this.exitdialog=!0,this.exittip="退出?"}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"login"}},[i("v-content",[i("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[i("v-card",{staticClass:"elevation-12"},[i("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[i("v-toolbar-title",[t._v("欢迎")]),t._v(" "),i("v-spacer")],1),t._v(" "),i("v-card-text",[i("v-form",[i("v-text-field",{attrs:{label:"用户名",name:"fldloginid","prepend-icon":"fa fa-user",type:"text"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.loginEnterFun(e)}},model:{value:t.fldloginid,callback:function(e){t.fldloginid=e},expression:"fldloginid"}}),t._v(" "),i("v-text-field",{ref:"password",attrs:{id:"fldpassword",label:"密码",name:"fldpassword","prepend-icon":"fa fa-unlock-alt",type:"password"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin(e)}},model:{value:t.fldpassword,callback:function(e){t.fldpassword=e},expression:"fldpassword"}})],1)],1),t._v(" "),i("v-card-text",[i("v-spacer"),t._v(" "),i("div",{staticClass:"text-center"},[i("v-btn",{attrs:{color:"primary"},on:{click:t.doLogin}},[t._v("登录")]),t._v(" "),i("v-btn",{attrs:{color:"success"},on:{click:t.doRegister}},[t._v("注册")])],1)],1)],1)],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{width:"500"},model:{value:t.tipdialog,callback:function(e){t.tipdialog=e},expression:"tipdialog"}},[i("v-card",[i("v-card-title",[i("span",[t._v(t._s(t.tips))])]),t._v(" "),i("v-spacer"),t._v(" "),i("v-card-text",{attrs:{align:"center"}},[i("v-btn",{attrs:{color:"success"},on:{click:function(e){t.tipdialog=!1}}},[t._v("关闭")])],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{width:"500"},model:{value:t.exitdialog,callback:function(e){t.exitdialog=e},expression:"exitdialog"}},[i("v-card",[i("v-card-title",[i("span",[t._v(t._s(t.exittip))])]),t._v(" "),i("v-card-text",{attrs:{align:"center"}},[i("v-btn",{attrs:{color:"primary"},on:{click:t.exitApp}},[t._v("确定")]),t._v(" "),i("v-btn",{attrs:{color:"success"},on:{click:function(e){t.exitdialog=!1}}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]},u=i("VU/8")(c,d,!1,null,null,null).exports,f=i("mvHQ"),h=i.n(f),v={name:"chatList",data:function(){return{password:"",u:"",items:[]}},created:function(){this.getParams(),this.getChatList(),this.initializeChat()},methods:{getParams:function(){this.u=this.$route.params.u,this.u?sessionStorage.setItem("u",h()(this.u)):sessionStorage.getItem("u")?this.u=JSON.parse(sessionStorage.getItem("u")):this.logout()},toChat:function(t){this.$router.push({name:"ChatToChat",params:{item:t,u:this.u}})},getChatList:function(){var t=this;this.u&&this.$post("/listFriend",{id:this.u.id}).then(function(e){if(e&&e.length>0)for(var i=0;i<e.length;i++){var n=e[i].fldfriendid;n==t.u.id&&(n=e[i].flduserid);var s={id:n,fid:e[i].id,title:e[i].fldname,subtitle:e[i].fldlastcont||""};t.items.push(s)}})},logout:function(){window.$ChatWs&&window.$ChatWs.socket&&(window.$ChatWs.socket.close(),window.$ChatWs.socket=null,window.$ChatWs=null),sessionStorage.clear(),this.$router.push({name:"HelloWorld",params:{}})},initializeChat:function(){var t=this;function e(e){if(e.data)for(var i=JSON.parse(e.data),n=i.fldfrom,s=t.items,o=0;o<s.length;o++)if(s[o].id==n){var a=s[o].unreadNum;a?a++:a=1,s[o].unreadNum=a,s[o].subtitle=i.fldtext||i.fldlastcont||""}}if(window.$ChatWs&&window.$ChatWs.socket)window.$ChatWs.socket.onmessage=function(t){e(t)};else if(this.u){var i=this.u.id,n=t.$urlContextPath,s={connect:function(t){if("WebSocket"in window)s.socket=new WebSocket(t);else{if(!("MozWebSocket"in window))return;s.socket=new MozWebSocket(t)}s.socket.onopen=function(){},s.socket.onclose=function(){window.$ChatWs&&(window.$ChatWs.socket=null,window.$ChatWs=null)},s.socket.onmessage=function(t){e(t)}},initialize:function(){"http:"==window.location.protocol?s.connect("ws://"+window.location.host+n+"/websocket/chat/"+i):s.connect("wss://"+window.location.host+n+"/websocket/chat/"+i)}};s.socket||(s.socket=null,s.initialize()),window.$ChatWs=s}}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{attrs:{app:"",id:"chatlist"}},[i("div",{staticStyle:{width:"100%"}},[i("div",{staticStyle:{float:"left"}},[t._v("简聊")]),t._v(" "),i("div",{staticStyle:{float:"right",cursor:"pointer"},on:{click:t.logout}},[t._v("退出")])])]),t._v(" "),i("v-content",[i("v-container",[i("v-list",{attrs:{"three-line":""}},[t._l(t.items,function(e,n){return[e.divider?i("v-divider",{key:n,attrs:{inset:e.inset}}):i("v-list-item",{key:e.title,on:{click:function(i){return t.toChat(e)}}},[i("v-list-item-avatar",[i("i",{staticClass:"fa fa-user fa-lg",attrs:{"aria-hidden":"true"}},[i("sup",{staticStyle:{color:"red"}},[t._v(t._s(e.unreadNum))])])]),t._v(" "),i("v-list-item-content",[i("v-list-item-title",{domProps:{innerHTML:t._s(e.title)}}),t._v(" "),i("v-list-item-subtitle",{domProps:{innerHTML:t._s(e.subtitle)}})],1)],1)]})],2)],1)],1),t._v(" "),i("v-footer",{attrs:{app:""}})],1)},staticRenderFns:[]},m=i("VU/8")(v,p,!1,null,null,null).exports,g={name:"chatList",data:function(){return{u:"",chatU:"",name:"",message:"",start:0,items:[]}},created:function(){this.getParams(),this.getChatConts(),this.initChatSocket()},methods:{getParams:function(){var t=this.$route.params.u;this.u=t,this.u?sessionStorage.setItem("u",h()(this.u)):(sessionStorage.getItem("u")?this.u=JSON.parse(sessionStorage.getItem("u")):this.logout(),this.u=JSON.parse(sessionStorage.getItem("u")));var e=this.$route.params.item;this.chatU=e,this.chatU?sessionStorage.setItem("chatU",h()(this.chatU)):this.chatU=JSON.parse(sessionStorage.getItem("chatU")),this.name=this.chatU.title},toChatList:function(){this.$router.push({name:"ChatList",params:{}})},getChatConts:function(){var t=this;this.onloadingCont||(this.onloadingCont=!0,this.$post("/listChatCont",{fldfrom:this.u.id,fldto:this.chatU.id,start:this.start}).then(function(e){if(e&&e.length>0){for(var i=[],n=e.length-1;n>=0;n--){var s=(new Date).toJSON().substring(0,10),o=e[n].fldngdate;o&&o.substring(0,10)==s&&(o=o.substring(11)),o=o.substring(0,o.length-3);var a={title:e[n].fldname,subtitle:e[n].fldtext||"",time:o},r=e[n].fldfrom;r&&r!=t.u.id&&(a.leftP=!0),i.push(a)}t.items=i.concat(t.items),t.start=t.start+10,t.scrollToBottom(),t.onloadingCont=!1}}))},scrollToBottom:function(){setTimeout(function(){window.scrollTo(0,document.body.clientHeight)},0)},sendMessage:function(){this.sendSocket()},sendSocket:function(){var t={fldfrom:this.u.id,fldto:this.chatU.id,fldtext:this.message,fid:this.chatU.fid};function e(e){e.Chat.socket.send(h()(t)),e.message=""}this.Chat?e(this):this.initChatSocket(function(t){e(t)})},initChatSocket:function(t){var e=this;function i(t){if(t.data){var i=JSON.parse(t.data),n=i.ids;if(n){var s=n.split(","),o=loginUser.fldname+"<已读>";return void $.each(s,function(t,e){$("span[textid="+e+"]").text(o)})}var a=i.fldfrom,r=i.fldto,l=(new Date).toJSON().substring(0,10),c=i.fldngdate;if(c&&c.substring(0,10)==l&&(c=c.substring(11)),c=c.substring(0,c.length-3),a==e.u.id){if(r==e.chatU.id){var d=i.fldtext,u=(o=e.u.fldname,{subtitle:d,rightP:!0,time:c});e.items.push(u)}}else if(r==e.u.id){if(a==e.chatU.id){u={subtitle:d=i.fldtext,leftP:!0,time:c};e.items.push(u)}}e.scrollToBottom()}}if(window.$ChatWs){var n=window.$ChatWs;return this.Chat=n,void(n.socket.onmessage=function(t){i(t)})}var s=this.u.id,o=e.$urlContextPath;(n={connect:function(s){if("WebSocket"in window)n.socket=new WebSocket(s);else{if(!("MozWebSocket"in window))return;n.socket=new MozWebSocket(s)}n.socket.onopen=function(){t&&t.call(e)},n.socket.onclose=function(){window.$ChatWs.socket=null,window.$ChatWs=null},n.socket.onmessage=function(t){i(t)}},initialize:function(){"http:"==window.location.protocol?n.connect("ws://"+window.location.host+o+"/websocket/chat/"+s):n.connect("wss://"+window.location.host+o+"/websocket/chat/"+s)}}).socket||(n.socket=null,n.initialize()),window.$ChatWs=n,this.Chat=n},onMouseWheel:function(t){var e=e||window.event;(e.wheelDelta?e.wheelDelta<0:e.detail>0)||this.getChatConts()},logout:function(){window.$ChatWs&&window.$ChatWs.socket&&(window.$ChatWs.socket.close(),window.$ChatWs.socket=null,window.$ChatWs=null),sessionStorage.clear(),this.$router.push({name:"HelloWorld",params:{}})}}},w={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"chattochat"}},[i("v-app-bar",{attrs:{app:"",id:""}},[i("span",{staticClass:"leftpointer",on:{click:t.toChatList}},[i("i",{staticClass:"fa fa-chevron-left",attrs:{"aria-hidden":"true"}}),t._v("\n      "+t._s(t.name)+"\n    ")])]),t._v(" "),i("v-content",[i("v-container",{attrs:{id:"chatcontainer"},on:{mousewheel:function(e){return t.onMouseWheel(e)}}},[i("v-list",{attrs:{"three-line":""}},[t._l(t.items,function(e,n){return[e.divider?i("v-divider",{key:n,attrs:{inset:e.inset}}):e.leftP?i("v-list-item",{key:e.title},[i("v-list-item-avatar",[i("i",{staticClass:"fa fa-user fa-lg",attrs:{"aria-hidden":"true"}})]),t._v(" "),i("v-list-item-content",[i("v-list-item-subtitle",{domProps:{innerHTML:t._s(e.subtitle)}}),t._v(" "),i("span",[t._v(t._s(e.time))])],1)],1):i("v-list-item",{key:e.title},[i("v-list-item-content",[i("v-list-item-subtitle",{staticClass:"itemChat right",domProps:{innerHTML:t._s(e.subtitle)}}),t._v(" "),i("span",{staticClass:"right"},[t._v(t._s(e.time))])],1),t._v(" "),i("v-list-item-avatar",[i("i",{staticClass:"fa fa-user fa-lg",attrs:{"aria-hidden":"true"}})])],1)]})],2)],1)],1),t._v(" "),i("v-footer",{attrs:{app:""}},[i("v-textarea",{attrs:{"auto-grow":"",rows:"1","row-height":"10",label:"请输入"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),t._v(" "),i("v-btn",{attrs:{small:"",color:"primary"},on:{click:t.sendMessage}},[t._v("发送")])],1)],1)},staticRenderFns:[]};var k=i("VU/8")(g,w,!1,function(t){i("pfIS")},"data-v-16c4242a",null).exports,_={props:{source:String},data:function(){return{fldloginid:"",fldname:"",fldpassword:"",dialog:"",tipdialog:!1,tips:""}},methods:{doRegSubmit:function(){var t=this;return this.fldloginid?this.fldname?this.fldpassword?void this.$post("/register",{fldloginid:this.fldloginid,fldname:this.fldname,fldpassword:this.fldpassword}).then(function(e){-1==e?(t.tipdialog=!0,t.tips="账户已经存在了,请换个账户注册"):t.dialog=!0}):(this.tipdialog=!0,void(this.tips="请输入密码")):(this.tipdialog=!0,void(this.tips="请输入用户名")):(this.tipdialog=!0,void(this.tips="请输入账户"))},toLoginPage:function(){this.$router.push({name:"HelloWorld",params:{}})},loginEnterFun:function(){this.$refs.password.$refs.input.focus()},loginEnterFun2:function(){this.$refs.fldname.$refs.input.focus()}}},C={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"register"}},[i("v-content",[i("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[i("v-card",{staticClass:"elevation-12"},[i("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[i("v-toolbar-title",[t._v("注册")]),t._v(" "),i("v-spacer")],1),t._v(" "),i("v-card-text",[i("v-form",[i("v-text-field",{attrs:{label:"账户",name:"fldloginid","prepend-icon":"fa fa-user",type:"text"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.loginEnterFun2(e)}},model:{value:t.fldloginid,callback:function(e){t.fldloginid=e},expression:"fldloginid"}}),t._v(" "),i("v-text-field",{ref:"fldname",attrs:{label:"用户名",name:"fldname","prepend-icon":"fa fa-user",type:"text"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.loginEnterFun(e)}},model:{value:t.fldname,callback:function(e){t.fldname=e},expression:"fldname"}}),t._v(" "),i("v-text-field",{ref:"password",attrs:{id:"password",label:"密码",name:"fldpassword","prepend-icon":"fa fa-unlock-alt",type:"password"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin(e)}},model:{value:t.fldpassword,callback:function(e){t.fldpassword=e},expression:"fldpassword"}})],1)],1),t._v(" "),i("v-card-text",[i("v-spacer"),t._v(" "),i("div",{staticClass:"text-center"},[i("v-btn",{attrs:{color:"primary"},on:{click:t.doRegSubmit}},[t._v("提交")]),t._v(" "),i("v-btn",{attrs:{color:"success"},on:{click:t.toLoginPage}},[t._v("返回登录页")])],1)],1)],1)],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{width:"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[i("span",[t._v("注册成功")])]),t._v(" "),i("v-spacer"),t._v(" "),i("v-card-text",{attrs:{align:"center"}},[i("v-btn",{attrs:{color:"success"},on:{click:t.toLoginPage}},[t._v("返回登录页")])],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{width:"500"},model:{value:t.tipdialog,callback:function(e){t.tipdialog=e},expression:"tipdialog"}},[i("v-card",[i("v-card-title",[i("span",[t._v(t._s(t.tips))])]),t._v(" "),i("v-spacer"),t._v(" "),i("v-card-text",{attrs:{align:"center"}},[i("v-btn",{attrs:{color:"success"},on:{click:function(e){t.tipdialog=!1}}},[t._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]},b=i("VU/8")(_,C,!1,null,null,null).exports;o.default.use(l.a);var x=new l.a({routes:[{path:"/",name:"HelloWorld",component:u},{path:"/ChatList",name:"ChatList",component:m},{path:"/ChatToChat",name:"ChatToChat",component:k},{path:"/Register",name:"Register",component:b}]}),y=(i("ao2D"),i("3EgV")),S=i.n(y);i("7zck");o.default.use(S.a);var W=new S.a({icons:{iconfont:"fa"}}),L=i("mtWM"),O=i.n(L);O.a.interceptors.request.use(function(t){var e=localStorage.getItem("x-auth-token");return e&&(t.headers.token=""+e),-1===t.url.indexOf("/chat")&&(t.url="/chat"+t.url),t},function(t){return s.a.reject(t)});o.default.prototype.$urlContextPath="/chat",o.default.prototype.$axios=O.a,o.default.prototype.$post=function(t,e){return new s.a(function(i,n){O.a.post(t,e).then(function(t){i(t.data)}).catch(function(t){n(t)})})},o.default.config.productionTip=!1,new o.default({el:"#app",router:x,vuetify:W,components:{App:r},template:"<App/>"})},ao2D:function(t,e){},pfIS:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.dd0de5e0a8dbd9165e73.js.map