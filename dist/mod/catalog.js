/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider mod
// @vega-version 2.1
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),catalog_exports={};__export(catalog_exports,{catalog:()=>catalog,genres:()=>genres});var catalog=[{title:"Latest",filter:""},{title:"Netflix",filter:"/ott/netflix"},{title:"HBO Max",filter:"/ott/hbo-max"},{title:"Amazon Prime",filter:"/ott/amazon-prime-video"}],genres=[{title:"Apple TV+",filter:"/ott/apple-tv"},{title:"Disney+",filter:"/ott/disney-plus"},{title:"Hulu",filter:"/ott/hulu"},{title:"Crunchyroll",filter:"/ott/crunchyroll"},{title:"Action",filter:"/movies-by-genre/action/"},{title:"Adventure",filter:"/movies-by-genre/adventure/"},{title:"Animation",filter:"/movies-by-genre/animated/"},{title:"Comedy",filter:"/movies-by-genre/comedy/"},{title:"Crime",filter:"/movies-by-genre/crime/"},{title:"Documentary",filter:"/movies-by-genre/documentary/"},{title:"Fantasy",filter:"/movies-by-genre/fantasy/"},{title:"Horror",filter:"/movies-by-genre/horror/"},{title:"Mystery",filter:"/movies-by-genre/mystery/"},{title:"Romance",filter:"/movies-by-genre/romance/"},{title:"Thriller",filter:"/movies-by-genre/thriller/"},{title:"Sci-Fi",filter:"/movies-by-genre/sci-fi/"}];exports.catalog=catalog,exports.genres=genres;

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
