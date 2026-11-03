// @vega-provider moviesApi
// @vega-version 1.1
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),stream_exports={};__export(stream_exports,{mpGetStream:()=>mpGetStream});var urlsEndpoint="https://raw.githubusercontent.com/Zenda-Cross/vega-providers/refs/heads/main/urls.json",cacheTtl=36e5;function getCache(){const state="undefined"!=typeof providerGlobal&&providerGlobal?providerGlobal:globalThis;return null!=state.__vegaProviderBaseUrlCache__||(state.__vegaProviderBaseUrlCache__={expiresAt:0}),state.__vegaProviderBaseUrlCache__}function fetchProviderUrls(){return __async(this,null,function*(){const cache=getCache();if(cache.data&&Date.now()<cache.expiresAt)return cache.data;if(cache.request)return cache.request;const request=fetch(urlsEndpoint).then(response=>__async(null,null,function*(){if(!response.ok)throw new Error(`URL configuration request failed: ${response.status}`);const data=yield response.json();return console.log("Fetched provider URL configuration"),cache.data=data,cache.expiresAt=Date.now()+cacheTtl,data})).catch(error=>{if(cache.data)return console.warn("Using stale provider URL configuration",error),cache.data;throw error}).finally(()=>{cache.request=void 0});return Object.defineProperty(cache,"request",{configurable:!0,enumerable:!1,value:request,writable:!0}),request})}__name(getCache,"getCache"),__name(fetchProviderUrls,"fetchProviderUrls");var getBaseUrl=__name(providerValue=>__async(null,null,function*(){var _a,_b;try{return null!=(_b=null==(_a=(yield fetchProviderUrls())[providerValue])?void 0:_a.url)?_b:""}catch(error){throw console.error(`Error fetching baseUrl: ${providerValue}`,error),error}}),"getBaseUrl"),mpGetStream=__name(function(_0){return __async(this,arguments,function*({link:id,type:type,providerContext:providerContext}){var _a,_b;try{const{cheerio:cheerio}=providerContext,streams=[],{season:season,episode:episode,tmdbId:tmdbId}=JSON.parse(id),baseUrl=yield getBaseUrl("moviesapi"),link="movie"===type?`${baseUrl}/movie/${tmdbId}`:`${baseUrl}/tv/${tmdbId}-${season}-${episode}`,res=yield fetch(link,{headers:{referer:baseUrl}}),baseData=yield res.text(),embededUrl=cheerio.load(baseData)("iframe").attr("src")||"",response=yield fetch(embededUrl,{credentials:"omit",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8","Accept-Language":"en-US,en;q=0.5","Alt-Used":"w1.moviesapi.club","Upgrade-Insecure-Requests":"1","Sec-Fetch-Dest":"document","Sec-Fetch-Mode":"navigate","Sec-Fetch-Site":"none","Sec-Fetch-User":"?1",Pragma:"no-cache","Cache-Control":"no-cache",referer:baseUrl},referrer:baseUrl,method:"GET",mode:"cors"}),contents=(null==(_a=(yield response.text()).match(/const\s+Encrypted\s*=\s*['"]({.*})['"]/))?void 0:_a[1])||"";if(embededUrl){const res2=yield fetch("https://ext.8man.me/api/decrypt?passphrase==JV[t}{trEV=Ilh5",{method:"POST",body:contents}),finalData=yield res2.json(),subtitle=null==(_b=null==finalData?void 0:finalData.subtitles)?void 0:_b.map(sub=>{var _a2;return{title:(null==sub?void 0:sub.label)||"Unknown",language:null==sub?void 0:sub.label,type:(null==(_a2=null==sub?void 0:sub.file)?void 0:_a2.includes(".vtt"))?"text/vtt":"application/x-subrip",uri:null==sub?void 0:sub.file}});streams.push({server:"vidstreaming ",type:"m3u8",subtitles:subtitle,link:null==finalData?void 0:finalData.videoUrl,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0",Referer:baseUrl,Origin:baseUrl,Accept:"*/*","Accept-Language":"en-US,en;q=0.5","Sec-Fetch-Dest":"empty","Sec-Fetch-Mode":"cors","Sec-Fetch-Site":"cross-site",Pragma:"no-cache","Cache-Control":"no-cache"}})}return streams}catch(err){return console.error(err),[]}})},"mpGetStream");exports.mpGetStream=mpGetStream;

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
