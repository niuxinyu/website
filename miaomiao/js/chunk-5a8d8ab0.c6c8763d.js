(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a8d8ab0"],{"0f77":function(t,a,e){"use strict";var n=e("6c54"),i=e.n(n);i.a},"310e":function(t,a,e){"use strict";var n=e("b5da"),i=e.n(n);i.a},"6c54":function(t,a,e){},"6ecc":function(t,a,e){},"742f":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("header",{attrs:{id:"head"}},[t._t("default"),e("h1",[t._v(t._s(t.title))])],2)},i=[],o={name:"nheader",data:function(){return{}},props:{title:{type:String,default:"喵喵电影"}}},s=o,c=(e("e6bc"),e("17cc")),r=Object(c["a"])(s,n,i,!1,null,"cd804e74",null);a["a"]=r.exports},ae33:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("footer",{attrs:{id:"footer"}},[e("ul",[e("router-link",{attrs:{tag:"li",to:"/movie"}},[e("i",{staticClass:"iconfont icon-dianying"}),e("p",[t._v("电影")])]),e("router-link",{attrs:{tag:"li",to:"/cinema"}},[e("i",{staticClass:"iconfont icon-yingyuan"}),e("p",[t._v("影院")])]),e("router-link",{attrs:{tag:"li",to:"/mine"}},[e("i",{staticClass:"iconfont icon-wode"}),e("p",[t._v("我的")])])],1)])},i=[],o={},s=o,c=(e("0f77"),e("17cc")),r=Object(c["a"])(s,n,i,!1,null,"3c441518",null);a["a"]=r.exports},b5da:function(t,a,e){},e6bc:function(t,a,e){"use strict";var n=e("6ecc"),i=e.n(n);i.a},ee1a:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"main"}},[e("nHeader"),e("div",{attrs:{id:"content"}},[e("div",{staticClass:"movie_menu"},[e("router-link",{staticClass:"city_name",attrs:{tag:"div",to:"/movie/city"}},[e("span",[t._v(t._s(t.$store.state.city.nm))]),e("i",{staticClass:"iconfont icon-lower-triangle"})]),e("div",{staticClass:"hot_swtich"},[e("router-link",{staticClass:"hot_item",attrs:{tag:"div",to:"/movie/nowplaying"}},[t._v("正在热映")]),e("router-link",{staticClass:"hot_item",attrs:{tag:"div",to:"/movie/comingSoon"}},[t._v("即将上映")])],1),e("router-link",{staticClass:"search_entry",attrs:{tag:"div",to:"/movie/search"}},[e("i",{staticClass:"iconfont icon-sousuo"})])],1),e("keep-alive",[e("router-view")],1)],1),e("nTabbar"),e("router-view",{attrs:{name:"detail"}})],1)},i=[],o=e("742f"),s=e("ae33"),c=e("660a"),r={name:"movie",data:function(){return{}},components:{nHeader:o["a"],nTabbar:s["a"]},mounted:function(){var t=this;setTimeout(function(){t.$http.get("/api/getLocation").then(function(a){if(0===a.data.status){var e=a.data.data.id,n=a.data.data.nm;if(t.$store.state.city.id==e)return;t.messagebox=c["MessageBox"].confirm("定位为"+n+"，是否修改？").then(function(){t.$store.state.city.nm=n,t.$store.state.city.id=e,window.localStorage.setItem("nowNM",n),window.localStorage.setItem("nowID",e),window.location.reload()})}})},2e3)}},u=r,l=(e("310e"),e("17cc")),d=Object(l["a"])(u,n,i,!1,null,"4f8dff80",null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-5a8d8ab0.c6c8763d.js.map