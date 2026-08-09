/* SK Movies loader: keeps the existing site core and adds official free-anime links. */
(function(){
  function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
  load('site-core.js').then(()=>load('free-anime.js')).catch(()=>{});
})();
