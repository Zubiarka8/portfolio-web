/**
 * First-visit language selection for a static host (no server, no proxy).
 * The Spanish site lives at the root and English under /en; this script runs
 * in <head> before first paint, only on Spanish root-level pages.
 *
 * Priority: the visitor's saved choice (localStorage, written by the language
 * switch), then the browser's language list: the first Spanish or English
 * entry wins, and English is used when neither is listed. Crawlers and link
 * previews are left on the URL they asked for so Spanish pages stay indexable.
 * /es and /es/... are never redirected.
 */
export const LOCALE_STORAGE_KEY = "locale";

export function localeRedirectScript(basePath: string): string {
  const base = JSON.stringify(basePath);
  return `(function(){try{
var b=${base},p=location.pathname;
if(b&&p.indexOf(b)===0)p=p.slice(b.length);
p=p.replace(/\\/+$/,"")||"/";
var to=null;
if(p==="/")to="/en/";
else if(p.indexOf("/proyectos/")===0)to="/en/projects/"+p.slice(11)+"/";
if(!to)return;
var s=null;try{s=localStorage.getItem("${LOCALE_STORAGE_KEY}")}catch(e){}
var w=s;
if(w!=="es"&&w!=="en"){
if(/bot|crawl|spider|slurp|lighthouse|preview|facebookexternalhit/i.test(navigator.userAgent)||navigator.webdriver)return;
var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
w="en";
for(var i=0;i<l.length;i++){var c=String(l[i]).toLowerCase().split("-")[0];if(c==="es"||c==="en"){w=c;break}}
}
if(w==="en")location.replace(b+to+location.search+location.hash);
}catch(e){}})();`;
}
