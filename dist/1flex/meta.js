/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider 1flex
// @vega-version 1.0.5
"use strict";var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),meta_exports={};__export(meta_exports,{getMeta:()=>getMeta});var DB_BASE="https://db.1flex.org";function parseLink(link){try{if(link.startsWith("{")){const parsed=JSON.parse(link);return{id:String(parsed.id),type:parsed.type||"movie"}}const url=new URL(link);return{id:url.searchParams.get("id")||"",type:url.searchParams.get("type")||"movie"}}catch(e){const idMatch=link.match(/id=([^&]+)/),typeMatch=link.match(/type=([^&]+)/);return{id:idMatch?idMatch[1]:link,type:typeMatch?typeMatch[1]:"movie"}}}__name(parseLink,"parseLink");var getMeta=__name(function(_0){return __async(this,arguments,function*({link:link,providerContext:providerContext}){var _a;const{axios:axios}=providerContext,{id:id,type:type}=parseLink(link),isMovie="movie"===type,endpoint=isMovie?`${DB_BASE}/movie/${id}?append_to_response=images,videos,releases,credits,similar`:`${DB_BASE}/tv/${id}?append_to_response=images,videos,content_ratings,credits,similar,external_ids`,data=(yield axios.get(endpoint,{headers:__spreadProps(__spreadValues({},providerContext.commonHeaders),{Referer:"https://www.1flex.org/",Origin:"https://www.1flex.org"})})).data;if(!data)throw new Error(`Media metadata not found for ID: ${id}`);const title=(isMovie?data.title:data.name)||"Untitled",image=data.poster_path?`https://image.tmdb.org/t/p/w500${data.poster_path}`:"",rating=data.vote_average?Number(data.vote_average).toFixed(1):void 0;if(isMovie)return{title:title,synopsis:data.overview||"",image:image,poster:image,imdbId:data.imdb_id||"",type:"movie",rating:rating,linkList:[{title:"Movie",quality:"1080p",directLinks:[{title:data.title||"Play Movie",link:JSON.stringify({id:id,type:"movie"}),type:"movie"}]}]};const seasons=data.seasons||[];return{title:title,synopsis:data.overview||"",image:image,poster:image,imdbId:(null==(_a=data.external_ids)?void 0:_a.imdb_id)||"",type:"series",rating:rating,linkList:seasons.filter(s=>s.season_number>0).map(s=>({title:s.name||`Season ${s.season_number}`,episodesLink:JSON.stringify({id:id,season:s.season_number,type:"tv"})}))}})},"getMeta");exports.getMeta=getMeta;

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
