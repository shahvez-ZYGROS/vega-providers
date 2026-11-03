// @vega-provider internetArchive
// @vega-version 1.0
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),posts_exports={};__export(posts_exports,{getPosts:()=>getPosts,getSearchPosts:()=>getSearchPosts});var IA_BASE="https://archive.org",LICENSE_FILTERS={publicDomain:"licenseurl:*publicdomain*",open:"licenseurl:(*publicdomain* OR *creativecommons*)"},getLicenseFilter=__name(providerContext=>__async(null,null,function*(){var _a;const choice=yield null==(_a=providerContext.kvStore)?void 0:_a.get("licenses");return LICENSE_FILTERS[choice||"open"]||LICENSE_FILTERS.open}),"getLicenseFilter"),buildSearchUrl=__name((query,page,rows=24)=>{const fields=["identifier","title","year","downloads"].map(f=>`fl[]=${f}`).join("&");return`${IA_BASE}/advancedsearch.php?q=${encodeURIComponent(query)}&${fields}&sort[]=${encodeURIComponent("downloads desc")}&rows=${rows}&page=${page}&output=json`},"buildSearchUrl"),sanitizeQuery=__name(text=>text.replace(/[\\+\-!(){}\[\]^"~*?:\/&|]/g," ").replace(/\s+/g," ").trim(),"sanitizeQuery"),imageUrl=__name(identifier=>`${IA_BASE}/services/img/${encodeURIComponent(identifier)}`,"imageUrl"),firstValue=__name(value=>{var _a;return Array.isArray(value)?String(null!=(_a=value[0])?_a:""):null==value?"":String(value)},"firstValue"),searchItems=__name((query,page,providerContext,signal)=>__async(null,null,function*(){var _a,_b;const license=yield getLicenseFilter(providerContext),url=buildSearchUrl(`(${query}) AND mediatype:movies AND ${license}`,page);return((null==(_b=null==(_a=(yield providerContext.axios.get(url,{headers:providerContext.commonHeaders,signal:signal})).data)?void 0:_a.response)?void 0:_b.docs)||[]).filter(doc=>doc.identifier).map(doc=>{const title=firstValue(doc.title)||doc.identifier,year=firstValue(doc.year);return{title:title,link:doc.identifier,image:imageUrl(doc.identifier),cornerTag:year||void 0}})}),"searchItems"),getPosts=__name(function(_0){return __async(this,arguments,function*({filter:filter,page:page,signal:signal,providerContext:providerContext}){return searchItems(filter,page,providerContext,signal)})},"getPosts"),getSearchPosts=__name(function(_0){return __async(this,arguments,function*({searchQuery:searchQuery,page:page,signal:signal,providerContext:providerContext}){const words=sanitizeQuery(searchQuery);return words?searchItems(`title:(${words})`,page,providerContext,signal):[]})},"getSearchPosts");exports.getPosts=getPosts,exports.getSearchPosts=getSearchPosts;

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
