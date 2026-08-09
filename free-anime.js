/* Official/free anime links only. Availability can vary by country. */
(function(){
  const crunchrollFree=new Set(['A Couple of Cuckoos','Alya Sometimes Hides Her Feelings in Russian','Assassination Classroom','Battle Game in 5 Seconds','BLUE LOCK','Bye Bye, Earth','Classroom of the Elite','Classroom of the Elite Season 2','Date A Live IV','Death March to the Parallel World Rhapsody',"DON'T TOY WITH ME, MISS NAGATORO",'Dr. STONE','Gleipnir','Rent-a-Girlfriend','Requiem of the Rose King','Re:ZERO -Starting Life in Another World- Director’s Cut','SABIKUI BISCO','SAKUGAN','Salaryman\'s Club','Shangri-la Frontier','Shikimori\'s Not Just a Cutie','That Time I Got Reincarnated as a Slime','The Ancient Magus\' Bride','The Rising of the Shield Hero','The Yakuza\'s Guide to Babysitting','To Your Eternity','Toilet-bound Hanako-kun','Tokyo Revengers','Tomodachi Game','Trigun','TSUKIMICHI -Moonlit Fantasy-','Yona of the Dawn','Mob Psycho 100','Jujutsu Kaisen','KONOSUBA -God\'s blessing on this wonderful world!','Miss Kobayashi\'s Dragon Maid','Noblesse','ODDTAXI','PSYCHO-PASS']);
  const vizFree=new Set(['Naruto','Naruto: Shippuden','Death Note','Hunter x Hunter']);
  const q=t=>encodeURIComponent(t);
  const officialFreeUrl=t=>vizFree.has(t)?'https://www.youtube.com/@vizmedia/search?query='+q(t+' episode 1'):crunchrollFree.has(t)?'https://www.youtube.com/@Crunchyroll/search?query='+q(t+' full episode'):null;
  function addFreeButtons(){
    document.querySelectorAll('.card').forEach(card=>{
      if(card.querySelector('.free-watch-btn'))return;
      const title=card.querySelector('h3')?.textContent?.trim();
      const url=officialFreeUrl(title); if(!url)return;
      const row=card.querySelector('.btn-row'); if(!row)return;
      const a=document.createElement('a');a.className='free-watch-btn';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='🆓 Free / Official';row.appendChild(a);
    });
  }
  setTimeout(addFreeButtons,250);
  setTimeout(addFreeButtons,1200);
})();