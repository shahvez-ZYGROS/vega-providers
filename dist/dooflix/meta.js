/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider dooflix
// @vega-version 1.5
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),meta_exports={};__export(meta_exports,{getMeta:()=>getMeta});var headers={"Accept-Encoding":"gzip","API-KEY":"2pm95lc6prpdbk0ppji9rsqo",Connection:"Keep-Alive","If-Modified-Since":"Wed, 14 Aug 2024 13:00:04 GMT","User-Agent":"okhttp/3.14.9"},getMeta=__name(function(_0){return __async(this,arguments,function*({link:link,providerContext:providerContext}){var _a,_b,_c,_d;try{const{axios:axios}=providerContext,resData=(yield axios.get(link,{headers:headers})).data,jsonStart=null==resData?void 0:resData.indexOf("{"),jsonEnd=(null==resData?void 0:resData.lastIndexOf("}"))+1,data=(null==(_a=null==JSON?void 0:JSON.parse(null==resData?void 0:resData.substring(jsonStart,jsonEnd)))?void 0:_a.title)?null==JSON?void 0:JSON.parse(null==resData?void 0:resData.substring(jsonStart,jsonEnd)):resData,title=(null==data?void 0:data.title)||"",synopsis=(null==data?void 0:data.description)||"",image=(null==data?void 0:data.poster_url)||"",cast=(null==data?void 0:data.cast)||[],rating=(null==data?void 0:data.imdb_rating)||"",type=Number(null==data?void 0:data.is_tvseries)?"series":"movie",tags=(null==(_b=null==data?void 0:data.genre)?void 0:_b.map(genre=>null==genre?void 0:genre.name))||[],links=[];return"series"===type?null==(_c=null==data?void 0:data.season)||_c.map(season=>{var _a2;const title2=(null==season?void 0:season.seasons_name)||"",directLinks=(null==(_a2=null==season?void 0:season.episodes)?void 0:_a2.map(episode=>({title:null==episode?void 0:episode.episodes_name,link:null==episode?void 0:episode.file_url})))||[];links.push({title:title2,directLinks:directLinks})}):null==(_d=null==data?void 0:data.videos)||_d.map(video=>{links.push({title:title+" "+(null==video?void 0:video.label),directLinks:[{title:"Play",link:null==video?void 0:video.file_url}]})}),{image:(null==image?void 0:image.includes("https"))?image:null==image?void 0:image.replace("http","https"),synopsis:synopsis,title:title,rating:rating,imdbId:"",cast:cast,tags:tags,type:type,linkList:links}}catch(err){return console.error(err),{title:"",synopsis:"",image:"",imdbId:"",type:"movie",linkList:[]}}})},"getMeta");exports.getMeta=getMeta;

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
