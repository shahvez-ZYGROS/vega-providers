/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider multi
// @vega-version 1.5
"use strict";var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),episodes_exports={};__export(episodes_exports,{getEpisodes:()=>getEpisodes});var getEpisodes=__name(function(_0){return __async(this,arguments,function*({url:url,providerContext:providerContext}){const{axios:axios,cheerio:cheerio,commonHeaders:headers}=providerContext;console.log("getEpisodeLinks",url);try{const res=yield axios.get(url,{headers:__spreadProps(__spreadValues({},headers),{Referer:url.split("/").slice(0,3).join("/")})}),$=cheerio.load(res.data),seasonMatch=url.match(/\/season\/(\d+)/i)||url.match(/[?&]season=(\d+)/i),season=null==seasonMatch?void 0:seasonMatch[1];let grid=$(season?`#cinejoy-season-${season}`:".cinejoy-season-grid.active");if(grid.length||(grid=$(".cinejoy-season-grid.active").first()),grid.length||(grid=$(".cinejoy-season-grid").first()),$(".cinejoy-episodes-section").length&&grid.length){const episodes2=[],baseUrl=url.split("/").slice(0,3).join("/");if(grid.find(".cinejoy-ep-card").each((_,card)=>{const el=$(card);let href=el.find("a.cinejoy-ep-thumb-link").first().attr("href")||el.find("a.cinejoy-ep-name").first().attr("href")||"";if(!href)return;href.startsWith("/")&&(href=baseUrl+href);const epNo=el.find(".cinejoy-ep-badge-num").first().text().trim(),name=el.find(".cinejoy-ep-name").first().text().trim()||el.find(".cinejoy-ep-name").first().attr("title")||"";episodes2.push({title:epNo?`${epNo} ${name}`.trim():name,link:href})}),episodes2.length)return episodes2}const container=$(".entry-content,.entry-inner, .download-links-div");$(".unili-content,.code-block-1").remove();const episodes=[];return container.find("h5").each((_,element)=>{const el=$(element),title=el.text().trim(),hubCloudLink=el.next(".downloads-btns-div").find('a[style*="background: linear-gradient(135deg,#e629d0,#007bff);"]').attr("href");title&&hubCloudLink&&episodes.push({title:title.replace(/[-:]/g,"").trim(),link:hubCloudLink})}),episodes}catch(err){return console.log("getEpisodeLinks error:",err),[]}})},"getEpisodes");exports.getEpisodes=getEpisodes;

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
