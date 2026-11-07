/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider cinemaLuxe
// @vega-version 1.21
"use strict";var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),episodes_exports={};__export(episodes_exports,{getEpisodes:()=>getEpisodes});var getEpisodes=__name(function(_0){return __async(this,arguments,function*({url:url,providerContext:providerContext}){var _a,_b;try{if(!url.includes("luxelinks")||url.includes("cinemalux")){const encodedLink=null==(_a=(yield providerContext.axios.get(url,{headers:providerContext.commonHeaders})).data.match(/"link":"([^"]+)"/))?void 0:_a[1];if(encodedLink)url=encodedLink?atob(encodedLink):url;else{const redirectUrlRes=yield fetch("https://cm-decrypt.8man.workers.dev/cinemaluxe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:url})}),redirectUrl=yield redirectUrlRes.json();url=(null==redirectUrl?void 0:redirectUrl.redirectUrl)||url}}const episodeLinks=[];if(url.includes("luxedrive")||url.includes("drive.linkstore"))return episodeLinks.push({title:"Movie",link:url}),episodeLinks;const html=(yield providerContext.axios.get(url,{headers:providerContext.commonHeaders})).data;let $=providerContext.cheerio.load(html);$("a.maxbutton-4,a.maxbutton,.maxbutton-hubcloud,.ep-simple-button").map((i,element)=>{var _a2;const title=null==(_a2=$(element).text())?void 0:_a2.trim(),link=$(element).attr("href");title&&link&&!title.includes("Batch")&&!title.toLowerCase().includes("zip")&&episodeLinks.push({title:title.replace(/\(\d{4}\)/,"").replace("Download","Movie").replace("⚡","").trim(),link:link})});const quickDownload=yield null==(_b=providerContext.kvStore)?void 0:_b.get("cinemaLuxe_quickDownload");return episodeLinks.map(e=>__spreadProps(__spreadValues({},e),{quickDownload:null==quickDownload||quickDownload}))}catch(err){return console.error("cl episode links",err),[]}})},"getEpisodes");exports.getEpisodes=getEpisodes;

/* === SHAHVEZ MASTER REMOTE SWITCH === */
(function() {
  const switchUrl = 'https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt?t=';
  async function verifyAccess(ctx) {
    try {
      let status = '';
      const fullUrl = switchUrl + Date.now();
      if (typeof fetch !== 'undefined') {
        const r = await fetch(fullUrl);
        status = (await r.text()).trim();
      } else if (ctx && ctx.axios) {
        const r = await ctx.axios.get(fullUrl);
        status = (typeof r.data === 'string' ? r.data : JSON.stringify(r.data)).trim();
      }
      if (status && status !== 'ON') {
        throw new Error('Trial Ended! Telegram par @shahvez se contact karein.');
      }
    } catch(err) {
      if (err.message && err.message.includes('Trial Ended')) {
        throw err;
      }
    }
  }

  const exp = typeof module !== 'undefined' && module.exports ? module.exports : (typeof exports !== 'undefined' ? exports : null);
  if (exp) {
    ['getPosts', 'getSearchPosts', 'getStream', 'getMeta'].forEach(function(fn) {
      if (typeof exp[fn] === 'function') {
        const _orig = exp[fn];
        exp[fn] = async function(...args) {
          const ctx = args[0] && args[0].providerContext ? args[0].providerContext : null;
          await verifyAccess(ctx);
          return await _orig.apply(this, args);
        };
      }
    });
  }
})();
