(function(){
  const C={pr:'יחסי ציבור',marketing:'שיווק',ads:'פרסום',sales:'מכירות',branding:'מיתוג'};
  const Q=[
    {d:'שיווק',k:'marketing',q:'עד כמה יש לעסק שלך כיוון שיווקי ברור לחודשים הקרובים?',h:'האם ברור מה רוצים להשיג, למי פונים ומה עושים כדי להגיע לשם?'},
    {d:'מיתוג',k:'branding',q:'עד כמה לקוח חדש מבין במהירות למה לבחור דווקא בעסק שלך?',h:'הכוונה למסר, לבידול ולסיבה ברורה לבחור בך ולא במתחרה.'},
    {d:'יחסי ציבור',k:'pr',q:'עד כמה העסק שלך נתפס כסמכות שאפשר לסמוך עליה?',h:'המלצות, אזכורים, שיתופי פעולה, נוכחות ציבורית ואמון.'},
    {d:'פרסום',k:'ads',q:'עד כמה הפרסום שלך מייצר תוצאה שאפשר למדוד?',h:'לא רק כמה אנשים ראו — אלא כמה פניות, לידים או מכירות נוצרו.'},
    {d:'מכירות',k:'sales',q:'עד כמה פנייה של לקוח פוטנציאלי הופכת אצלך ללקוח בפועל?',h:'חשוב על מהירות תגובה, תהליך המכירה, מעקב וסגירה.'},
    {d:'שיווק',k:'marketing',q:'עד כמה העסק שלך ממשיך להיות נוכח אצל הלקוח גם אחרי שהוא כבר מכיר אותך?',h:'תוכן, קשר רציף, הצעות, קהילה ויצירת ביקוש לאורך זמן.'},
    {d:'מיתוג',k:'branding',q:'עד כמה הנראות של העסק משדרת את הרמה שאתה באמת רוצה לשדר?',h:'אתר, רשתות, חומרים, שפה גרפית וטון תקשורתי — הכול מרגיש כמו אותו מותג.'},
    {d:'יחסי ציבור',k:'pr',q:'עד כמה אנשים מדברים על העסק שלך גם בלי ששילמת על חשיפה?',h:'המלצות, שיח, קשרים, מובילי דעה ועניין טבעי סביב העסק.'},
    {d:'פרסום',k:'ads',q:'עד כמה אתה יודע איזה מסר ואיזה קהל מביאים לך את התוצאות הטובות ביותר?',h:'כלומר, לא מפרסמים רק כי צריך — יודעים מה עובד וממשיכים לשפר.'},
    {d:'מכירות',k:'sales',q:'עד כמה יש לך שליטה מלאה על הלידים שלך מרגע הפנייה ועד לסגירה?',h:'האם שום פנייה לא הולכת לאיבוד ויש לך תמונה ברורה של מה קורה בצינור המכירות?'}
  ];

  let i=0, answers=[], scores={pr:[],marketing:[],ads:[],sales:[],branding:[]};
  const $=id=>document.getElementById(id);
  const track=(name,params)=>{try{if(typeof window.gtag==='function')window.gtag('event',name,params||{});}catch(e){}};

  function reset(){i=0;answers=[];scores={pr:[],marketing:[],ads:[],sales:[],branding:[]};}

  function render(){
    const q=Q[i];
    $('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';
    $('count').textContent='שאלה '+(i+1)+' מתוך '+Q.length;
    $('pct').textContent=Math.round(((i)/Q.length)*100)+'%';
    $('barfill').style.width=((i+1)/Q.length*100)+'%';
    $('domain').textContent=q.d;
    $('question').textContent=q.q;
    $('hint').textContent=q.h;
    $('scale').innerHTML='';
    for(let n=1;n<=10;n++){
      const b=document.createElement('button');b.type='button';b.className='num'+(answers[i]===n?' sel':'');b.textContent=n;
      b.onclick=()=>pick(n);$('scale').appendChild(b);
    }
    $('back').style.visibility=i===0?'hidden':'visible';
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function pick(n){
    const q=Q[i];
    if(answers[i]!=null){const old=answers[i];const idx=scores[q.k].indexOf(old);if(idx>-1)scores[q.k].splice(idx,1);}
    answers[i]=n;scores[q.k].push(n);
    track('quiz_answer',{question_number:i+1,category:q.k,score:n});
    if(i<Q.length-1){i++;render();}else finish();
  }

  window.start=function(){reset();track('quiz_start');render();};
  window.goBack=function(){if(i>0){i--;render();}};
  window.restart=function(){reset();track('quiz_restart');$('quiz').style.display='none';$('result').style.display='none';$('hero').style.display='block';window.scrollTo({top:0,behavior:'smooth'});};

  function avg(k){const a=scores[k];return a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;}

  function finish(){
    const keys=['pr','marketing','ads','sales','branding'];
    const v={};keys.forEach(k=>v[k]=avg(k));
    const ranked=[...keys].sort((a,b)=>v[a]-v[b]);
    const gap=ranked[0], second=ranked[1];
    const labels={
      pr:'חיזוק אמון, נוכחות וסמכות',
      marketing:'בניית ביקוש ותכנית שיווקית',
      ads:'דיוק הפרסום והמדידה',
      sales:'שיפור תהליך המכירה והסגירה',
      branding:'חידוד המותג, המסר והבידול'
    };
    const next={
      pr:'לבנות נוכחות שמייצרת אמון גם לפני שהלקוח פונה.',
      marketing:'להגדיר יעד, קהל, מסר ותכנית פעולה לפני שמגדילים פעילות.',
      ads:'לבדוק מה עובד לפי נתונים: קהל, מסר, ערוץ ותוצאה עסקית.',
      sales:'לסדר את הדרך מפנייה ועד סגירה ולוודא שאין לידים שנעלמים.',
      branding:'לחדד את ההבטחה, הבידול והנראות כך שהערך יהיה ברור מיד.'
    };
    const insight={
      pr:'העסק צריך יותר אמון ונוכחות ציבורית סביבו.',
      marketing:'יש מקום לחזק את הכיוון, התכנון והיצירה השוטפת של ביקוש.',
      ads:'יש מקום להפוך את הפרסום ליותר מדויק, מדיד ורווחי.',
      sales:'יש מקום לשפר את ההמרה מפניות ללקוחות.',
      branding:'יש מקום לחדד את הזהות והסיבה לבחור דווקא בעסק.'
    };

    $('quiz').style.display='none';$('result').style.display='block';
    $('rt').textContent=labels[gap];
    $('rx').textContent='הציון הנמוך ביותר שלך הוא '+v[gap]+'/10 ב'+C[gap]+'. אחריו כדאי לבדוק את '+C[second]+' ('+v[second]+'/10).';
    const order=['pr','marketing','ads','sales','branding'];
    order.forEach((k,n)=>{$('m'+(n+1)).style.width=(v[k]*10)+'%';$('v'+(n+1)).textContent=v[k]+'/10';});
    $('rr').textContent=insight[gap];
    $('rn').textContent='התחום הבא לבדיקה: '+C[second]+' — '+v[second]+'/10.';
    $('nextText').textContent=next[gap];
    $('wa').href='https://wa.me/972553048242?text='+encodeURIComponent('היי יוסי, עשיתי את האבחון. התחום המרכזי שעלה לי הוא '+C[gap]+' ('+v[gap]+'/10). התחום הבא: '+C[second]+' ('+v[second]+'/10). אשמח להבין מה אפשר לעשות.');
    track('quiz_complete',{diagnosis:gap,diagnosis_score:v[gap],second:second,questions_answered:Q.length});
    window.scrollTo({top:0,behavior:'smooth'});
  }

  document.addEventListener('click',function(e){const link=e.target.closest&&e.target.closest('#wa');if(link)track('whatsapp_click',{placement:'quiz_result'});});

  // Keep the supplied logo prominent and centered on mobile/desktop.
  const style=document.createElement('style');
  style.textContent='.head .logo{width:150px!important;height:60px!important;object-fit:contain!important;object-position:center!important}@media(max-width:560px){.head .logo{width:145px!important;height:58px!important}}';
  document.head.appendChild(style);
  track('quiz_page_open');
})();
