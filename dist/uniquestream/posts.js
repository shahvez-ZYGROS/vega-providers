/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider uniquestream
// @vega-version 1.2
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),posts_exports={};__export(posts_exports,{getPosts:()=>getPosts,getSearchPosts:()=>getSearchPosts});var getPosts=__name(function(_0){return __async(this,arguments,function*({filter:filter,page:page,signal:signal,providerContext:providerContext}){var _a;const{axios:axios,commonHeaders:commonHeaders}=providerContext,url=`https://anime.uniquestream.net/api/v1/videos/${filter}?page=${page}&limit=20&type=all`;try{const res=yield axios.get(url,{headers:commonHeaders,signal:signal});return(Array.isArray(res.data)?res.data:(null==(_a=res.data)?void 0:_a.data)||[]).map(item=>({title:item.title,link:`https://anime.uniquestream.net/api/v1/series/${item.content_id}`,image:item.image||""}))}catch(error){return console.error("uniquestream getPosts failed",error),[]}})},"getPosts"),getSearchPosts=__name(function(_0){return __async(this,arguments,function*({searchQuery:searchQuery,page:page,signal:signal,providerContext:providerContext}){var _a,_b;if(page>1)return[];const{axios:axios,commonHeaders:commonHeaders}=providerContext,url=`https://anime.uniquestream.net/api/v1/search?q=${encodeURIComponent(searchQuery)}`;try{const res=yield axios.get(url,{headers:commonHeaders,signal:signal}),series=(null==(_a=res.data)?void 0:_a.series)||[],movies=(null==(_b=res.data)?void 0:_b.movies)||[];return[...series,...movies].map(item=>({title:item.title,link:`https://anime.uniquestream.net/api/v1/series/${item.content_id}`,image:item.image||""}))}catch(error){return console.error("uniquestream getSearchPosts failed",error),[]}})},"getSearchPosts");exports.getPosts=getPosts,exports.getSearchPosts=getSearchPosts;

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
