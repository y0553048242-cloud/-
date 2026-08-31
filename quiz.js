(function(){
const C={marketing:'שיווק',ads:'פרסום',pr:'יחסי ציבור',sales:'מכירות',branding:'מיתוג',product:'דיוק המוצר'};
const Q=[
{k:'marketing',d:'שיווק',type:'scale',q:'עד כמה ברור לך מה היעד השיווקי המרכזי של העסק שלך?',h:'1 = לא ברור · 10 = ברור ומסודר'},
{k:'branding',d:'מיתוג',type:'scale',q:'כשלקוח חדש פוגש את העסק שלך, עד כמה הוא מבין מיד למה לבחור דווקא בך?',h:'1 = הבידול לא ברור · 10 = הערך ברור מאוד'},
{k:'ads',d:'פרסום',type:'scale',q:'עד כמה הפרסום שלך מייצר פניות או מכירות שאפשר למדוד?',h:'1 = בעיקר חשיפה · 10 = תוצאה מדידה'},
{k:'sales',d:'מכירות',type:'choice',q:'מה קורה בדרך כלל כשנכנסת פנייה טובה?',opts:['יש תהליך מסודר ומעקב עד סגירה','יש תהליך, אבל המעקב חלקי','כל אחד מטפל בפניות בדרך אחרת','חלק מהפניות פשוט נעלמות']},
{k:'pr',d:'יחסי ציבור',type:'choice',q:'איזו נוכחות יש לעסק שלך מעבר לפרסום הישיר?',opts:['כתבות, המלצות ושיתופי פעולה באופן קבוע','יש מדי פעם חשיפה או המלצות','בעיקר המלצות אישיות','כמעט שאין חשיפה']},
{k:'product',d:'דיוק המוצר',type:'choice',q:'עד כמה ההצעה שלך מדויקת לבעיה שלקוחות באמת מוכנים לשלם כדי לפתור?',opts:['מדויקת מאוד','די מדויקת אבל אפשר לחדד','קשה לי להגדיר למי בדיוק','אני מציע כמה דברים לכמה קהלים']},
{k:'marketing',d:'שיווק',type:'choice',q:'מאיפה מגיעים רוב הלקוחות החדשים שלך?',opts:['המלצות','פרסום','תוכן וקהילה','שיתופי פעולה','אין מקור קבוע']},
{k:'branding',d:'מיתוג',type:'scale',q:'עד כמה האתר, הוואטסאפ, ההצעות והפרסומים משדרים אותה רמה?',h:'1 = לא אחיד · 10 = מותג ברור ואחיד'},
{k:'ads',d:'פרסום',type:'choice',q:'כשאתה מפרסם, עד כמה הקהל שאתה מכוון אליו מוגדר?',opts:['מדויק מאוד','יש כיוון אבל אפשר לדייק','פונה לכמה קהלים','כמעט לכולם']},
{k:'sales',d:'מכירות',type:'scale',q:'אם מחר ייכנסו פי שניים פניות, עד כמה העסק ערוך להפוך אותן להכנסות?',h:'1 = לא ערוך · 10 = תהליך מסודר'}
];
let i=0,answers=[];const $=id=>document.getElementById(id);const track=(n,p)=>{try{if(typeof window.gtag==='function')window.gtag('event',n,p||{})}catch(e){}};
function enhanceUI(){
 const head=document.querySelector('.head');const img=document.querySelector('.head .logo');
 if(img){img.src='rot-symbol.svg?v=9';img.removeAttribute('srcset');img.removeAttribute('style');img.alt='רו';img.width=92;img.height=42;img.style.cssText='width:92px;height:42px;object-fit:contain;object-position:center;display:block';}
 if(head){head.style.height='62px';head.style.padding='7px 16px';}
 const hero=document.querySelector('.hero');if(hero){const h=hero.querySelector('h1');const p=hero.querySelector('p');const e=hero.querySelector('.eyebrow');if(e)e.textContent='אבחון עסקי קצר';if(h)h.innerHTML='מה חסר לעסק <span>שלך?</span>';if(p)p.textContent='10 שאלות קצרות. בסוף תקבל תמונה ברורה של הצורך המרכזי בעסק שלך.';}
 const st=document.createElement('style');st.textContent=`
 .choice{display:block;width:100%;text-align:right;border:1px solid #deded9;background:#fff;border-radius:14px;padding:16px 18px;margin:9px 0;font-size:15px;line-height:1.45;font-weight:700;cursor:pointer;transition:.15s}
 .choice:hover,.choice.sel{background:#111;color:#fff;border-color:#111;transform:translateY(-1px)}
 .scale{direction:ltr}
 #result .primary-need{display:flex;align-items:center;justify-content:center;gap:14px;border:1px solid #e1e1de;background:#111;color:#fff;border-radius:22px;padding:22px 18px;margin:14px 0 20px;min-height:120px}
 #result .primary-need .need-icon{font-size:52px;line-height:1}
 #result .primary-need .need-copy{text-align:right}
 #result .primary-need small{display:block;font-size:12px;color:#d8d8d5;margin-bottom:5px}
 #result .primary-need strong{display:block;font-size:29px;line-height:1.1}
 #result .primary-need em{display:block;width:9px;height:9px;background:#e12636;border-radius:50%;margin-top:9px}
 #result .map{background:#fff}
 #result .metric .track{background:#eeeeeb}
 @media(max-width:560px){.head{height:62px}.head .logo{width:86px!important;height:40px!important}.hero{padding-top:28px}.hero h1{font-size:33px}.hero p{font-size:15px}.choice{padding:15px 16px}.num{padding:10px 0}}
 `;document.head.appendChild(st);
 const result=$('result');if(result&&!result.querySelector('.primary-need')){const box=document.createElement('div');box.className='primary-need';box.id='primaryNeed';box.innerHTML='<div class="need-icon" id="needIcon">🎯</div><div class="need-copy"><small>הצורך המרכזי בעסק</small><strong id="needLabel">—</strong><em></em></div>';const anchor=result.querySelector('.result h2')||result.firstElementChild;result.insertBefore(box,anchor||null);}
 if(result){const map=result.querySelector('.map');if(map&&!$('m6')){const row=document.createElement('div');row.className='metric';row.innerHTML='<span>דיוק המוצר</span><div class="track"><div class="fill" id="m6"></div></div><b id="v6">0%</b>';map.appendChild(row);}}
 const icons={marketing:'📈',ads:'📣',pr:'📰',sales:'🤝',branding:'◆',product:'🎯'};window.__needIcon=icons;
}
function render(){enhanceUI();const q=Q[i];$('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';$('count').textContent=`שאלה ${i+1} מתוך ${Q.length}`;$('pct').textContent=Math.round(i/Q.length*100)+'%';$('barfill').style.width=((i+1)/Q.length*100)+'%';$('domain').textContent=q.d;$('question').textContent=q.q;$('hint').textContent=q.h||'';$('scale').innerHTML='';if(q.type==='choice'){q.opts.forEach((t,j)=>{const b=document.createElement('button');b.type='button';b.className='choice'+(answers[i]===j+1?' sel':'');b.textContent=t;b.onclick=()=>pick(j+1);$('scale').appendChild(b)})}else{for(let n=1;n<=10;n++){const b=document.createElement('button');b.type='button';b.className='num'+(answers[i]===n?' sel':'');b.textContent=n;b.onclick=()=>pick(n);$('scale').appendChild(b)}}$('back').style.visibility=i?'visible':'hidden';window.scrollTo({top:0,behavior:'smooth'})}
function pick(n){answers[i]=n;track('quiz_answer',{question_number:i+1,category:Q[i].k,score:n,type:Q[i].type});if(i<Q.length-1){i++;render()}else finish()}
function finish(){const s={},c={};Q.forEach((q,j)=>{const n=answers[j]||0;s[q.k]=(s[q.k]||0)+n;c[q.k]=(c[q.k]||0)+1});const pct={};Object.keys(C).forEach(k=>pct[k]=c[k]?Math.round(s[k]/(c[k]*10)*100):0);const keys=Object.keys(C).sort((a,b)=>pct[a]-pct[b]);const gap=keys[0];const positive={marketing:'חיזוק השיווק יכול לתת לך יותר כיוון, מיקוד וצמיחה',ads:'דיוק הפרסום יכול לתת לך יותר פניות איכותיות ותוצאה מדידה',pr:'חיזוק יחסי הציבור יכול לתת לך יותר חשיפה, אמון ונוכחות',sales:'חיזוק המכירות יכול לתת לך יותר סגירות ויותר הכנסה מכל פנייה',branding:'חיזוק המיתוג יכול לתת לך יותר בידול, אמון וזכירות',product:'דיוק המוצר יכול לתת לך הצעה חדה יותר ולקוחות מדויקים יותר'};enhanceUI();$('quiz').style.display='none';$('result').style.display='block';$('rt').textContent=positive[gap];$('rx').textContent='זהו התחום שבו שיפור ממוקד יכול לתת לעסק שלך את הקפיצה הגדולה ביותר עכשיו.';if($('needLabel'))$('needLabel').textContent=C[gap];if($('needIcon'))$('needIcon').textContent=(window.__needIcon||{})[gap]||'●';const order=['marketing','ads','pr','sales','branding','product'];order.forEach((k,n)=>{if($('m'+(n+1))){$('m'+(n+1)).style.width=pct[k]+'%';$('v'+(n+1)).textContent=pct[k]+'%'}});$('rr').textContent='';$('rn').textContent='';$('nextText').textContent='';$('wa').href='https://wa.me/972553048242?text='+encodeURIComponent('היי יוסי, השלמתי את האבחון. הצורך המרכזי שעלה לי הוא '+C[gap]+'.');track('quiz_complete',{diagnosis:gap,questions_answered:Q.length});window.scrollTo({top:0,behavior:'smooth'})}
window.start=()=>{i=0;answers=[];track('quiz_start');render()};window.goBack=()=>{if(i>0){i--;render()}};window.restart=()=>{i=0;answers=[];$('quiz').style.display='none';$('result').style.display='none';$('hero').style.display='block';enhanceUI()};enhanceUI();track('quiz_page_open');
})();