(this["webpackJsonpsocket-io-client"]=this["webpackJsonpsocket-io-client"]||[]).push([[0],{48:function(e,t,a){e.exports=a(89)},53:function(e,t,a){},86:function(e,t){},89:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(45),o=a.n(c),l=(a(53),a(23)),s=a(1),i=(a(9),a(6)),m=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],c=t[1],o=Object(s.f)();return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{className:"App-logo",alt:"app logo",src:"https://raw.githubusercontent.com/borisonr/codenames/master/client/src/logo_w.png"}),r.a.createElement("p",null,"Play Codenames online across multiple devices on a shapink board. To create a new game or join an existing game, enter a game identifier and click 'GO'."),r.a.createElement("form",null,r.a.createElement("input",{placeholder:"Room Name",type:"text",value:a,onChange:function(e){return c(e.target.value)}}),r.a.createElement("button",{onClick:function(){return e=a,void o.push(e);var e}},"Go"))))},u=a(47),d=a.n(u),p=function(e){var t=e.card,a=e.spymaster,n=e.guessWord,c=e.gameOver,o=a?t.category:"",l=t.guessed?"".concat(t.category,"-card"):"card";return r.a.createElement("button",{onClick:n,className:l,disabled:c||a},r.a.createElement("p",{className:o},t.word),(t.guessed||c)&&r.a.createElement("a",{href:t.url,target:"_blank",rel:"noopener noreferrer"},"Learn more"))},b=function(e){var t=e.board,a=e.role,n=e.socket,c=e.room,o=e.gameOver;return r.a.createElement("div",{className:"board"},t.map((function(e,t){return r.a.createElement(p,{key:e.word,card:e,spymaster:"spymaster"===a,guessWord:function(){return e=t,void n.emit("guessWord",e,c);var e},gameOver:o})})))},g=function(){var e=window.location.pathname.slice(1),t=Object(n.useState)("player"),a=Object(i.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(""),s=Object(i.a)(l,2),m=s[0],u=s[1],p=Object(n.useState)(!1),g=Object(i.a)(p,2),E=g[0],f=g[1],h=Object(n.useState)([]),v=Object(i.a)(h,2),y=v[0],w=v[1],O=Object(n.useState)({}),k=Object(i.a)(O,2),j=k[0],N=k[1],S=Object(n.useState)(void 0),C=Object(i.a)(S,2),T=C[0],G=C[1],W=Object(n.useState)(j.startingTeam),A=Object(i.a)(W,2),x=A[0],F=A[1];Object(n.useEffect)((function(){var t=d()("https://codecademynames.herokuapp.com/");return G(t),t.emit("joinRoom",e),t.on("newPlayer",(function(e){var t=e.board,a=e.currentTurn,n=e.score;w(t),N(n),F(a)})),t.on("newGame",(function(e){var t=e.board,a=e.currentTurn,n=e.score;w(t),N(n),F(a)})),t.on("newTurn",(function(e){var t=e.currentTurn;F(t)})),t.on("wordGuessed",(function(e){var t=e.board,a=e.currentTurn,n=e.score;N(n),w(t),F(a)})),t.on("gameOver",(function(e){var t=e.board,a=e.score,n=e.winner;f(!0),u(n),w(t),N(a)})),function(){return t.disconnect()}}),[e]);return r.a.createElement("div",{className:"App"},r.a.createElement("img",{src:"./logo.svg"}),r.a.createElement("p",null,"Send this link to friends: ",window.location.href),r.a.createElement("p",null,r.a.createElement("span",{className:"pink"},j.pink),"-",r.a.createElement("span",{className:"teal"},j.teal)),E?r.a.createElement("p",null,m," wins"):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:x},x,"'s turn"),r.a.createElement("button",{class:"bigbutton",onClick:function(){T.emit("endTurn",e)}},"End ",x,"'s turn")),r.a.createElement(b,{board:y,role:c,socket:T,room:e,gameOver:E}),r.a.createElement("input",{name:"player",checked:"player"===c,id:"player",onChange:function(){return o("player")},type:"radio",disabled:E}),r.a.createElement("label",{htmlFor:"player"},"Player"),r.a.createElement("input",{type:"radio",name:"spymaster",checked:"spymaster"===c,id:"spymaster",onChange:function(){return o("spymaster")},disabled:E}),r.a.createElement("label",{htmlFor:"spymaster"},"Spymaster"),r.a.createElement("button",{class:"bigbutton",onClick:function(){T.emit("newGame",e)}},"New Game"))},E=function(){return r.a.createElement(l.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/:room"},r.a.createElement(g,null)),r.a.createElement(s.a,{path:"/"},r.a.createElement(m,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){}},[[48,1,2]]]);
//# sourceMappingURL=main.0c0fcd79.chunk.js.map