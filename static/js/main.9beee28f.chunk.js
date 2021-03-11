(this["webpackJsonpvidmob-exercise"]=this["webpackJsonpvidmob-exercise"]||[]).push([[0],{13:function(e,t,r){},15:function(e,t,r){"use strict";r.r(t);var a=r(1),s=r.n(a),n=r(4),c=r.n(n),i=r(5),l=r(6),u=r(2),h=r(8),d=r(7);r(13);function o(e){if(!e||!e.trim())return{successFlag:!1,message:"No Math string found in input area."};return g(/^[\d+*\-%/().\s]+$/g,e)?((e.startsWith("+")||e.startsWith("-"))&&(e="0"+e),b(e.replace(/\s/g,""))):{successFlag:!1,message:"Invalid Input entered in the text field."}}function b(e){if(-1===e.indexOf("(")){return g(/^[+-]?((\.\d+)|\d+(\.\d+)?)\s?([+*%\-/]\s?[+-]?((\.\d+)|\d+(\.\d+)?)\s?)*$/g,e)?j(e):{successFlag:!1,message:"Syntax Error."}}var t=e.indexOf(")");if(-1===t)return{successFlag:!1,message:"Syntax Error."};var r=e.substring(0,t).lastIndexOf("("),a=e.substring(r+1,t),s=b(a);if(s.successFlag){var n=("("+a+")").replace(/[-/*+.()]/g,"\\$&"),c=new RegExp(n,"g");return b(e=e.replace(c,s.value))}return s}function g(e,t){return e.test(t)}function j(e){if(-1===e.substring(1).search(/[*/%+-]/))return{successFlag:!0,value:e};var t,r,a=-1,s=0,n=-1;if(-1===e.search(/[*/%]/)){for(var c=1;c<e.length;c++)if("+"===e.charAt(c)||"-"===e.charAt(c)){a=c;break}}else for(var i=(a=e.search(/[*/%]/))-1;i>=0;i--)if("+"===e.charAt(i)||"-"===e.charAt(i)){s=0===i||"+"===e.charAt(i-1)||"-"===e.charAt(i-1)?i:i+1;break}t=Number(e.substring(s,a));for(var l=a+2;l<e.length;l++)if("+"===e.charAt(l)||"-"===e.charAt(l)||"*"===e.charAt(l)||"%"===e.charAt(l)||"/"===e.charAt(l)){n=l;break}-1===n&&(n=e.length),r=Number(e.substring(a+1,n));var u=e.substring(s,n),h=function(e,t,r){if("+"===e)return t+r;if("-"===e)return t-r;if("*"===e)return t*r;if("%"===e)return t%r;if("/"===e)return t/r}(e.substring(a,a+1),t,r);return j(e=e.replace(u,h))}var f=r(0),v=function(e){Object(h.a)(r,e);var t=Object(d.a)(r);function r(e){var a;return Object(i.a)(this,r),(a=t.call(this,e)).calculate=function(e){e.preventDefault();var t=o(a.state.mathStr);t.successFlag?a.setState({result:"Result : "+t.value,errorMessage:""}):a.setState({result:"",errorMessage:t.message})},a.handleInputChange=function(e){a.setState({mathStr:e.target.value,result:""})},a.state={mathStr:"",result:"",errorMessage:""},a.calculate=a.calculate.bind(Object(u.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(u.a)(a)),a}return Object(l.a)(r,[{key:"render",value:function(){var e=null;return this.state.errorMessage&&(e=Object(f.jsx)("div",{id:"errorPanelDiv",children:Object(f.jsx)("ul",{children:Object(f.jsxs)("li",{children:[this.state.errorMessage," Please Try again."]})})})),Object(f.jsx)("div",{className:"maindiv",children:Object(f.jsxs)("form",{id:"calculatorForm",children:[Object(f.jsx)("header",{children:Object(f.jsx)("h1",{id:"calcTitle",children:"Calculator - VidMob Exercise"})}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{className:"calcDesrciption",children:"Enter a valid math problem and click on Calculate button to see the result. Currently '+', '-', '*', '/', '%' operations including parentheses are supported. For example: \"1 + 2\", \"(4-2)*3.52\" etc. "}),e,Object(f.jsxs)("div",{className:"innerDiv",children:[Object(f.jsx)("label",{id:"mathStrLabel",children:"Enter a Math Problem : "}),Object(f.jsx)("textarea",{id:"mathStrInput",onChange:this.handleInputChange,value:this.state.mathStr,rows:"5",cols:"45"})]}),Object(f.jsx)("button",{id:"mathStrButton",onClick:this.calculate,children:"Calculate"}),Object(f.jsx)("div",{children:Object(f.jsx)("p",{id:"resultElem",children:this.state.result})})]})]})})}}]),r}(a.Component);c.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.9beee28f.chunk.js.map