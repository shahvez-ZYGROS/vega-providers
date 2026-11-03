// @vega-provider mkvDrama
// @vega-version 1.74
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),catalog_exports={};__export(catalog_exports,{catalog:()=>catalog,genres:()=>genres});var catalog=[{title:"Latest",filter:"titles?status=&type=&order=latest"},{title:"Drama",filter:"titles?type=drama&order=latest"},{title:"Movies",filter:"titles?type=movie&order=latest"},{title:"Mini Drama",filter:"titles?type=mini_drama&order=latest"},{title:"Ongoing",filter:"titles?status=ongoing&order=latest"},{title:"Completed",filter:"titles?status=completed&order=latest"}],genres=[{title:"Korean",filter:"titles?country[]=south-korea&order=latest"},{title:"Chinese",filter:"titles?country[]=china&order=latest"},{title:"Japanese",filter:"titles?country[]=japan&order=latest"},{title:"Thai",filter:"titles?country[]=thailand&order=latest"},{title:"Action",filter:"titles?genre[]=action&order=latest"},{title:"Romance",filter:"titles?genre[]=romance&order=latest"},{title:"Thriller",filter:"titles?genre[]=thriller&order=latest"}];exports.catalog=catalog,exports.genres=genres;

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
