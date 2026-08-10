/* SK Movies final UI cleanup. Remove misleading external Watch links. */
(function(){
  function clean(){
    document.querySelectorAll('.card').forEach(card=>{
      card.querySelectorAll('.watch-btn:not(.anime-watch), .free-watch-btn').forEach(el=>el.remove());
    });
  }
  clean();
  [300,800,1500,3000,5000].forEach(t=>setTimeout(clean,t));
  new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
})();
