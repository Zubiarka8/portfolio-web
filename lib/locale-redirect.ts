/**
 * First-visit language selection for a static host (no server, no proxy).
 * The root URL ("/") and root-level project URLs carry no language: this
 * script, which runs in <head> before first paint, sends the visitor to the
 * Spanish (/es/) or English (/en/) version. Visits that already name a
 * language (/es/..., /en/...) are never redirected.
 *
 * Priority: the visitor's saved choice (localStorage, written by the language
 * switch), then the browser's language list: the first Spanish or English
 * entry wins, and English is used when neither is listed. Crawlers and link
 * previews stay on the root page, whose canonical URL is /es/.
 */
export const LOCALE_STORAGE_KEY = "locale";

export function localeRedirectScript(basePath: string): string {
  const base = JSON.stringify(basePath);
  return `(function(){try{
var b=${base},p=location.pathname;
if(b&&p.indexOf(b)===0)p=p.slice(b.length);
p=p.replace(/\\/+$/,"")||"/";
var slug=null;
if(p.indexOf("/proyectos/")===0)slug=p.slice(11);
else if(p!=="/")return;
var s=null;try{s=localStorage.getItem("${LOCALE_STORAGE_KEY}")}catch(e){}
var w=s;
if(w!=="es"&&w!=="en"){
if(/bot|crawl|spider|slurp|lighthouse|preview|facebookexternalhit/i.test(navigator.userAgent)||navigator.webdriver)return;
var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
w="en";
for(var i=0;i<l.length;i++){var c=String(l[i]).toLowerCase().split("-")[0];if(c==="es"||c==="en"){w=c;break}}
}
var to=w==="en"?(slug===null?"/en/":"/en/projects/"+slug+"/"):(slug===null?"/es/":"/es/proyectos/"+slug+"/");
location.replace(b+to+location.search+location.hash);
}catch(e){}})();`;
}
