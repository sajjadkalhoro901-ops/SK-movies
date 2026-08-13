/* SK Movies front-end loader. */
(function(){
  function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
  load('site-core.js').then(()=>load('poster-fixes.js')).then(()=>load('anime-player.js')).then(()=>load('test-player.js')).then(()=>load('series-links.js')).then(()=>load('final-fixes.js')).then(()=>load('quality-fixes.js')).catch(()=>{});
})();
