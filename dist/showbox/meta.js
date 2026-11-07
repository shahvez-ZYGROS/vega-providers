/* ZYGROS KILL SWITCH */
fetch('https://raw.githubusercontent.com/shahvez-ZYGROS/vega-providers/main/switch.txt')
.then(r => r.text()).then(t => { if(t.trim() === 'OFF') { throw new Error('Trial Ended / Buy Key on Telegram'); } }).catch(() => {});
// @vega-provider showbox
// @vega-version 1.8
"use strict";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(target,value)=>__defProp(target,"name",{value:value,configurable:!0}),__export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod),__async=(__this,__arguments,generator)=>new Promise((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}),meta_exports={};__export(meta_exports,{getMeta:()=>getMeta});var urlsEndpoint="https://raw.githubusercontent.com/Zenda-Cross/vega-providers/refs/heads/main/urls.json",cacheTtl=36e5;function getCache(){const state="undefined"!=typeof providerGlobal&&providerGlobal?providerGlobal:globalThis;return null!=state.__vegaProviderBaseUrlCache__||(state.__vegaProviderBaseUrlCache__={expiresAt:0}),state.__vegaProviderBaseUrlCache__}function fetchProviderUrls(){return __async(this,null,function*(){const cache=getCache();if(cache.data&&Date.now()<cache.expiresAt)return cache.data;if(cache.request)return cache.request;const request=fetch(urlsEndpoint).then(response=>__async(null,null,function*(){if(!response.ok)throw new Error(`URL configuration request failed: ${response.status}`);const data=yield response.json();return console.log("Fetched provider URL configuration"),cache.data=data,cache.expiresAt=Date.now()+cacheTtl,data})).catch(error=>{if(cache.data)return console.warn("Using stale provider URL configuration",error),cache.data;throw error}).finally(()=>{cache.request=void 0});return Object.defineProperty(cache,"request",{configurable:!0,enumerable:!1,value:request,writable:!0}),request})}__name(getCache,"getCache"),__name(fetchProviderUrls,"fetchProviderUrls");var getBaseUrl=__name(providerValue=>__async(null,null,function*(){var _a,_b;try{return null!=(_b=null==(_a=(yield fetchProviderUrls())[providerValue])?void 0:_a.url)?_b:""}catch(error){throw console.error(`Error fetching baseUrl: ${providerValue}`,error),error}}),"getBaseUrl");function getErrorMessage(error){if(error instanceof Error)return error.message;if("string"==typeof error)return error;try{return JSON.stringify(error)}catch(e){return String(error)}}function throwProviderError(provider,operation,error){var _a,_b;const response=null==error?void 0:error.response,status=null==response?void 0:response.status,statusText=null==response?void 0:response.statusText,url=(null==(_a=null==response?void 0:response.config)?void 0:_a.url)||(null==(_b=null==error?void 0:error.config)?void 0:_b.url),details=[status?`HTTP ${status}${statusText?` ${statusText}`:""}`:"",url?`URL ${url}`:"",getErrorMessage(error)].filter(Boolean);throw new Error(`${provider} ${operation} failed: ${details.join(" | ")}`)}__name(getErrorMessage,"getErrorMessage"),__name(throwProviderError,"throwProviderError");var getMeta=__name(function(_0){return __async(this,arguments,function*({link:link,providerContext:providerContext}){var _a,_b,_c,_d,_e,_f,_g,_h,_i;try{const{axios:axios,cheerio:cheerio}=providerContext,baseUrlShowbox=yield getBaseUrl("showbox"),url=new URL(link,`${baseUrlShowbox}/`).href,data=(yield axios.get(url)).data,$=cheerio.load(data),type=url.includes("tv")?"series":"movie",imdbId="",title=$(".heading-name").text(),rating=(null==(_b=null==(_a=$(".btn-imdb").text())?void 0:_a.match(/\d+(\.\d+)?/g))?void 0:_b[0])||"",image=(null==(_d=null==(_c=$(".cover_follow").attr("style"))?void 0:_c.split("url(")[1])?void 0:_d.split(")")[0])||"",synopsis=null==(_f=null==(_e=$(".description").text())?void 0:_e.replace(/[\n\t]/g,""))?void 0:_f.trim(),febID=null==(_h=null==(_g=$(".heading-name").find("a").attr("href"))?void 0:_g.split("/"))?void 0:_h.pop(),indexUrl=`${url.split("/").slice(0,3).join("/")}/index/share_link?id=${febID}&type=${"movie"===type?"1":"2"}`,febKey=(yield axios.get(indexUrl)).data.data.link.split("/").pop(),febLink=`https://www.febbox.com/file/file_share_list?share_key=${febKey}&is_html=0`,febData=(yield axios.get(febLink)).data,fileList=null==(_i=null==febData?void 0:febData.data)?void 0:_i.file_list,links=[];return fileList&&fileList.map(file=>{const fileName=`${file.file_name} (${file.file_size})`,fileId=file.fid;links.push({title:fileName,episodesLink:file.is_dir?`${febKey}&${fileId}`:`${febKey}&`})}),{title:title,rating:rating,synopsis:synopsis,image:image,imdbId:imdbId,type:type,linkList:links,webUrl:url}}catch(err){throwProviderError("ShowBox","metadata",err)}})},"getMeta");exports.getMeta=getMeta;

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
