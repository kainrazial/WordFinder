!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.NProgress=t()}(this,function(){function e(e,t,n){return t>e?t:e>n?n:e}function t(e){return 100*(-1+e)}function n(e,n,r){var o;return o="translate3d"===u.positionUsing?{transform:"translate3d("+t(e)+"%,0,0)"}:"translate"===u.positionUsing?{transform:"translate("+t(e)+"%,0)"}:{"margin-left":t(e)+"%"},o.transition="all "+n+"ms "+r,o}function r(e,t){var n="string"==typeof e?e:a(e);return n.indexOf(" "+t+" ")>=0}function o(e,t){var n=a(e),o=n+t;r(n,t)||(e.className=o.substring(1))}function i(e,t){var n,o=a(e);r(e,t)&&(n=o.replace(" "+t+" "," "),e.className=n.substring(1,n.length-1))}function a(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function s(e){e&&e.parentNode&&e.parentNode.removeChild(e)}var c={};c.version="0.2.0";var u=c.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};c.configure=function(e){var t,n;for(t in e)n=e[t],void 0!==n&&e.hasOwnProperty(t)&&(u[t]=n);return this},c.status=null,c.set=function(t){var r=c.isStarted();t=e(t,u.minimum,1),c.status=1===t?null:t;var o=c.render(!r),i=o.querySelector(u.barSelector),a=u.speed,s=u.easing;return o.offsetWidth,l(function(e){""===u.positionUsing&&(u.positionUsing=c.getPositioningCSS()),d(i,n(t,a,s)),1===t?(d(o,{transition:"none",opacity:1}),o.offsetWidth,setTimeout(function(){d(o,{transition:"all "+a+"ms linear",opacity:0}),setTimeout(function(){c.remove(),e()},a)},a)):setTimeout(e,a)}),this},c.isStarted=function(){return"number"==typeof c.status},c.start=function(){c.status||c.set(0);var e=function(){setTimeout(function(){c.status&&(c.trickle(),e())},u.trickleSpeed)};return u.trickle&&e(),this},c.done=function(e){return e||c.status?c.inc(.3+.5*Math.random()).set(1):this},c.inc=function(t){var n=c.status;return n?("number"!=typeof t&&(t=(1-n)*e(Math.random()*n,.1,.95)),n=e(n+t,0,.994),c.set(n)):c.start()},c.trickle=function(){return c.inc(Math.random()*u.trickleRate)},function(){var e=0,t=0;c.promise=function(n){return n&&"resolved"!==n.state()?(0===t&&c.start(),e++,t++,n.always(function(){t--,0===t?(e=0,c.done()):c.set((e-t)/e)}),this):this}}(),c.render=function(e){if(c.isRendered())return document.getElementById("nprogress");o(document.documentElement,"nprogress-busy");var n=document.createElement("div");n.id="nprogress",n.innerHTML=u.template;var r,i=n.querySelector(u.barSelector),a=e?"-100":t(c.status||0),l=document.querySelector(u.parent);return d(i,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),u.showSpinner||(r=n.querySelector(u.spinnerSelector),r&&s(r)),l!=document.body&&o(l,"nprogress-custom-parent"),l.appendChild(n),n},c.remove=function(){i(document.documentElement,"nprogress-busy"),i(document.querySelector(u.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&s(e)},c.isRendered=function(){return!!document.getElementById("nprogress")},c.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};var l=function(){function e(){var n=t.shift();n&&n(e)}var t=[];return function(n){t.push(n),1==t.length&&e()}}(),d=function(){function e(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(e,t){return t.toUpperCase()})}function t(e){var t=document.body.style;if(e in t)return e;for(var n,r=o.length,i=e.charAt(0).toUpperCase()+e.slice(1);r--;)if(n=o[r]+i,n in t)return n;return e}function n(n){return n=e(n),i[n]||(i[n]=t(n))}function r(e,t,r){t=n(t),e.style[t]=r}var o=["Webkit","O","Moz","ms"],i={};return function(e,t){var n,o,i=arguments;if(2==i.length)for(n in t)o=t[n],void 0!==o&&t.hasOwnProperty(n)&&r(e,n,o);else r(e,i[1],i[2])}}();return c}),function(){window.ResultsCard=function(){function e(e,t,n,r,o){this.title=e,this.outputFormat=r,this.urlString=o,this.card=document.createElement("div"),document.getElementById(n).appendChild(this.card),this.card.id=t,this.card.innerHTML="<div class='title'>"+this.title+"</div>",window.cards.push(this)}return e.prototype.load=function(e,t){var n;return this.cardText=this.card.getElementsByClassName("text")[0],null!=this.cardText&&this.card.removeChild(this.cardText),this.cardText=document.createElement("div"),this.cardText.classList.add("text"),this.card.appendChild(this.cardText),n=this.card.getElementsByClassName("text")[0],this.URLToLoad=this.urlString.replace("^query",e).replace("^limit",t),window.loadJSON({url:this.URLToLoad,card:this.card,cardText:this.cardText,outputFormat:this.outputFormat,success:function(e,t){var r,o,i,a,s,c,u,l,d,f,h,m,p,g;for(o in t)this[o]=t[o];switch(this.dataFormat=e[0]&&e[0].word?"datamuse":e.results&&e.results[0]?"pearson":"unrecognizable",this.dataFormat){case"datamuse":for(m=[],i=0,s=e.length;s>i;i++)o=e[i],m.push("<a href='#s="+o.word+"'>"+o.word+"</a>");break;case"pearson":m={},h=void 0;for(o in e.results)h=e.results[o].part_of_speech,m[h]||(m[h]=[]),m[h].push(e.results[o].senses[0].definition);for(r in m){for(l=document.createElement("div"),l.classList.add(r.replace(/\s+/g,"")),p=document.createElement("h2"),p.innerHTML=r,l.appendChild(p),d=document.createElement("ol"),l.appendChild(d),o=0;o<m[r].length;)u=document.createElement("li"),u.innerHTML=m[r][o],d.appendChild(u),o++;n.appendChild(l)}}if(null!=m)switch(this.outputFormat){case"ul":for(g=document.createElement("ul"),a=0,c=m.length;c>a;a++)o=m[a],u=document.createElement("li"),u.innerHTML=o,g.appendChild(u);n.appendChild(g);break;case"list":f=document.createElement("p"),f.innerHTML=m.join(", "),n.appendChild(f)}return cardLoaded()},error:function(e){return console.error(e)}})},e}()}.call(this),!function(e,t){"use strict";"function"==typeof define&&define.amd?define([],function(){return e.annyang=t(e)}):"object"==typeof module&&module.exports?module.exports=t(e):e.annyang=t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n,r=e.SpeechRecognition||e.webkitSpeechRecognition||e.mozSpeechRecognition||e.msSpeechRecognition||e.oSpeechRecognition;if(!r)return null;var o,i,a=[],s={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},c=0,u=!1,l="font-weight: bold; color: #00f;",d=!1,f=!1,h=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,p=/(\(\?)?:\w+/g,g=/\*\w+/g,v=/[\-{}\[\]+?.,\\\^$|#]/g,y=function(e){return e=e.replace(v,"\\$&").replace(h,"(?:$1)?").replace(p,function(e,t){return t?e:"([^\\s]+)"}).replace(g,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+e+"$","i")},w=function(e){var t=Array.prototype.slice.call(arguments,1);e.forEach(function(e){e.callback.apply(e.context,t)})},b=function(){return o!==t},S=function(){b()||n.init({},!1)},x=function(e,t,n){a.push({command:e,callback:t,originalPhrase:n}),u&&console.log("Command successfully loaded: %c"+n,l)},T=function(e){w(s.result,e);for(var t,n=0;n<e.length;n++){t=e[n].trim(),u&&console.log("Speech recognized: %c"+t,l);for(var r=0,o=a.length;o>r;r++){var i=a[r],c=i.command.exec(t);if(c){var d=c.slice(1);return u&&(console.log("command matched: %c"+i.originalPhrase,l),d.length&&console.log("with parameters",d)),i.callback.apply(this,d),void w(s.resultMatch,t,i.originalPhrase,e)}}}w(s.resultNoMatch,e)};return n={init:function(l,h){h=h===t?!0:!!h,o&&o.abort&&o.abort(),o=new r,o.maxAlternatives=5,o.continuous="http:"===e.location.protocol,o.lang="en-US",o.onstart=function(){f=!0,w(s.start)},o.onerror=function(e){switch(w(s.error),e.error){case"network":w(s.errorNetwork);break;case"not-allowed":case"service-not-allowed":i=!1,w((new Date).getTime()-c<200?s.errorPermissionBlocked:s.errorPermissionDenied)}},o.onend=function(){if(f=!1,w(s.end),i){var e=(new Date).getTime()-c;1e3>e?setTimeout(n.start,1e3-e):n.start()}},o.onresult=function(e){if(d)return u&&console.log("Speech heard, but annyang is paused"),!1;for(var t=e.results[e.resultIndex],n=[],r=0;r<t.length;r++)n[r]=t[r].transcript;T(n)},h&&(a=[]),l.length&&this.addCommands(l)},start:function(e){d=!1,S(),e=e||{},i=e.autoRestart!==t?!!e.autoRestart:!0,e.continuous!==t&&(o.continuous=!!e.continuous),c=(new Date).getTime();try{o.start()}catch(n){u&&console.log(n.message)}},abort:function(){i=!1,b()&&o.abort()},pause:function(){d=!0},resume:function(){n.start()},debug:function(e){u=arguments.length>0?!!e:!0},setLanguage:function(e){S(),o.lang=e},addCommands:function(t){var n;S();for(var r in t)if(t.hasOwnProperty(r))if(n=e[t[r]]||t[r],"function"==typeof n)x(y(r),n,r);else{if(!("object"==typeof n&&n.regexp instanceof RegExp)){u&&console.log("Can not register command: %c"+r,l);continue}x(new RegExp(n.regexp.source,"i"),n.callback,r)}},removeCommands:function(e){return e===t?void(a=[]):(e=Array.isArray(e)?e:[e],void(a=a.filter(function(t){for(var n=0;n<e.length;n++)if(e[n]===t.originalPhrase)return!1;return!0})))},addCallback:function(n,r,o){if(s[n]!==t){var i=e[r]||r;"function"==typeof i&&s[n].push({callback:i,context:o||this})}},removeCallback:function(e,n){var r=function(e){return e.callback!==n};for(var o in s)s.hasOwnProperty(o)&&(e!==t&&e!==o||(n===t?s[o]=[]:s[o]=s[o].filter(r)))},isListening:function(){return f&&!d},getSpeechRecognizer:function(){return o},trigger:function(e){return n.isListening()?(Array.isArray(e)||(e=[e]),void T(e)):void(u&&(f?console.log("Speech heard, but annyang is paused"):console.log("Cannot trigger while annyang is aborted")))}}}),function(){var e,t,n,r,o,i,a,s,c,u,l,d,f,h,m,p,g=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};d=0,a=void 0,t=void 0,i=[],l=document.getElementById("searchbox"),window.outerSearch=document.getElementById("search-outer"),window.cards=[],o=0,window.loadJSON=function(e){var t,n,r,o,i,a;o=e.url,r=e.success,t=e.error,i={};for(n in e)i[n]=e[n];return a=new XMLHttpRequest,a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){if(r)return r(JSON.parse(a.responseText),i)}else if(t)return t(a)},a.open("GET",o,!0),a.send()},window.cardLoaded=function(){return o++,NProgress.set(o/window.cards.length),(o=cards.length)?(NProgress.done(),f()):void 0},c=new ResultsCard("Related Words","relatedWords","left","ul","https://api.datamuse.com/words?ml=^query&max=^limit"),n=new ResultsCard("Definitions","definition","center","ol","https://api.pearson.com/v2/dictionaries/laad3/entries?headword=^query&limit=^limit"),h=new ResultsCard("Similar Sounding Words","soundsLike","center","list","https://api.datamuse.com/words?sl=^query&max=^limit"),u=new ResultsCard("Rhyming Words","rhymes","right","ul","https://api.datamuse.com/words?rel_rhy=^query&max=^limit"),r=function(){return document.getElementsByTagName("main")[0].style.opacity=0,document.getElementsByTagName("main")[0].style.top="50px"},f=function(){return document.getElementsByTagName("main")[0].removeAttribute("style")},m=function(e){return o=0,window.scrollTo(0,0),""!==e?(e=e.replace(/\+/g," ").replace(/%20/g," "),e!==t?(NProgress.start(),l.value=e,window.location.hash="s="+e.replace(/ /g,"+"),g.call(i,e)>=0&&i.splice(i.indexOf(e),1),i.unshift(e),u.load(e.split(" ").pop(),10),h.load(e,10),c.load(e,10),n.load(e,10),t=e):f()):r()},l.addEventListener("blur",function(){return outerSearch.classList.remove("focus"),m(l.value)}),window.onhashchange=function(){return m(window.location.hash.substring(3))},p=function(e){return console.log(e)},document.addEventListener("DOMContentLoaded",function(){var e;return m(window.location.hash.substring(3)),annyang?(e={"search (for) *query (please)":m,"look up *query (please)":m,"ok wordfinder":function(){return searchbox.focus()}},annyang.addCommands(e),annyang.start()):void 0}),e=function(){var t,n,r,o;for(o=outerSearch.getElementsByTagName("a"),n=0,r=o.length;r>n;n++)t=o[n],null!=t&&outerSearch.removeChild(t);null!=outerSearch.getElementsByTagName("a")[0]&&e()},s=function(){var t,n,r,o,a;if(d=0,""!==l.value)return e(),loadJSON({url:"https://api.datamuse.com/sug?s="+l.value+"&max=10",word:l.value,success:function(t,n){var r,o,i,a,s,c,u,d,f;for(this.word=n.word,e(),r=t,t=[],t.push(this.word),o=0,a=r.length;a>o;o++)f=r[o],t.push(f.word);for(u=[],i=0,s=t.length;s>i;i++)d=t[i],d!==l.value&&t[0]===l.value?(c=document.createElement("a"),c.setAttribute("href","#s='"+d+"'"),c.innerHTML=d,u.push(outerSearch.appendChild(c))):u.push(void 0);return u}});for(a=[],t=0,n=i.length;n>t;t++)o=i[t],r=document.createElement("a"),r.setAttribute("href","#s='"+o+"'"),r.innerHTML=o,r.classList.add("old"),a.push(outerSearch.appendChild(r));return a},l.addEventListener("keyup",function(e){var t;return t=e.keyCode||e.which,37!==t&&39!==t&&38!==t&&40!==t?s():void 0}),l.addEventListener("focus",function(){return outerSearch.classList.add("focus"),l.classList.add("selected"),r(),s()}),outerSearch.addEventListener("mousedown",function(e){"A"===e.target.tagName&&(l.value=e.target.innerHTML)}),searchbox.addEventListener("keydown",function(e){var t;return(13===e.which||27===e.which)&&(e.preventDefault(),l.blur()),38!==e.which&&40!==e.which||(e.preventDefault(),t=document.querySelectorAll("#search-outer > input, #search-outer > a"),t[d].classList.remove("selected"),0===d&&(a=l.value),40===e.which?(d++,null==t[d]&&(d=0),t[d].classList.add("selected")):38===e.which&&(d--,null==t[d]&&(d=t.length-1),t[d].classList.add("selected")),null!=document.querySelector("a.selected")&&(searchbox.value=document.querySelector("a.selected").innerHTML),0!==d)?void 0:searchbox.value=a}),document.addEventListener("keydown",function(e){return 83!==e.which&&83!==e.keyCode&&83!==window.event.keyCode||"searchbox"===e.target.id?void 0:(e.preventDefault(),searchbox.focus())})}.call(this);