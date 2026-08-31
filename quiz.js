(function(){
  const C={pr:'יחסי ציבור',marketing:'שיווק',ads:'פרסום',sales:'מכירות',branding:'מיתוג'};
  const Q=[
    {d:'שיווק',k:'marketing',q:'עד כמה יש לך היום אסטרטגיית שיווק ברורה שמחוברת ליעדים העסקיים?',h:'1 = אין כיוון ברור · 10 = יש יעד, קהל, מסר ותכנית פעולה ברורה.'},
    {d:'מיתוג',k:'branding',q:'עד כמה לקוח חדש מבין בתוך כמה שניות מה העסק שלך נותן ולמה כדאי לבחור דווקא בך?',h:'חשוב על המסר, הבידול והערך שהלקוח מבין מיד.'},
    {d:'יחסי ציבור',k:'pr',q:'עד כמה העסק שלך מקבל אמון, המלצות ואזכורים גם בלי לשלם ישירות על כל חשיפה?',h:'המלצות, כתבות, שיתופי פעולה, מובילי דעה ונוכחות ציבורית.'},
    {d:'פרסום',k:'ads',q:'עד כמה אתה יודע בדיוק איזה פרסום מייצר לך פניות או מכירות — ולא רק חשיפות?',h:'1 = כמעט אין מדידה · 10 = ברור מה עובד, למי וכמה זה מחזיר.'},
    {d:'מכירות',k:'sales',q:'עד כמה תהליך המכירה שלך הופך פניות איכותיות ללקוחות בפועל?',h:'חשוב על מהירות תגובה, הצעה, טיפול בהתנגדויות, מעקב וסגירה.'},
    {d:'שיווק',k:'marketing',q:'עד כמה העסק שלך מצליח לייצר ביקוש באופן עקבי ולא רק כשעולה קמפיין?',h:'תוכן, קהילה, קשר עם לקוחות, חזרתיות ויצירת עניין לאורך זמן.'},
    {d:'מיתוג',k:'branding',q:'עד כמה כל נקודת מפגש עם העסק משדרת את אותה רמה ואותה זהות?',h:'אתר, וואטסאפ, פרסומים, הצעות מחיר, שפה ונראות — הכול צריך להרגיש כמו מותג אחד.'},
    {d:'יחסי ציבור',k:'pr',q:'עד כמה העסק שלך נתפס כמומחה בתחום שלו ולא רק כעוד ספק שמציע שירות?',h:'סמכות נבנית דרך תוכן, סיפורים, הישגים, מומחיות ונוכחות נכונה בתקשורת.'},
    {d:'פרסום',k:'ads',q:'עד כמה אתה יודע מי הקהל שהכי נכון לך להשיג ממנו לקוחות?',h:'1 = מפרסמים לקהל רחב בלי ודאות · 10 = קהל מדויק עם מסר והצעה מתאימים.'},
    {d:'מכירות',k:'sales',q:'עד כמה יש לך שליטה על כל ליד מהרגע שנכנס ועד שהוא נסגר או נפסל?',h:'האם יש מעקב מסודר, סטטוס לכל ליד וסיבה ברורה למה עסקה נסגרה או לא נסגרה?'}
  ];

  let i=0,answers=[],scores={pr:[],marketing:[],ads:[],sales:[],branding:[]};
  const $=id=>document.getElementById(id);
  const track=(name,params)=>{try{if(typeof window.gtag==='function')window.gtag('event',name,params||{});}catch(e){}};

  function reset(){i=0;answers=[];scores={pr:[],marketing:[],ads:[],sales:[],branding:[]};}

  function render(){
    const q=Q[i];
    $('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';
    $('count').textContent='שאלה '+(i+1)+' מתוך '+Q.length;
    $('pct').textContent=Math.round((i/Q.length)*100)+'%';
    $('barfill').style.width=((i+1)/Q.length*100)+'%';
    $('domain').textContent=q.d;
    $('question').textContent=q.q;
    $('hint').textContent=q.h;
    $('scale').innerHTML='';
    for(let n=1;n<=10;n++){
      const b=document.createElement('button');
      b.type='button';b.className='num'+(answers[i]===n?' sel':'');b.textContent=n;
      b.setAttribute('aria-label','ציון '+n+' מתוך 10');
      b.onclick=()=>pick(n);
      $('scale').appendChild(b);
    }
    $('back').style.visibility=i===0?'hidden':'visible';
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function pick(n){
    const q=Q[i];
    if(answers[i]!=null){
      const old=answers[i];
      const idx=scores[q.k].indexOf(old);
      if(idx>-1)scores[q.k].splice(idx,1);
    }
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
    const gap=ranked[0],second=ranked[1];
    const labels={
      pr:'חיזוק האמון והנוכחות הציבורית',
      marketing:'חידוד אסטרטגיית השיווק',
      ads:'דיוק הפרסום והמדידה',
      sales:'שיפור המכירות והסגירה',
      branding:'חידוד המותג והבידול'
    };
    const next={
      pr:'לבנות סמכות ונוכחות שמייצרות אמון עוד לפני שהלקוח פונה.',
      marketing:'להגדיר יעד, קהל, מסר ותכנית פעולה לפני שמגדילים תקציבי פעילות.',
      ads:'למדוד לפי פניות ומכירות, לזהות מה עובד ולחזק רק את מה שמוכיח את עצמו.',
      sales:'לסדר תהליך מסודר מפנייה ועד סגירה ולוודא שאף ליד איכותי לא נעלם.',
      branding:'לחדד את ההבטחה, הבידול והנראות כך שהערך יהיה ברור כמעט מיד.'
    };
    const insight={
      pr:'יש מקום להפוך את המומחיות והעשייה של העסק לאמון ולנוכחות ציבורית.',
      marketing:'יש מקום לחזק את התכנון ואת היכולת לייצר ביקוש באופן עקבי.',
      ads:'יש מקום להפוך את הפרסום למדויק, מדיד ומחובר יותר לתוצאה עסקית.',
      sales:'יש מקום לשפר את הדרך שבה פניות איכותיות הופכות להכנסות.',
      branding:'יש מקום ליצור בידול חד יותר ולוודא שהנראות והמסר משדרים את הערך האמיתי.'
    };

    $('quiz').style.display='none';$('result').style.display='block';
    $('rt').textContent=labels[gap];
    $('rx').textContent='הציון הנמוך ביותר שלך הוא '+v[gap]+'/10 ב'+C[gap]+'. התחום הבא שכדאי לבדוק הוא '+C[second]+' עם '+v[second]+'/10.';
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
  track('quiz_page_open');
})();
