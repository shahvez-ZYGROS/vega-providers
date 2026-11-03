// @vega-provider 1flex
// @vega-version 1.0.5
"use strict";var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),posts_exports={};__export(posts_exports,{getPosts:()=>getPosts,getSearchPosts:()=>getSearchPosts});var DB_BASE="https://db.1flex.org",getPosts=__name(function(_0){return __async(this,arguments,function*({filter:filter,page:page,providerValue:providerValue,signal:signal,providerContext:providerContext}){var _a;const{axios:axios}=providerContext,cleanFilter=filter?filter.startsWith("/")?filter:`/${filter}`:"/discover/movie?sort_by=popularity.desc&vote_count.gte=500",url=`${DB_BASE}${cleanFilter}${cleanFilter.includes("?")?"&":"?"}page=${page}`;return((null==(_a=(yield axios.get(url,{signal:signal,headers:__spreadProps(__spreadValues({},providerContext.commonHeaders),{Referer:"https://www.1flex.org/",Origin:"https://www.1flex.org"})})).data)?void 0:_a.results)||[]).filter(item=>{const hasPoster=Boolean(item.poster_path),isReleased=Boolean(item.release_date||item.first_air_date),hasVotes=null==item.vote_count||item.vote_count>30;return hasPoster&&isReleased&&hasVotes}).map(item=>{const mediaType=Boolean(item.title||item.release_date||"movie"===item.media_type)?"movie":"tv",title=item.title||item.name||"Untitled",image=item.poster_path?`https://image.tmdb.org/t/p/w500${item.poster_path}`:"";return{title:title,link:`https://www.1flex.org/play?id=${item.id}&type=${mediaType}`,image:image,tag:mediaType.toUpperCase(),cornerTag:item.vote_average?Number(item.vote_average).toFixed(1):void 0}})})},"getPosts"),getSearchPosts=__name(function(_0){return __async(this,arguments,function*({searchQuery:searchQuery,page:page,providerValue:providerValue,signal:signal,providerContext:providerContext}){var _a;const{axios:axios}=providerContext,url=`${DB_BASE}/search/multi?query=${encodeURIComponent(searchQuery)}&page=${page}`;return((null==(_a=(yield axios.get(url,{signal:signal,headers:__spreadProps(__spreadValues({},providerContext.commonHeaders),{Referer:"https://www.1flex.org/",Origin:"https://www.1flex.org"})})).data)?void 0:_a.results)||[]).filter(item=>"movie"===item.media_type||"tv"===item.media_type).map(item=>{const mediaType="movie"===item.media_type?"movie":"tv",title=item.title||item.name||"Untitled",image=item.poster_path?`https://image.tmdb.org/t/p/w500${item.poster_path}`:"";return{title:title,link:`https://www.1flex.org/play?id=${item.id}&type=${mediaType}`,image:image,tag:mediaType.toUpperCase(),cornerTag:item.vote_average?Number(item.vote_average).toFixed(1):void 0}})})},"getSearchPosts");exports.getPosts=getPosts,exports.getSearchPosts=getSearchPosts;

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
