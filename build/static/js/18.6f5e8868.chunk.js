(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{229:function(e,t,a){"use strict";a.r(t);var n=a(20),r=a(0),l=a.n(r),c=a(86),o=a(80),s=a(83),i=a(90),u=a(147),m=a(89),f=a(30);a(87),a(85);t.default=function(){var e={}.currentUser,t=(e&&e.uid,Object(r.useState)([])),a=Object(n.a)(t,2),d=a[0],p=a[1],b=Object(r.useState)([]),v=Object(n.a)(b,2),O=v[0],E=v[1],j=Object(r.useState)([]),h=Object(n.a)(j,2),y=h[0],N=h[1],x=Object(r.useState)([]),P=Object(n.a)(x,2),S=P[0],C=P[1],g=Object(r.useState)([]),I=Object(n.a)(g,2),R=I[0],w=I[1],k=Object(r.useState)([]),T=Object(n.a)(k,2),L=T[0],F=T[1],V=Object(r.useState)(!1),G=Object(n.a)(V,2),A=(G[0],G[1]),Q=Object(r.useState)(!1),q=Object(n.a)(Q,2),B=(q[0],q[1]),H=Object(r.useState)({}),M=Object(n.a)(H,2),_=(M[0],M[1],Object(r.useState)(!1)),z=Object(n.a)(_,2),J=z[0],K=z[1],D=Object(r.useState)(!1),U=Object(n.a)(D,2),W=U[0],X=U[1],Y=Object(r.useState)(!1),Z=Object(n.a)(Y,2),$=Z[0],ee=Z[1],te=Object(r.useState)(""),ae=Object(n.a)(te,2),ne=(ae[0],ae[1],Object(r.useState)("")),re=Object(n.a)(ne,2),le=(re[0],re[1],Object(r.useState)([])),ce=Object(n.a)(le,2),oe=ce[0],se=ce[1],ie=Object(r.useState)([]),ue=Object(n.a)(ie,2),me=ue[0],fe=ue[1],de=Object(r.useState)([]),pe=Object(n.a)(de,2),be=(pe[0],pe[1],Object(r.useState)([])),ve=Object(n.a)(be,2),Oe=(ve[0],ve[1],Object(r.useState)([])),Ee=Object(n.a)(Oe,2),je=(Ee[0],Ee[1],Object(r.useState)([])),he=Object(n.a)(je,2),ye=(he[0],he[1],Object(r.useState)([])),Ne=Object(n.a)(ye,2),xe=(Ne[0],Ne[1],Object(r.useState)([])),Pe=Object(n.a)(xe,2),Se=(Pe[0],Pe[1],Object(r.useState)([])),Ce=Object(n.a)(Se,2),ge=(Ce[0],Ce[1],Object(r.useState)([])),Ie=Object(n.a)(ge,2),Re=(Ie[0],Ie[1],Object(r.useState)([])),we=Object(n.a)(Re,2),ke=(we[0],we[1],f.a.firestore().collection("program")),Te=f.a.firestore().collection("module"),Le=f.a.firestore().collection("level"),Fe=f.a.firestore().collection("assessmenttype"),Ve=f.a.firestore().collection("questiontypes"),Ge=f.a.firestore().collection("question");function Ae(){A(!0),Ge.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),p(t)}),ke.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),E(t)}),Fe.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),w(t)}),Ve.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),F(t)}),Le.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),C(t)})}return Object(r.useEffect)(function(){B(!1),Ae()},[]),l.a.createElement(r.Fragment,null,l.a.createElement(c.a,null,l.a.createElement(o.a,null,l.a.createElement(s.a,null,l.a.createElement(s.a.Header,null,l.a.createElement(s.a.Title,{as:"h5"},"Question Reports")),l.a.createElement(s.a.Body,null,l.a.createElement(c.a,null,l.a.createElement(o.a,{md:6},l.a.createElement(i.a,null,l.a.createElement(i.a.Group,{controlId:"formProgram"},l.a.createElement(i.a.Label,null,"Program / Class"),l.a.createElement(i.a.Control,{as:"select",value:J,className:"mb-3",onChange:function(e){return t=e.target.value,void Te.onSnapshot(function(e){var a=[];e.forEach(function(e){e.data().program==t&&a.push(e.data())}),K(t),N(a)});var t}},l.a.createElement("option",{value:""},"Select"),O.map(function(e,t){var a=e.name;return l.a.createElement("option",{value:a},a)}))),l.a.createElement(i.a.Group,{controlId:"formLevel"},l.a.createElement(i.a.Label,null,"Level"),l.a.createElement(i.a.Control,{as:"select",value:$,className:"mb-3",onChange:function(e){return ee(e.target.value)}},l.a.createElement("option",{value:""},"Select"),S.map(function(e,t){var a=e.name;return l.a.createElement("option",{value:a},a)}))),l.a.createElement(i.a.Group,{controlId:"formAssessmentType"},l.a.createElement(i.a.Label,null,"Assessment Type"),l.a.createElement(i.a.Control,{as:"select",value:oe,className:"mb-3",onChange:function(e){return se(e.target.value)}},l.a.createElement("option",{value:""},"Select"),R.map(function(e,t){var a=e.name;return l.a.createElement("option",{value:a},a)}))))),l.a.createElement(o.a,{md:6},l.a.createElement(i.a,null,l.a.createElement(i.a.Group,{controlId:"formModule"},l.a.createElement(i.a.Label,null,"Module"),l.a.createElement(i.a.Control,{as:"select",value:W,className:"mb-3",onChange:function(e){return t=e.target.value,void X(t);var t}},l.a.createElement("option",{value:""},"Select"),y.map(function(e,t){var a=e.name;return l.a.createElement("option",{value:a},a)}))),l.a.createElement(i.a.Group,{controlId:"formQuestionType"},l.a.createElement(i.a.Label,null,"Question Type"),l.a.createElement(i.a.Control,{as:"select",value:me,className:"mb-3",onChange:function(e){return fe(e.target.value)}},l.a.createElement("option",{value:""},"Select"),L.map(function(e,t){var a=e.name;return l.a.createElement("option",{value:a},a)})))))),l.a.createElement(c.a,null,l.a.createElement(o.a,{md:6},l.a.createElement(u.a,{variant:"primary",onClick:function(){return function(){var e=Ge;""!=J&&(e=e.where("program","==",J)),""!=W&&(e=e.where("module","==",W)),""!=$&&(e=e.where("level","==",$)),""!=oe&&(e=e.where("assessmenttype","==",oe)),""!=me&&(e=e.where("questiontype","==",me)),e.onSnapshot(function(e){var t=[];e.forEach(function(e){t.push(e.data())}),p(t)})}()}},"Search"),l.a.createElement(u.a,{variant:"info",onClick:function(){return K(""),X(""),ee(""),se(""),fe(""),B(!1),void Ae()}},"Cancel"))))))),l.a.createElement(c.a,null,l.a.createElement(o.a,null,l.a.createElement(s.a,null,l.a.createElement(s.a.Header,null,l.a.createElement(s.a.Title,{as:"h5"},"Question Reports")),l.a.createElement(s.a.Body,null,l.a.createElement(m.a,{responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Program"),l.a.createElement("th",null,"Module"),l.a.createElement("th",null,"Level"),l.a.createElement("th",null,"Question Type"),l.a.createElement("th",null,"Assessment Type"),l.a.createElement("th",null,"Question"),l.a.createElement("th",null,"Hint"),l.a.createElement("th",null,"Option1"),l.a.createElement("th",null,"Option2"),l.a.createElement("th",null,"Option3"),l.a.createElement("th",null,"Option4"),l.a.createElement("th",null,"Answer"))),l.a.createElement("tbody",null,d.map(function(e){return l.a.createElement("tr",null,l.a.createElement("td",null,e.program),l.a.createElement("td",null,e.module),l.a.createElement("td",null,e.level),l.a.createElement("td",null,e.questiontype),l.a.createElement("td",null,e.assessmenttype),l.a.createElement("td",null,e.question),l.a.createElement("td",null,e.hint),l.a.createElement("td",null,e.option1),l.a.createElement("td",null,e.option2),l.a.createElement("td",null,e.option3),l.a.createElement("td",null,e.option4),l.a.createElement("td",null,e.answer))}))))))))}},74:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(81),c=a.n(l),o=r.a.createContext({controlId:void 0});o.Transform=c()(o),t.a=o},75:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=r.a.createContext(null)},77:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.as,a=e.className,l=e.type,c=Object(r.a)(e,["as","className","type"]);return i.a.createElement(t,Object(n.a)({},c,{className:o()(a,l&&l+"-feedback")}))},t}(i.a.Component);u.defaultProps={type:"valid",as:"div"},t.a=u},80:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=a(73),m=["xl","lg","md","sm","xs"],f=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.className,l=e.as,c=Object(r.a)(e,["bsPrefix","className","as"]),s=[],u=[];return m.forEach(function(e){var a,n,r,l=c[e];if(delete c[e],null!=l&&"object"===typeof l){var o=l.span;a=void 0===o||o,n=l.offset,r=l.order}else a=l;var i="xs"!==e?"-"+e:"";null!=a&&s.push(!0===a?""+t+i:""+t+i+"-"+a),null!=r&&u.push("order"+i+"-"+r),null!=n&&u.push("offset"+i+"-"+n)}),s.length||s.push(t),i.a.createElement(l,Object(n.a)({},c,{className:o.a.apply(void 0,[a].concat(s,u))}))},t}(i.a.Component);f.defaultProps={as:"div"},t.a=Object(u.a)(f,"col")},81:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e){return(0,r.default)(function(t){return n.default.createElement(e.Consumer,null,function(a){return n.default.createElement(e.Provider,{value:t.mapToValue(a)},t.children)})},{displayName:"ContextTransformer"})};var n=l(a(0)),r=l(a(88));function l(e){return e&&e.__esModule?e:{default:e}}},82:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=(a(2),a(78)),m=a.n(u),f=a(77),d=a(74),p=a(73),b=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e,t,a=this.props,l=a.bsPrefix,c=a.type,s=a.size,u=a.id,m=a.inputRef,f=a.className,d=a.isValid,p=a.isInvalid,b=a.plaintext,v=a.readOnly,O=a.as,E=Object(r.a)(a,["bsPrefix","type","size","id","inputRef","className","isValid","isInvalid","plaintext","readOnly","as"]);if(b)(t={})[l+"-plaintext"]=!0,e=t;else if("file"===c){var j;(j={})[l+"-file"]=!0,e=j}else{var h;(h={})[l]=!0,h[l+"-"+s]=s,e=h}return i.a.createElement(O,Object(n.a)({},E,{type:c,id:u,ref:m,readOnly:v,className:o()(f,e,d&&"is-valid",p&&"is-invalid")}))},t}(i.a.Component);b.defaultProps={as:"input"};var v=m()(d.a,function(e,t){var a=e.controlId;return{id:t.id||a}},Object(p.a)(b,{prefix:"form-control",forwardRefAs:"inputRef"}));v.Feedback=f.a,t.a=v},83:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=a(73),m=a(76),f=function(e){return i.a.forwardRef(function(t,a){return i.a.createElement("div",Object(n.a)({},t,{ref:a,className:o()(t.className,e)}))})},d=a(75),p=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.className,l=e.variant,c=e.as,s=Object(r.a)(e,["bsPrefix","className","variant","as"]),u=l?t+"-"+l:t;return i.a.createElement(c,Object(n.a)({className:o()(u,a)},s))},t}(i.a.Component);p.defaultProps={as:"img",variant:null};var b=Object(u.a)(p,"card-img"),v=Object(m.a)("card-body"),O=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).state={},t}return Object(l.a)(t,e),t.getDerivedStateFromProps=function(e){return{cardContext:{cardHeaderBsPrefix:e.bsPrefix+"-header"}}},t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.className,l=e.as,c=e.bg,s=e.text,u=e.border,m=e.body,f=e.children,p=Object(r.a)(e,["bsPrefix","className","as","bg","text","border","body","children"]),b=o()(a,t,c&&"bg-"+c,s&&"text-"+s,u&&"border-"+u);return i.a.createElement(d.a.Provider,{value:this.state.cardContext},i.a.createElement(l,Object(n.a)({className:b},p),m?i.a.createElement(v,null,f):f))},t}(i.a.Component);O.defaultProps={as:"div",body:!1};var E=f("h5"),j=f("h6"),h=Object(u.a)(O,"card");h.Img=b,h.Title=Object(m.a)("card-title",{Component:E}),h.Subtitle=Object(m.a)("card-subtitle",{Component:j}),h.Body=v,h.Link=Object(m.a)("card-link",{Component:"a"}),h.Text=Object(m.a)("card-text",{Component:"p"}),h.Header=Object(m.a)("card-header"),h.Footer=Object(m.a)("card-footer"),h.ImgOverlay=Object(m.a)("card-img-overlay");t.a=h},85:function(e,t,a){"use strict";t.a={BLANK_LINK:"javascript:void(0);"}},86:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=a(73),m=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.noGutters,l=e.as,c=e.className,s=Object(r.a)(e,["bsPrefix","noGutters","as","className"]);return i.a.createElement(l,Object(n.a)({},s,{className:o()(c,t,a&&"no-gutters")}))},t}(i.a.Component);m.defaultProps={as:"div",noGutters:!1},t.a=Object(u.a)(m,"row")},89:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(9),c=a(72),o=a.n(c),s=a(0),i=a.n(s),u=a(73),m=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.className,l=e.striped,c=e.bordered,s=e.hover,u=e.size,m=e.variant,f=e.responsive,d=Object(r.a)(e,["bsPrefix","className","striped","bordered","hover","size","variant","responsive"]),p=o()(t,a,m&&t+"-"+m,u&&t+"-"+u,l&&t+"-striped",c&&t+"-bordered",s&&t+"-hover"),b=i.a.createElement("table",Object(n.a)({},d,{className:p}));if(f){var v=t+"-responsive";return"string"===typeof f&&(v=v+"-"+f),i.a.createElement("div",{className:v},b)}return b},t}(i.a.Component);t.a=Object(u.a)(m,"table")},90:function(e,t,a){"use strict";var n=a(3),r=a(7),l=a(72),c=a.n(l),o=a(0),s=a.n(o),i=a(76),u=a(73),m=a(74);function f(e){var t=e.bsPrefix,a=e.innerRef,l=e.className,o=e.children,i=e.controlId,u=e.as,f=Object(r.a)(e,["bsPrefix","innerRef","className","children","controlId","as"]);return s.a.createElement(m.a.Provider,{value:{controlId:i}},s.a.createElement(u,Object(n.a)({},f,{ref:a,className:c()(l,t)}),o))}f.defaultProps={as:"div"};var d=Object(u.a)(f,"form-group"),p=a(82),b=a(9),v=a(77);function O(e){var t=e.id,a=e.bsPrefix,l=e.className,o=e.isValid,i=e.isInvalid,u=e.innerRef,f=e.isStatic,d=Object(r.a)(e,["id","bsPrefix","className","isValid","isInvalid","innerRef","isStatic"]);return s.a.createElement(m.a.Consumer,null,function(e){var r=e.controlId,m=e.custom;return s.a.createElement("input",Object(n.a)({},d,{ref:u,id:t||r,className:c()(l,!m&&a,m&&"custom-control-input",o&&"is-valid",i&&"is-invalid",f&&"position-static")}))})}O.defaultProps={type:"checkbox"};var E=Object(u.a)(O,"form-check-input");function j(e){var t=e.bsPrefix,a=e.className,l=e.innerRef,o=e.htmlFor,i=Object(r.a)(e,["bsPrefix","className","innerRef","htmlFor"]);return s.a.createElement(m.a.Consumer,null,function(e){var r=e.controlId,u=e.custom;return s.a.createElement("label",Object(n.a)({},i,{ref:l,htmlFor:o||r,className:c()(a,!u&&t,u&&"custom-control-label")}))})}j.defaultProps={type:"checkbox"};var h=Object(u.a)(j,"form-check-label"),y=function(e){function t(){return e.apply(this,arguments)||this}return Object(b.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.id,a=e.bsPrefix,l=e.inline,o=e.disabled,i=e.isValid,u=e.isInvalid,f=e.feedback,d=e.inputRef,p=e.className,b=e.style,O=e.title,j=e.type,y=e.label,N=e.children,x=e.custom,P=Object(r.a)(e,["id","bsPrefix","inline","disabled","isValid","isInvalid","feedback","inputRef","className","style","title","type","label","children","custom"]),S=null!=y&&!1!==y&&!N,C=s.a.createElement(E,Object(n.a)({},P,{type:j,ref:d,isValid:i,isInvalid:u,isStatic:!S,disabled:o}));return s.a.createElement(m.a.Transform,{mapToValue:function(e){var a=e.controlId;return{controlId:t||a,custom:x}}},s.a.createElement("div",{style:b,className:c()(p,!x&&a,x&&"custom-control custom-"+j,l&&(x?"custom-control":a)+"-inline")},N||s.a.createElement(s.a.Fragment,null,C,S&&s.a.createElement(h,{title:O},y),(i||u)&&s.a.createElement(v.a,{type:i?"valid":"invalid"},f))))},t}(s.a.Component);y.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""};var N=Object(u.a)(y,{forwardRefAs:"inputRef",prefix:"form-check"});N.Input=E,N.Label=h;var x=N,P=(a(2),a(78)),S=a.n(P),C=a(80);function g(e){var t=e.bsPrefix,a=e.column,l=e.srOnly,o=e.className,i=e.innerRef,u=Object(r.a)(e,["bsPrefix","column","srOnly","className","innerRef"]),m=c()(o,t,l&&"sr-only",a&&"col-form-label");return a?s.a.createElement(C.a,Object(n.a)({},u,{className:m,as:"label"})):s.a.createElement("label",Object(n.a)({},u,{ref:i,className:m}))}g.defaultProps={column:!1,srOnly:!1};var I=S()(m.a,function(e,t){var a=e.controlId;return{htmlFor:t.htmlFor||a}},Object(u.a)(g,"form-label"));function R(e){var t=e.bsPrefix,a=e.className,l=e.innerRef,o=e.as,i=Object(r.a)(e,["bsPrefix","className","innerRef","as"]);return s.a.createElement(o,Object(n.a)({},i,{ref:l,className:c()(a,t)}))}R.defaultProps={as:"small"};var w=Object(u.a)(R,"form-text");function k(e){var t=e.bsPrefix,a=e.inline,l=e.className,o=e.innerRef,i=e.validated,u=e.as,m=Object(r.a)(e,["bsPrefix","inline","className","innerRef","validated","as"]);return s.a.createElement(u,Object(n.a)({},m,{ref:o,className:c()(l,i&&"was-validated",a&&t+"-inline")}))}k.defaultProps={inline:!1,as:"form"};var T=Object(u.a)(k,"form");T.Row=Object(i.a)("form-row"),T.Group=d,T.Control=p.a,T.Check=x,T.Label=I,T.Text=w;t.a=T}}]);
//# sourceMappingURL=18.6f5e8868.chunk.js.map