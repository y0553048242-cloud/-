(function(){
  const C={marketing:'שיווק',ads:'פרסום',pr:'יחסי ציבור',sales:'מכירות',branding:'מיתוג',product:'דיוק המוצר'};
  const Q=[
    {k:'marketing',d:'שיווק',type:'scale',q:'עד כמה ברור לך מה היעד השיווקי המרכזי של העסק שלך בחודשים הקרובים?',h:'1 = אין כיוון ברור · 10 = יעד ברור ותכנית פעולה.'},
    {k:'branding',d:'מיתוג',type:'scale',q:'כשלקוח חדש פוגש את העסק שלך, עד כמה הוא מבין מיד למה לבחור דווקא בך?',h:'1 = הבידול לא ברור · 10 = הערך ברור מיד.'},
    {k:'ads',d:'פרסום',type:'scale',q:'עד כמה הפרסום שלך מייצר תוצאה שאפשר למדוד?',h:'1 = בעיקר חשיפה · 10 = ברור מה מייצר פניות ומכירות.'},
    {k:'sales',d:'מכירות',type:'choice',q:'מה קורה בדרך כלל כשנכנסת פנייה טובה?',opts:['יש תהליך מסודר ומעקב עד סגירה','יש תהליך, אבל לא תמיד יש מעקב','כל אחד מטפל בפניות בדרך אחרת','חלק מהפניות פשוט נעלמות']},
    {k:'pr',d:'יחסי ציבור',type:'scale',q:'עד כמה העסק שלך מקבל חשיפה או המלצות שמחזקות את האמון בו?',h:'1 = כמעט אף פעם · 10 = נוכחות עקבית ואמינה.'},
    {k:'product',d:'דיוק המוצר',type:'scale',q:'עד כמה המוצר או השירות שלך פותר בעיה ברורה של קהל שמוכן לשלם עליה?',h:'1 = קשה להגדיר למי ולמה · 10 = צורך, קהל והצעה מדויקים.'},
    {k:'marketing',d:'שיווק',type:'choice',q:'מאיפה מגיעים רוב הלקוחות החדשים שלך כיום?',opts:['המלצות מפה לאוזן','פרסום ממומן','תוכן, קהילה וקבוצות','שיתופי פעולה וקשרים','אין מקור קבוע']},
    {k:'branding',d:'מיתוג',type:'scale',q:'עד כמה האתר, הוואטסאפ, ההצעות והפרסומים שלך משדרים אותה רמה?',h:'1 = כל מקום נראה אחרת · 10 = הכול מרגיש כמו מותג אחד.'},
    {k:'ads',d:'פרסום',type:'choice',q:'כשאתה מפרסם, עד כמה אתה יודע מי הקהל המדויק שאתה רוצה להביא?',opts:['אני יודע בדיוק','יש לי כיוון אבל הוא לא מספיק מדויק','אני פונה לכמה קהלים','אני פונה כמעט לכולם']},
    {k:'sales',d:'מכירות',type:'scale',q:'אם מחר ייכנסו פי שניים פניות — עד כמה העסק שלך ערוך להפוך אותן להכנסות?',h:'1 = אין יכולת לעקוב · 10 = תהליך מסודר שיכול להתמודד.'}
  ];
  let i=0,answers=[];
  const $=id=>document.getElementById(id);
  const track=(n,p)=>{try{if(typeof window.gtag==='function')window.gtag('event',n,p||{});}catch(e){}};
  function render(){const q=Q[i];$('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';$('count').textContent='שאלה '+(i+1)+' מתוך '+Q.length;$('pct').textContent=Math.round(i/Q.length*100)+'%';$('barfill').style.width=((i+1)/Q.length*100)+'%';$('domain').textContent=q.d;$('question').textContent=q.q;$('hint').textContent=q.h||'';$('scale').innerHTML='';
    if(q.type==='choice'){q.opts.forEach((t,j)=>{const b=document.createElement('button');b.type='button';b.className='choice';b.textContent=t;b.onclick=()=>pick(j+1);$('scale').appendChild(b);});}
    else {for(let n=1;n<=10;n++){const b=document.createElement('button');b.type='button';b.className='num'+(answers[i]===n?' sel':'');b.textContent=n;b.onclick=()=>pick(n);$('scale').appendChild(b);}}
    $('back').style.visibility=i?'visible':'hidden';window.scrollTo({top:0,behavior:'smooth'});
  }
  function pick(n){answers[i]=n;track('quiz_answer',{question_number:i+1,category:Q[i].k,score:n});if(i<Q.length-1){i++;render();}else finish();}
  function finish(){const sums={},counts={};Q.forEach((q,j)=>{sums[q.k]=(sums[q.k]||0)+(answers[j]||0);counts[q.k]=(counts[q.k]||0)+1});const pct={};Object.keys(C).forEach(k=>pct[k]=counts[k]?Math.round(sums[k]/(counts[k]*10)*100):0);const keys=Object.keys(C).sort((a,b)=>pct[a]-pct[b]);const gap=keys[0];$('quiz').style.display='none';$('result').style.display='block';$('rt').textContent=C[gap];$('rx').textContent='הדבר המרכזי שדורש תשומת לב';const order=['marketing','ads','pr','sales','branding','product'];order.forEach((k,n)=>{$('m'+(n+1)).style.width=pct[k]+'%';$('v'+(n+1)).textContent=pct[k]+'%';});$('rr').textContent='';$('rn').textContent='';$('nextText').textContent='';$('wa').href='https://wa.me/972553048242?text='+encodeURIComponent('היי יוסי, עשיתי את האבחון. הדבר המרכזי שעלה לי הוא '+C[gap]+'.');track('quiz_complete',{diagnosis:gap,questions_answered:Q.length});window.scrollTo({top:0,behavior:'smooth'});}
  window.start=function(){i=0;answers=[];track('quiz_start');render()};window.goBack=function(){if(i>0){i--;render()}};window.restart=function(){i=0;answers=[];$('quiz').style.display='none';$('result').style.display='none';$('hero').style.display='block'};track('quiz_page_open');
})();