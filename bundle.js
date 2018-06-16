!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=e.Battleship={createShip:function(t){return{length:t,hitAt:Array(t).fill(!1),isSunk:function(){return!this.hitAt.some(function(t){return!1===t})},hit:function(t){if(t<0||t>this.hitAt.length)throw new Error("Index out of range of ship length.");this.hitAt[t]=!0}}},createBoard:function(){return{numCols:10,numRows:10,grid:[],shots:[],throwErrorIfOffRightEdge:function(t,e){if(Math.floor((t+(e-1))/10)>Math.floor(t/10))throw new Error("Ship placed off board horizontally.")},throwErrorIfOffBottomEdge:function(t,e){if(t+10*(e-1)>=100)throw new Error("Ship placed off board vertically.")},throwErrorIfSquareAlredyOccupied:function(t){var e=this;t.forEach(function(t){if(e.grid[t])throw new Error("Ship placed on an occupied square.")})},getGridIndices:function(t,e,r){var n=[];if("h"===e)this.addHorizontalIndices(n,t,r);else{if("v"!==e)throw new Error("Placement has invalid direction.");this.addVerticalIndices(n,t,r)}return n},addHorizontalIndices:function(t,e,r){this.throwErrorIfOffRightEdge(e,r);for(var n=e;n<r+e;n++)t.push(n)},addVerticalIndices:function(t,e,r){this.throwErrorIfOffBottomEdge(e,r);for(var n=e;n<e+10*r;n+=10)t.push(n)},placeShip:function(t,e,r){var o=this,i=this.getGridIndices(t,e,r);this.throwErrorIfSquareAlredyOccupied(i);var a=n.createShip(r),s=0;i.forEach(function(t){o.grid[t]={ship:a,part:s},s+=1})},receiveAttack:function(t){if(this.shots.includes(t))throw new Error("Square has already been attacked.");if(this.shots.push(t),this.grid[t]){var e=this.grid[t],r=e.ship,n=e.part;return r.hit(n),!0}return!1},isGameOver:function(){var t=!0;return this.grid.forEach(function(e){e.ship.isSunk()||(t=!1)}),t}}}}},function(t,e,r){"use strict";r(6);var n=r(7),o=r(8),i=void 0,a=void 0;function s(t){t.board.placeShip(0,"h",3),t.board.placeShip(9,"v",4),t.board.placeShip(55,"v",3),t.board.placeShip(24,"h",4),t.board.placeShip(90,"h",2),t.board.placeShip(30,"v",5),t.board.placeShip(77,"v",3)}i=o.Player.createHumanPlayer(),a=o.Player.createRandomAI(),s(i),s(a);var c=document.querySelector(".player-board"),u=document.querySelector(".target-board");n.View.renderBoard(c,i.board,!1),n.View.renderBoard(u,a.board,!0,function t(){i.board.isGameOver()?alert("Game Over!"):i.attack(a,parseInt(this.dataset.squareNum)),a.board.isGameOver()?alert("Game Over!"):a.attack(i),n.View.renderBoard(c,i.board,!1),n.View.renderBoard(u,a.board,!0,t)})},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var r=e.protocol+"//"+e.host,n=r+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?r+i:n+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,r){var n,o,i={},a=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=n.apply(this,arguments)),o}),s=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),c=null,u=0,f=[],d=r(2);function l(t,e){for(var r=0;r<t.length;r++){var n=t[r],o=i[n.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](n.parts[a]);for(;a<n.parts.length;a++)o.parts.push(g(n.parts[a],e))}else{var s=[];for(a=0;a<n.parts.length;a++)s.push(g(n.parts[a],e));i[n.id]={id:n.id,refs:1,parts:s}}}}function p(t,e){for(var r=[],n={},o=0;o<t.length;o++){var i=t[o],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};n[a]?n[a].parts.push(s):r.push(n[a]={id:a,parts:[s]})}return r}function h(t,e){var r=s(t.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=f[f.length-1];if("top"===t.insertAt)n?n.nextSibling?r.insertBefore(e,n.nextSibling):r.appendChild(e):r.insertBefore(e,r.firstChild),f.push(e);else if("bottom"===t.insertAt)r.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertInto+" "+t.insertAt.before);r.insertBefore(e,o)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function b(t){var e=document.createElement("style");return t.attrs.type="text/css",m(e,t.attrs),h(t,e),e}function m(t,e){Object.keys(e).forEach(function(r){t.setAttribute(r,e[r])})}function g(t,e){var r,n,o,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var a=u++;r=c||(c=b(e)),n=x.bind(null,r,a,!1),o=x.bind(null,r,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",m(e,t.attrs),h(t,e),e}(e),n=function(t,e,r){var n=r.css,o=r.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(n=d(n));o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([n],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,r,e),o=function(){v(r),r.href&&URL.revokeObjectURL(r.href)}):(r=b(e),n=function(t,e){var r=e.css,n=e.media;n&&t.setAttribute("media",n);if(t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}.bind(null,r),o=function(){v(r)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var r=p(t,e);return l(r,e),function(t){for(var n=[],o=0;o<r.length;o++){var a=r[o];(s=i[a.id]).refs--,n.push(s)}t&&l(p(t,e),e);for(o=0;o<n.length;o++){var s;if(0===(s=n[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var y,w=(y=[],function(t,e){return y[t]=e,y.filter(Boolean).join("\n")});function x(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=w(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=function(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"==typeof btoa){var o=(a=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=n.sources.map(function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"});return[r].concat(i).concat([o]).join("\n")}var a;return[r].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(n[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&n[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},function(t,e,r){(t.exports=r(4)(!1)).push([t.i,"body {\n  background: #f8f8f8; }\n\n.main-container {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto; }\n\n.board-container {\n  display: flex;\n  flex-wrap: wrap;\n  flex: 1;\n  width: 40%;\n  border: 2px solid black; }\n\n@media screen and (max-width: 720px) {\n  .board-container {\n    width: 100%;\n    flex-basis: 100%; } }\n\n.square {\n  flex: 1 0 10%;\n  display: inline;\n  border: 1px solid black; }\n  .square:after {\n    content: '';\n    padding-top: 100%;\n    float: right; }\n\n.water {\n  background: blue; }\n\n.ship {\n  background: gray; }\n\n.hit {\n  background: red; }\n\n.miss {\n  background: white; }\n",""])},function(t,e,r){var n=r(5);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(3)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.View={renderBoard:function(t,e,r,n){this.clearParent(t);for(var o=0;o<100;o++){var i=document.createElement("div");i.classList.add("square"),this.addSquareContentClass(e,i,o,r),i.setAttribute("data-square-num",o),i.currentBoard=e,n&&i.addEventListener("click",n),t.append(i)}},clearParent:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},addSquareContentClass:function(t,e,r,n){t.grid[r]?t.grid[r].ship.hitAt[t.grid[r].part]?e.classList.add("hit"):n?e.classList.add("water"):e.classList.add("ship"):t.shots.includes(r)?e.classList.add("miss"):e.classList.add("water")}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Player=void 0;var n=r(0);e.Player={createHumanPlayer:function(){return{board:n.Battleship.createBoard(),attack:function(t,e){t.board.receiveAttack(e)}}},createRandomAI:function(){return{board:n.Battleship.createBoard(),remainingSquares:function(){for(var t=[],e=0;e<100;e++)t.push(e);return function(t){for(var e=t.length-1;e>0;e--){var r=Math.floor(Math.random()*(e+1)),n=[t[r],t[e]];t[e]=n[0],t[r]=n[1]}return t}(t)}(),attack:function(t){t.board.receiveAttack(this.remainingSquares.pop())}}}}}]);