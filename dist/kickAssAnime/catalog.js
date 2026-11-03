// @vega-provider kickAssAnime
// @vega-version 1.6
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),catalog_exports={};__export(catalog_exports,{catalog:()=>catalog,genres:()=>genres});var catalog=[{title:"Trending",filter:"/api/show/trending"},{title:"Popular",filter:"/api/show/popular"},{title:"Recent (Sub)",filter:"/api/show/recent?type=sub"},{title:"Recent (Dub)",filter:"/api/show/recent?type=dub"},{title:"Recent (Chinese)",filter:"/api/show/recent?type=chinese"},{title:"All Anime",filter:"/api/anime"}],genres=[{title:"Action",filter:"Action"},{title:"Adventure",filter:"Adventure"},{title:"Comedy",filter:"Comedy"},{title:"Drama",filter:"Drama"},{title:"Ecchi",filter:"Ecchi"},{title:"Fantasy",filter:"Fantasy"},{title:"Horror",filter:"Horror"},{title:"Mahou Shoujo",filter:"Mahou Shoujo"},{title:"Mecha",filter:"Mecha"},{title:"Music",filter:"Music"},{title:"Mystery",filter:"Mystery"},{title:"Psychological",filter:"Psychological"},{title:"Romance",filter:"Romance"},{title:"Sci-Fi",filter:"Sci-Fi"},{title:"Slice of Life",filter:"Slice of Life"},{title:"Sports",filter:"Sports"},{title:"Supernatural",filter:"Supernatural"},{title:"Suspense",filter:"Suspense"},{title:"Thriller",filter:"Thriller"}];exports.catalog=catalog,exports.genres=genres;

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
