console.info("Onboarding Script started successfully");WA.onInit().then(()=>{setTimeout(()=>{WA.chat.sendChatMessage("Hello","Me")},2e3),_()&&le(),WA.player.state.tutorialDone?_()&&(console.info("Open the funnel"),Q(0)):se(),WA.player.state.onVariableChange("isRegistered").subscribe(t=>{console.log("onVariableChange => isRegistered",t),t===!0&&WA.ui.actionBar.removeButton("register-btn")})}).catch(t=>{console.error("Onboarding Script initialisation error => ",t)});const _=()=>!WA.player.isLogged&&!WA.player.state.isRegistered,se=()=>{console.info("Open the tutorial"),WA.ui.modal.openModal({src:"https://workadventure.github.io/scripting-api-extra/tutorialv1.html",allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})},Q=t=>{setTimeout(()=>{console.info("Funnel script initialized!"),WA.ui.modal.closeModal();let e=`https://staging.workadventu.re/funnel/connection?roomUrl=${encodeURI(WA.room.id)}`;(WA.room.id.indexOf("workadventure.localhost")!==-1||WA.room.id.indexOf("workadventure.localhost")!==-1)&&(e=e.replace("https://staging.workadventu.re","http://localhost")),WA.ui.modal.openModal({src:e,allow:"fullscreen",title:"Subscription",allowApi:!0,position:"center"})},t)},le=()=>{WA.ui.actionBar.addButton({id:"register-btn",label:"Register",callback:t=>{console.log("Button registered triggered",t),Q(0)}})};console.info("Survey feedback Script started successfully");WA.onInit().then(()=>{WA.player.state.hasFeedback||(ue(),WA.player.state.onVariableChange("hasFeedback").subscribe(t=>{t===!0&&WA.ui.actionBar.removeButton("feedback-btn")}))});const ce=t=>{setTimeout(()=>{WA.ui.modal.closeModal(),WA.ui.modal.openModal({src:"https://docs.google.com/forms/d/e/1FAIpQLSd86mmBxrzbIfSoTBeGGTVEr3fNTGJkPExtaUzmNJFRnK9lRA/viewform?usp=sf_link",allow:"fullscreen",title:"Subscription",allowApi:!0,position:"center"})},t)},ue=()=>{var e;const t=WA.metadata;WA.player.state.hasFeedback||((e=t.room)==null?void 0:e.isPremium)&&t.room.isPremium===!0||WA.ui.actionBar.addButton({id:"feedback-btn",type:"action",imageSrc:"https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/logo/workadventure-rate-white.svg",toolTip:"Let your feedback",callback:n=>{console.log("Button feedback triggered",n),ce(0)}})};console.info("Pricing Script started successfully");WA.onInit().then(()=>{var e;const t=WA.metadata;pe(t),fe(t),!(((e=t.room)==null?void 0:e.isPremium)||WA.player.state.hasVisitPricing||!WA.player.tags.includes("admin")&&!WA.player.tags.includes("editor"))&&X()});const X=()=>{console.info("Opening price modal for world freemium for admin or editor user"),WA.player.state.hasVisitPricing=!0,WA.ui.modal.openModal({src:"https://admin.workadventu.re/funnel/pricing",allow:"fullscreen",title:"Pricing",allowApi:!0,position:"center"})},fe=t=>{var e;((e=t.room)==null?void 0:e.isPremium)||!WA.player.tags.includes("admin")&&!WA.player.tags.includes("editor")||WA.ui.actionBar.addButton({id:"pricing-btn",label:"Pricing",callback:()=>{console.info("Button pricing triggered"),X()}})},pe=t=>{var e;((e=t.room)==null?void 0:e.isPremium)||!WA.player.tags.includes("admin")&&!WA.player.tags.includes("editor")||WA.ui.banner.openBanner({id:"freemium-banner",text:"Upgrade to premium and get access to a whole new world of fun! \u{1F680}",bgColor:"#272736",textColor:"#ffffff",closable:!1,timeToClose:0,link:{url:"https://workadventu.re/pricing",label:"Go Premium Today!"}})};console.info("Banner Script started successfully");WA.onInit().then(()=>{const t=WA.metadata;de(t)});const de=t=>{var e;(e=t.room)!=null&&e.isPremium||WA.ui.banner.openBanner({id:"freemium-banner",text:"Change your subscription to enjoy premium access full-time!",bgColor:"#272736",textColor:"#ffffff",closable:!0,link:{url:"https://workadventu.re/pricing",label:"Unlock premium"}})};console.info("Claim Office Script started successfully");let w;WA.onInit().then(()=>{if(w=WA.state.loadVariable("offices"),w==null){console.info("No offices found");return}else w=JSON.parse(w);WA.state.onVariableChange("offices").subscribe(e=>{w=JSON.parse(e)}),console.log('WA.state.loadVariable("claimOffice")',WA.state.loadVariable("claimOffice"));const t=WA.state.loadVariable("claimOffice");(t==null||t=="")&&WA.state.saveVariable("claimOffice",new Array);for(const e in w){let n;WA.room.area.onEnter(`${e}`).subscribe(()=>{const r=WA.state.loadVariable("claimOffice");for(const o in r)if(r[o]===WA.player.uuid){o===e&&WA.ui.actionBar.addButton({id:"unclaimOfficeButton",label:"Unclaim Office",callback:()=>{he(o),WA.ui.actionBar.removeButton("unclaimOfficeButton")}});return}if(r[e]!=null){n=WA.ui.displayActionMessage({message:"This office is already claimed by another user",type:"warning",callback:()=>{n!=null&&n.remove()}});return}WA.ui.actionBar.addButton({id:`claimOfficeButton_${e}`,label:"Claim Office",callback:()=>{ge(e),WA.ui.actionBar.removeButton(`claimOfficeButton_${e}`)}})}),WA.room.area.onLeave(`${e}`).subscribe(()=>{n!=null&&n.remove(),WA.ui.actionBar.removeButton(`claimOfficeButton_${e}`)})}});function ge(t){if(!WA.player.uuid)return;const e=WA.state.loadVariable("claimOffice");e[t]=WA.player.uuid,WA.state.saveVariable("claimOffice",e).then(()=>{console.info("claimOffice variable was saved successfully",e),WA.ui.modal.openModal({src:"https://giphy.com/embed/jJQC2puVZpTMO4vUs0",allow:"fullscreen",title:"Claim Office",allowApi:!0,position:"center"})}).catch(n=>{console.error("Something went wrong while saving variable",n)})}function he(t){const e=WA.state.loadVariable("claimOffice");e[t]=void 0,WA.state.saveVariable("claimOffice",e).then(()=>{console.info("claimOffice variable was saved successfully",e)}).catch(n=>{console.error("Something went wrong while saving variable",n)})}class W{constructor(e){this.properties=e!=null?e:[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const Y="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class ye{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new W(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function N(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(Y+"/configuration.html"+e,!0)}async function me(t,e){const n=await WA.room.getTiledMap(),r=new Map;return Z(n.layers,r,t,e),r}function Z(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const i of o.objects)if(i.type==="variable"||i.class==="variable"){if(!!n&&o.name!==n||!!r&&!r.includes(i.name))continue;e.set(i.name,new ye(i))}}else o.type==="group"&&Z(o.layers,e,n,r)}let x;async function M(){return x===void 0&&(x=be()),x}async function be(){return ve(await WA.room.getTiledMap())}function ve(t){const e=new Map;return ee(t.layers,"",e),e}function ee(t,e,n){for(const r of t)r.type==="group"?ee(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function te(){const t=await M(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function Ae(t){let e=1/0,n=1/0,r=0,o=0;const i=t.data;if(typeof i=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<t.height;a++)for(let s=0;s<t.width;s++)i[s+a*t.width]!==0&&(e=Math.min(e,s),o=Math.max(o,s),n=Math.min(n,a),r=Math.max(r,a));return{top:n,left:e,right:o+1,bottom:r+1}}function ne(t){let e=1/0,n=1/0,r=0,o=0;for(const i of t){const a=Ae(i);a.left<e&&(e=a.left),a.top<n&&(n=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var we=Object.prototype.toString,C=Array.isArray||function(e){return we.call(e)==="[object Array]"};function G(t){return typeof t=="function"}function We(t){return C(t)?"array":typeof t}function R(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function D(t,e){return t!=null&&typeof t=="object"&&e in t}function Se(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var Ce=RegExp.prototype.test;function Be(t,e){return Ce.call(t,e)}var ke=/\S/;function Pe(t){return!Be(ke,t)}var Me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Le(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return Me[n]})}var Te=/\s*/,Ee=/\s+/,$=/\s*=/,Oe=/\s*\}/,Ve=/#|\^|\/|>|\{|&|=|!/;function xe(t,e){if(!t)return[];var n=!1,r=[],o=[],i=[],a=!1,s=!1,l="",u=0;function p(){if(a&&!s)for(;i.length;)delete o[i.pop()];else i=[];a=!1,s=!1}var h,m,T;function B(v){if(typeof v=="string"&&(v=v.split(Ee,2)),!C(v)||v.length!==2)throw new Error("Invalid tags: "+v);h=new RegExp(R(v[0])+"\\s*"),m=new RegExp("\\s*"+R(v[1])),T=new RegExp("\\s*"+R("}"+v[1]))}B(e||g.tags);for(var f=new L(t),b,c,y,k,E,A;!f.eos();){if(b=f.pos,y=f.scanUntil(h),y)for(var V=0,ae=y.length;V<ae;++V)k=y.charAt(V),Pe(k)?(i.push(o.length),l+=k):(s=!0,n=!0,l+=" "),o.push(["text",k,b,b+1]),b+=1,k===`
`&&(p(),l="",u=0,n=!1);if(!f.scan(h))break;if(a=!0,c=f.scan(Ve)||"name",f.scan(Te),c==="="?(y=f.scanUntil($),f.scan($),f.scanUntil(m)):c==="{"?(y=f.scanUntil(T),f.scan(Oe),f.scanUntil(m),c="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(c==">"?E=[c,y,b,f.pos,l,u,n]:E=[c,y,b,f.pos],u++,o.push(E),c==="#"||c==="^")r.push(E);else if(c==="/"){if(A=r.pop(),!A)throw new Error('Unopened section "'+y+'" at '+b);if(A[1]!==y)throw new Error('Unclosed section "'+A[1]+'" at '+b)}else c==="name"||c==="{"||c==="&"?s=!0:c==="="&&B(y)}if(p(),A=r.pop(),A)throw new Error('Unclosed section "'+A[1]+'" at '+f.pos);return Ie(Re(o))}function Re(t){for(var e=[],n,r,o=0,i=t.length;o<i;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Ie(t){for(var e=[],n=e,r=[],o,i,a=0,s=t.length;a<s;++a)switch(o=t[a],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":i=r.pop(),i[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function L(t){this.string=t,this.tail=t,this.pos=0}L.prototype.eos=function(){return this.tail===""};L.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};L.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function S(t,e){this.view=t,this.cache={".":this.view},this.parent=e}S.prototype.push=function(e){return new S(e,this)};S.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,i,a,s,l=!1;o;){if(e.indexOf(".")>0)for(i=o.view,a=e.split("."),s=0;i!=null&&s<a.length;)s===a.length-1&&(l=D(i,a[s])||Se(i,a[s])),i=i[a[s++]];else i=o.view[e],l=D(o.view,e);if(l){r=i;break}o=o.parent}n[e]=r}return G(r)&&(r=r.call(this.view)),r};function d(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}d.prototype.clearCache=function(){typeof this.templateCache!="undefined"&&this.templateCache.clear()};d.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||g.tags).join(":"),i=typeof r!="undefined",a=i?r.get(o):void 0;return a==null&&(a=xe(e,n),i&&r.set(o,a)),a};d.prototype.render=function(e,n,r,o){var i=this.getConfigTags(o),a=this.parse(e,i),s=n instanceof S?n:new S(n,void 0);return this.renderTokens(a,s,r,e,o)};d.prototype.renderTokens=function(e,n,r,o,i){for(var a="",s,l,u,p=0,h=e.length;p<h;++p)u=void 0,s=e[p],l=s[0],l==="#"?u=this.renderSection(s,n,r,o,i):l==="^"?u=this.renderInverted(s,n,r,o,i):l===">"?u=this.renderPartial(s,n,r,i):l==="&"?u=this.unescapedValue(s,n):l==="name"?u=this.escapedValue(s,n,i):l==="text"&&(u=this.rawValue(s)),u!==void 0&&(a+=u);return a};d.prototype.renderSection=function(e,n,r,o,i){var a=this,s="",l=n.lookup(e[1]);function u(m){return a.render(m,n,r,i)}if(!!l){if(C(l))for(var p=0,h=l.length;p<h;++p)s+=this.renderTokens(e[4],n.push(l[p]),r,o,i);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")s+=this.renderTokens(e[4],n.push(l),r,o,i);else if(G(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(n.view,o.slice(e[3],e[5]),u),l!=null&&(s+=l)}else s+=this.renderTokens(e[4],n,r,o,i);return s}};d.prototype.renderInverted=function(e,n,r,o,i){var a=n.lookup(e[1]);if(!a||C(a)&&a.length===0)return this.renderTokens(e[4],n,r,o,i)};d.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),i=e.split(`
`),a=0;a<i.length;a++)i[a].length&&(a>0||!r)&&(i[a]=o+i[a]);return i.join(`
`)};d.prototype.renderPartial=function(e,n,r,o){if(!!r){var i=this.getConfigTags(o),a=G(r)?r(e[1]):r[e[1]];if(a!=null){var s=e[6],l=e[5],u=e[4],p=a;l==0&&u&&(p=this.indentPartial(a,u,s));var h=this.parse(p,i);return this.renderTokens(h,n,r,p,o)}}};d.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};d.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||g.escape,i=n.lookup(e[1]);if(i!=null)return typeof i=="number"&&o===g.escape?String(i):o(i)};d.prototype.rawValue=function(e){return e[1]};d.prototype.getConfigTags=function(e){return C(e)?e:e&&typeof e=="object"?e.tags:void 0};d.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!C(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){P.templateCache=t},get templateCache(){return P.templateCache}},P=new d;g.clearCache=function(){return P.clearCache()};g.parse=function(e,n){return P.parse(e,n)};g.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+We(e)+'" was given as the first argument for mustache#render(template, view, partials)');return P.render(e,n,r,o)};g.escape=Le;g.Scanner=L;g.Context=S;g.Writer=d;class re{constructor(e,n){this.template=e,this.state=n,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=g.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],i=r[1],a=r[4];["name","&","#","^"].includes(o)&&n.add(i),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,n)}}}async function Ge(){var t;const e=await te();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const i=new re(o.value,WA.state);if(i.isPureString())continue;const a=i.getValue();await F(n.name,o.name,a),i.onChange(async s=>{await F(n.name,o.name,s)})}}}async function je(){var t;const e=await M();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const i of o){if(i.type==="int"||i.type==="bool"||i.type==="object"||typeof i.value!="string")continue;const a=new re(i.value,WA.state);if(a.isPureString())continue;const s=a.getValue();q(n,i.name,s),a.onChange(l=>{q(n,i.name,l)})}}}async function F(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function q(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}const Ue="https://admin.workadventu.re/html";let I,j=0,U=0;function z(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function _e(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=ie(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function Ne(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=ie(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function oe(t){return t.map(e=>I.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ie(t){const e=oe(t),n=ne(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(j-r,2)+Math.pow(U-o,2))}function De(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?_e(t):Ne(t),z(t)}),z(t)}function J(t,e,n,r){const o=t.name;let i,a,s=!1;const l=n.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const p=!!l;function h(){var c;i&&i.remove(),i=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;i&&i.remove(),i=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,h()}})}function T(){let c;if(t.type==="tilelayer")c=ne(oe(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function B(){a&&(WA.room.website.delete(a.name),a=void 0)}function f(){if(s=!0,n.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!u||!p)&&(n.getString("code")||n.getString("codeVariable"))){T();return}!u||(WA.state[e.name]?h():m())}function b(){s=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),i&&i.remove(),B()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(b)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(b)),WA.state.onVariableChange(e.name).subscribe(()=>{s&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&h(),a&&WA.state[e.name]===!0&&B(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function $e(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-j,2)+Math.pow(t.y-U,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function Fe(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&$e(t)})}function K(t,e,n){let r;const o=e.getString("bellPopup");if(n.type==="tilelayer"){const i=n.name;WA.room.onEnterLayer(i).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(i).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const i=n.name;WA.room.area.onEnter(i).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(i).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function qe(t){t=t!=null?t:Ue;const e=await me();I=await M();for(const n of e.values())n.properties.get("door")&&De(n),n.properties.get("bell")&&Fe(n);for(const n of I.values()){const r=new W(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');J(n,a,r,t)}const i=r.getString("bellVariable");i&&n.type==="tilelayer"&&K(i,r,n)}for(const n of await te()){const r=new W(n.properties),o=r.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+n.name+'"');J(n,a,r,t)}const i=r.getString("bellVariable");i&&K(i,r,n)}WA.player.onPlayerMove(n=>{j=n.x,U=n.y})}function ze(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),i=t.getString("triggerMessage"),a=t.getString("tag");Je(n,e,r,o,i,a)}}function Je(t,e,n,r,o,i){i&&!WA.player.tags.includes(i)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Ke(){const t=await M();for(const e of t.values()){const n=new W(e.properties);ze(n,e.name)}}let H;async function He(t){const e=await WA.room.getTiledMap();t=t!=null?t:Y,H=await M();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new W(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const i of H.values()){const a=new W(i.properties),s=a.getString("openConfig");s&&i.type==="tilelayer"&&Qe(s.split(","),i.name,a)}}}function Qe(t,e,n){let r;const o=n.getString("openConfigAdminTag");let i=!0;o&&!WA.player.tags.includes(o)&&(i=!1);function a(){var l;r&&r.remove(),r=WA.ui.displayActionMessage({message:(l=n.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>N(t)})}function s(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=n.getString("openConfigTrigger");i&&(l&&l==="onaction"?a():N(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),s()})}function Xe(){return WA.onInit().then(()=>{qe().catch(t=>console.error(t)),Ke().catch(t=>console.error(t)),He().catch(t=>console.error(t)),je().catch(t=>console.error(t)),Ge().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let O;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.onEnterLayer("clockZone").subscribe(()=>{const t=new Date,e=t.getHours()+":"+t.getMinutes();O=WA.ui.openPopup("clockPopup","It's "+e,[])}),WA.room.onLeaveLayer("clockZone").subscribe(Ye),Xe().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(t=>console.error(t));function Ye(){O!==void 0&&(O.close(),O=void 0)}