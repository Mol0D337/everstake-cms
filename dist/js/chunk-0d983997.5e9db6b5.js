(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d983997"],{"082e":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-card",{staticClass:"header-solid h-full card-profile-information",attrs:{bordered:!1,bodyStyle:{paddingTop:0,paddingBottom:"16px"},headStyle:{paddingRight:0}},scopedSlots:t._u([{key:"title",fn:function(){return[a("h6",{staticClass:"font-semibold m-0"},[t._v("Profile Information")])]},proxy:!0}])},[a("a-button",{attrs:{slot:"extra",type:"link"},slot:"extra"},[a("svg",{attrs:{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{staticClass:"fill-muted",attrs:{d:"M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z",fill:"#111827"}}),a("path",{staticClass:"fill-muted",attrs:{d:"M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z",fill:"#111827"}})])]),a("p",{staticClass:"text-dark"},[t._v(" Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality). ")]),a("hr",{staticClass:"my-25"}),a("a-descriptions",{attrs:{title:"Oliver Liam",column:1}},[a("a-descriptions-item",{attrs:{label:"Full Name"}},[t._v(" Sarah Emily Jacob ")]),a("a-descriptions-item",{attrs:{label:"Mobile"}},[t._v(" (44) 123 1234 123 ")]),a("a-descriptions-item",{attrs:{label:"Email"}},[t._v(" sarahjacob@mail.com ")]),a("a-descriptions-item",{attrs:{label:"Location"}},[t._v(" USA ")]),a("a-descriptions-item",{attrs:{label:"Social"}},[a("a",{staticClass:"mx-5 px-5",attrs:{href:"#"}},[a("a-icon",{staticStyle:{color:"#3EA1EC"},attrs:{type:"twitter"}})],1),a("a",{staticClass:"mx-5 px-5",attrs:{href:"#"}},[a("a-icon",{staticStyle:{color:"#344E86"},attrs:{type:"facebook"}})],1),a("a",{staticClass:"mx-5 px-5",attrs:{href:"#"}},[a("a-icon",{staticStyle:{color:"#E1306C"},attrs:{type:"instagram"}})],1)])],1)],1)},i=[],o={data:function(){return{}}},r=o,l=a("2877"),n=Object(l["a"])(r,s,i,!1,null,null,null);e["a"]=n.exports},"09c0":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-card",{staticClass:"card-project"},[a("img",{attrs:{slot:"cover",alt:"example",src:t.cover},slot:"cover"}),a("div",{staticClass:"card-tag"},[t._v("Block")]),a("h5",[t._v(t._s(t.title))]),a("p",[t._v(" "+t._s(t.content)+" ")]),a("a-row",{staticClass:"card-footer",attrs:{type:"flex",gutter:6,align:"middle"}},[a("a-col",{attrs:{span:12}},[a("a-button",{attrs:{size:"small"}},[t._v("EDIT BLOCK")])],1)],1)],1)},i=[],o={props:{title:{type:String,default:""},content:{type:String,default:""},cover:{type:String,default:""}},data:function(){return{}}},r=o,l=a("2877"),n=Object(l["a"])(r,s,i,!1,null,null,null);e["a"]=n.exports},bfa7:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-card",{staticClass:"header-solid h-full",attrs:{bordered:!1,bodyStyle:{paddingTop:0,paddingBottom:"16px"}},scopedSlots:t._u([{key:"title",fn:function(){return[a("h6",{staticClass:"font-semibold m-0"},[t._v("Conversations")])]},proxy:!0}])},[a("a-list",{staticClass:"conversations-list",attrs:{"item-layout":"horizontal",split:!1,"data-source":t.data},scopedSlots:t._u([{key:"renderItem",fn:function(e){return a("a-list-item",{},[a("a-button",{attrs:{slot:"actions",type:"link"},slot:"actions"},[t._v(" REPLY ")]),a("a-list-item-meta",{attrs:{title:e.title,description:e.code}},[a("a-avatar",{attrs:{slot:"avatar",size:48,shape:"square",src:e.avatar},slot:"avatar"})],1)],1)}}])})],1)},i=[],o={props:{data:{type:Array,default:function(){return[]}}},data:function(){return{}}},r=o,l=a("2877"),n=Object(l["a"])(r,s,i,!1,null,null,null);e["a"]=n.exports},c66d:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"profile-nav-bg",staticStyle:{"background-image":"url('images/bg-profile.jpg')"}}),a("a-card",{staticClass:"card-profile-head",attrs:{bordered:!1,bodyStyle:{padding:0}},scopedSlots:t._u([{key:"title",fn:function(){return[a("a-row",{attrs:{type:"flex",align:"middle"}},[a("a-col",{staticClass:"col-info",attrs:{span:24,md:12}},[a("a-avatar",{attrs:{size:74,shape:"square",src:t.photoURL}}),a("div",{staticClass:"avatar-info"},[a("h4",{staticClass:"font-semibold m-0"},[t._v(t._s(t.displayName))]),a("p",[t._v(t._s(t.email))])])],1),a("a-col",{staticStyle:{display:"flex","align-items":"center","justify-content":"flex-end"},attrs:{span:24,md:12}},[a("a-radio-group",{attrs:{size:"small"},model:{value:t.profileHeaderBtns,callback:function(e){t.profileHeaderBtns=e},expression:"profileHeaderBtns"}},[a("a-radio-button",{attrs:{value:"overview"}},[t._v("OVERVIEW")]),a("a-radio-button",{attrs:{value:"teams"}},[t._v("TEAMS")]),a("a-radio-button",{attrs:{value:"projects"}},[t._v("PROJECTS")])],1)],1)],1)]},proxy:!0}])}),a("a-row",{attrs:{type:"flex",gutter:24}},[a("a-col",{staticClass:"mb-24",attrs:{span:24,md:8}},[a("CardPlatformSettings")],1),a("a-col",{staticClass:"mb-24",attrs:{span:24,md:8}},[a("CardProfileInformation")],1),a("a-col",{staticClass:"mb-24",attrs:{span:24,md:8}},[a("CardConversations",{attrs:{data:t.conversationsData}})],1)],1),a("a-card",{staticClass:"header-solid h-full mb-24",attrs:{bordered:!1,bodyStyle:{paddingTop:"14px"}},scopedSlots:t._u([{key:"title",fn:function(){return[a("h6",{staticClass:"font-semibold"},[t._v("Projects")]),a("p",[t._v("Architects design houses")])]},proxy:!0}])},[a("a-row",{attrs:{type:"flex",gutter:[24,24],align:"stretch"}},[t._l(t.projects,(function(t,e){return a("a-col",{key:e,attrs:{span:24,md:12,xl:6}},[a("CardProject",{attrs:{id:t.id,title:t.title,content:t.content,cover:t.cover,team:t.team}})],1)})),a("a-col",{attrs:{span:24,md:12,xl:6}},[a("a-upload",{staticClass:"projects-uploader",attrs:{name:"avatar","list-type":"picture-card","show-upload-list":!1}},[a("div",[a("svg",{attrs:{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z",fill:"#111827"}})]),a("div",{staticClass:"ant-upload-text font-semibold text-dark"},[t._v(" Upload New Project ")])],1)])],1)],2)],1)],1)},i=[],o=a("5530"),r=a("e6c1"),l=a("082e"),n=a("bfa7"),c=a("09c0"),d=a("2f62"),m=[{id:"1",title:"Sophie B.",code:"Hi! I need more information…",avatar:"images/face-3.jpg"},{id:"2",title:"Anne Marie",code:"Awesome work, can you…",avatar:"images/face-4.jpg"},{id:"3",title:"Ivan",code:"About files I can…",avatar:"images/face-5.jpeg"},{id:"4",title:"Peterson",code:"Have a great afternoon…",avatar:"images/face-6.jpeg"},{id:"5",title:"Nick Daniel",code:"Hi! I need more information…",avatar:"images/face-2.jpg"}],p=[{id:1,title:"Modern",content:"As Uber works through a huge amount of internal management turmoil.",cover:"images/home-decor-3.jpeg",team:["images/face-1.jpg","images/face-4.jpg","images/face-2.jpg","images/face-3.jpg"]},{id:2,title:"Scandinavian",content:"Music is something that every person has his or her own specific opinion about.",cover:"images/home-decor-2.jpeg",team:["images/face-1.jpg","images/face-4.jpg","images/face-2.jpg","images/face-3.jpg"]},{id:3,title:"Minimalist",content:"Different people have different taste, and various types of music, Zimbali Resort.",cover:"images/home-decor-1.jpeg",team:["images/face-1.jpg","images/face-4.jpg","images/face-2.jpg","images/face-3.jpg"]}],u={components:{CardPlatformSettings:r["a"],CardProfileInformation:l["a"],CardConversations:n["a"],CardProject:c["a"]},data:function(){return{profileHeaderBtns:"overview",conversationsData:m,projects:p}},computed:Object(o["a"])({},Object(d["c"])("auth",["photoURL","email","displayName"]))},f=u,v=a("2877"),g=Object(v["a"])(f,s,i,!1,null,null,null);e["default"]=g.exports},e6c1:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-card",{staticClass:"header-solid h-full",attrs:{bordered:!1,bodyStyle:{paddingTop:0,paddingBottom:0}},scopedSlots:t._u([{key:"title",fn:function(){return[a("h6",{staticClass:"font-semibold m-0"},[t._v("Platform Settings")])]},proxy:!0}])},[a("ul",{staticClass:"list settings-list"},[a("li",[a("h6",{staticClass:"list-header text-sm text-muted"},[t._v("ACCOUNT")])]),a("li",[a("a-switch",{model:{value:t.emailForFollows,callback:function(e){t.emailForFollows=e},expression:"emailForFollows"}}),a("span",[t._v("Email me when someone follows me")])],1),a("li",[a("a-switch",{model:{value:t.emailForAnswers,callback:function(e){t.emailForAnswers=e},expression:"emailForAnswers"}}),a("span",[t._v("Email me when someone answers me")])],1),a("li",[a("a-switch",{model:{value:t.emailForMentions,callback:function(e){t.emailForMentions=e},expression:"emailForMentions"}}),a("span",[t._v("Email me when someone mentions me")])],1),a("li",[a("h6",{staticClass:"list-header text-sm text-muted m-0"},[t._v("APPLICATION")])]),a("li",[a("a-switch",{model:{value:t.emailForNewProjects,callback:function(e){t.emailForNewProjects=e},expression:"emailForNewProjects"}}),a("span",[t._v("New launches and projects")])],1),a("li",[a("a-switch",{model:{value:t.emailForProductUpdates,callback:function(e){t.emailForProductUpdates=e},expression:"emailForProductUpdates"}}),a("span",[t._v("Monthly product updates")])],1),a("li",[a("a-switch",{model:{value:t.emailForNewsletter,callback:function(e){t.emailForNewsletter=e},expression:"emailForNewsletter"}}),a("span",[t._v("Subscribe to newsletter")])],1)])])},i=[],o={data:function(){return{emailForFollows:!0,emailForAnswers:!1,emailForMentions:!0,emailForNewProjects:!0,emailForProductUpdates:!1,emailForNewsletter:!0}}},r=o,l=a("2877"),n=Object(l["a"])(r,s,i,!1,null,null,null);e["a"]=n.exports}}]);
//# sourceMappingURL=chunk-0d983997.5e9db6b5.js.map