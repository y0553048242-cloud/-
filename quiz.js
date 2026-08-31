(function(){
  const C={pr:'יחסי ציבור',marketing:'שיווק',ads:'פרסום',sales:'מכירות',branding:'מיתוג',targeting:'טרגוט'};
  const Q=[
    ['מה הכי מרגיש תקוע כרגע?',[['לא מספיק אנשים מכירים את העסק','pr',4,'◈'],['יש חשיפה, אבל היא לא מביאה מספיק פניות','marketing',4,'↗'],['יש פניות, אבל קשה להפוך אותן ללקוחות','sales',4,'₪'],['העסק טוב, אבל לא ברור למה לבחור דווקא בו','branding',4,'◆']]],
    ['עד כמה המסר של העסק ברור למי שנחשף אליו?',[['ברור מאוד — מבינים מיד מי אנחנו ומה אנחנו מציעים','branding',1,'◆'],['יש מסר, אבל הוא לא מספיק חד','branding',2,'◇'],['אנשים שואלים הרבה שאלות בסיסיות','targeting',3,'◎'],['קשה לי להסביר במשפט אחד מה הבידול שלנו','branding',4,'◇']]],
    ['מי בדיוק אמור להיות הלקוח המרכזי שלך?',[['הקהל מוגדר וברור','targeting',1,'◎'],['יש כמה קהלים ואני לא בטוח למי לתת עדיפות','targeting',3,'◌'],['אני פונה כמעט לכולם','targeting',4,'◍'],['אני יודע מי קונה, אבל לא מי הכי משתלם לי','targeting',3,'◎']]],
    ['עד כמה הפרסום מגיע לאנשים הנכונים?',[['מגיע לקהל מאוד מדויק','targeting',1,'◎'],['יש חשיפה אבל היא רחבה מדי','targeting',3,'↗'],['לא ברור לי מי באמת רואה את הפרסום','targeting',4,'◌'],['אני מפרסם לפי תחושה ולא לפי נתונים','marketing',4,'▣']]],
    ['מה קורה כשמישהו כבר מתעניין?',[['יש תהליך מכירה מסודר וברור','sales',1,'₪'],['יש פניות אבל הרבה מהן נעלמות','sales',3,'↘'],['אני מטפל בכל פנייה אחרת','sales',3,'◌'],['אין לי דרך מסודרת לעקוב אחרי לידים','sales',4,'□']]],
    ['כמה אנשים מדברים על העסק או מזכירים אותו בלי שביקשת?',[['יש הרבה המלצות ואזכורים','pr',1,'◈'],['יש כמה גורמים שמכירים וממליצים','pr',2,'◇'],['כמעט לא שומעים על העסק מחוץ לפרסום','pr',3,'○'],['הנוכחות הציבורית של העסק כמעט לא קיימת','pr',4,'□']]],
    ['איך העסק נראה ונשמע כלפי חוץ?',[['יש שפה ברורה ועקבית','branding',1,'◆'],['הנראות טובה אבל לא מספיק מובחנת','branding',2,'◇'],['כל ערוץ נראה קצת אחרת','branding',3,'◌'],['לא השקענו כמעט בבניית מותג','branding',4,'□']]],
    ['מה הכי חסר לך כדי לגדול עכשיו?',[['יותר אמון, קשרים ואזכורים','pr',4,'◈'],['יותר תנועה וחשיפה לקהל הנכון','marketing',4,'↗'],['יותר סגירות ממה שכבר מגיע','sales',4,'₪'],['מיצוב חד וברור יותר','branding',4,'◆']]],
    ['עד כמה המוצר או השירות שלך מתאים לקהל שאליו אתה פונה?',[['התאמה גבוהה — זה בדיוק מה שהקהל צריך','targeting',1,'✓'],['יש התאמה, אבל צריך לדייק את ההצעה','targeting',2,'◇'],['אני לא בטוח שההצעה מדברת בשפה של הקהל','targeting',3,'◎'],['קשה לי להגדיר למה שהלקוח צריך דווקא את הפתרון הזה','targeting',4,'?']]],
    ['אם היית צריך לבחור דבר אחד לשפר בחודש הקרוב, מה זה היה?',[['יחסי ציבור, אמון ונוכחות','pr',4,'◈'],['שיווק ויצירת ביקוש','marketing',4,'↗'],['מכירות והמרת פניות ללקוחות','sales',4,'₪'],['מיתוג, מסר ובידול','branding',4,'◆'],['טרגוט — להגיע לאנשים הנכונים','targeting',4,'◎']]]
  ];
  let i=0,ans=[],s={pr:0,marketing:0,sales:0,branding:0,targeting:0};
  const $=id=>document.getElementById(id);
  function track(name,params){try{if(typeof window.gtag==='function')window.gtag('event',name,params||{});}catch(e){}}
  track('quiz_page_open');
  const logo=$('.logo');
  if(logo){logo.outerHTML='<img class="logo" alt="רוט" src="./rot-symbol.svg?v=3">';}
  function reset(){i=0;ans=[];s={pr:0,marketing:0,sales:0,branding:0,targeting:0};}
  function render(){const q=Q[i];$('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';$('progress').style.display='flex';$('progress').innerHTML=Q.map((_,n)=>'<div class="bar '+(n<=i?'on':'')+'></div>').join('');$('count').textContent='שאלה '+(i+1)+' מתוך '+Q.length;$('pct').textContent=Math.round(i/Q.length*100)+'%';$('question').textContent=q[0];$('answers').innerHTML=q[1].map((a,n)=>'<button class="answer" onclick="window.__pick('+n+')"><span class="ico">'+a[3]+'</span><span>'+a[0]+'</span></button>').join('');$('back').disabled=i===0;}
  window.__pick=function(n){const a=Q[i][1][n];ans[i]=a;s[a[1]]+=a[2];track('quiz_answer',{question_number:i+1,category:a[1]});if(i<Q.length-1){i++;render();}else finish();};
  window.start=function(){reset();track('quiz_start');render();scrollTo({top:0,behavior:'smooth'});};
  window.goBack=function(){if(i<1)return;const a=ans[i-1];if(a)s[a[1]]-=a[2];ans.pop();i--;render();};
  window.restart=function(){reset();track('quiz_restart');$('quiz').style.display='none';$('result').style.display='none';$('progress').style.display='none';$('hero').style.display='block';scrollTo({top:0,behavior:'smooth'});};
  function finish(){
    $('quiz').style.display='none';$('progress').style.display='none';$('result').style.display='block';
    const keys=['pr','marketing','sales','branding','targeting'];const v={};keys.forEach(k=>v[k]=Math.round(Math.max(0,Math.min(100,100-s[k]/16*100))));keys.sort((a,b)=>v[b]-v[a]);const lead=keys[0],second=keys[1];
    $('ri').textContent='◆';$('rt').textContent='הכיוון שכדאי לבדוק קודם: '+C[lead];$('rx').textContent='לפי התשובות, הפער המרכזי כרגע נראה ב'+C[lead]+'. אחריו כדאי לבדוק את '+C[second]+'.';
    ['pr','marketing','sales','branding','targeting'].forEach((k,n)=>{$('m'+(n+1)).style.width=v[k]+'%';$('v'+(n+1)).textContent=v[k];});
    $('rr').textContent=C[lead]+' הוא התחום שבו יש כרגע הכי הרבה מקום לדיוק ושיפור.';$('rn').textContent='כדאי לבדוק את המסר, הקהל, המוצר והפעולות בפועל — ולא רק להוסיף עוד פרסום.';$('nextText').textContent='לפני שמגדילים פעילות, כדאי לוודא ש'+C[lead]+' מחובר נכון לקהל ולמוצר.';
    $('wa').href='https://wa.me/972553048242?text='+encodeURIComponent('היי, עשיתי את האבחון. התוצאה המרכזית שלי היא '+C[lead]+'. אשמח לבדוק את זה על העסק שלי.');track('quiz_complete',{diagnosis:C[lead],questions_answered:Q.length});scrollTo({top:0,behavior:'smooth'});
  }
  document.addEventListener('click',function(e){const link=e.target.closest&&e.target.closest('#wa');if(link)track('whatsapp_click',{placement:'quiz_result'});});
})();
