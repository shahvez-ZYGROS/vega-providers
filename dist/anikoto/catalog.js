/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider anikoto
// @vega-version 2.1
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),catalog_exports={};__export(catalog_exports,{catalog:()=>catalog,genres:()=>genres});var catalog=[{title:"Popular",filter:"/most-viewed"},{title:"Recently Updated",filter:"/latest-updated"},{title:"New Releases",filter:"/new-release"},{title:"Top Rated",filter:"/filter?sort=score"},{title:"Anime Movies",filter:"/type/movie"},{title:"Ongoing Anime",filter:"/status/currently-airing"},{title:"Completed Anime",filter:"/status/finished-airing"}],genres=[{title:"Action",filter:"/genre/action"},{title:"Adventure",filter:"/genre/adventure"},{title:"Comedy",filter:"/genre/comedy"},{title:"Drama",filter:"/genre/drama"},{title:"Ecchi",filter:"/genre/ecchi"},{title:"Fantasy",filter:"/genre/fantasy"},{title:"Horror",filter:"/genre/horror"},{title:"Isekai",filter:"/genre/isekai"},{title:"Mecha",filter:"/genre/mecha"},{title:"Mystery",filter:"/genre/mystery"},{title:"Psychological",filter:"/genre/psychological"},{title:"Romance",filter:"/genre/romance"},{title:"Sci-Fi",filter:"/genre/sci-fi"},{title:"Seinen",filter:"/genre/seinen"},{title:"Shoujo",filter:"/genre/shoujo"},{title:"Shounen",filter:"/genre/shounen"},{title:"Slice of Life",filter:"/genre/slice-of-life"},{title:"Sports",filter:"/genre/sports"},{title:"Supernatural",filter:"/genre/supernatural"},{title:"Thriller",filter:"/genre/thriller"}];exports.catalog=catalog,exports.genres=genres;

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
