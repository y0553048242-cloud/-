(function(){
'use strict';
const Q=[
 {k:'marketing',d:'שיווק',type:'scale',q:'עד כמה ברור לך מה היעד השיווקי המרכזי של העסק שלך?',h:'1 = לא ברור · 10 = ברור ומסודר'},
 {k:'branding',d:'מיתוג ובידול',type:'scale',q:'כשלקוח חדש פוגש את העסק שלך, עד כמה הוא מבין מיד למה לבחור דווקא בך?',h:'1 = הבידול לא ברור · 10 = הערך ברור מאוד'},
 {k:'marketing',d:'שיווק',type:'scale',q:'עד כמה הפרסום שלך מייצר פניות או מכירות שאפשר למדוד?',h:'1 = בעיקר חשיפה · 10 = תוצאה מדידה'},
 {k:'sales',d:'מכירות',type:'choice',q:'מה קורה בדרך כלל כשנכנסת פנייה טובה?',opts:['יש תהליך מסודר ומעקב עד סגירה','יש תהליך, אבל המעקב חלקי','כל אחד מטפל בפניות בדרך אחרת','חלק מהפניות פשוט נעלמות']},
 {k:'pr',d:'יחסי ציבור',type:'choice',q:'איזו נוכחות יש לעסק שלך מעבר לפרסום הישיר?',opts:['כתבות, המלצות ושיתופי פעולה באופן קבוע','יש מדי פעם חשיפה או המלצות','בעיקר המלצות אישיות','כמעט שאין חשיפה']},
 {k:'branding',d:'מיתוג ובידול',type:'choice',q:'עד כמה ההצעה שלך מדויקת וברורה ללקוח הנכון?',opts:['מדויקת וברורה מאוד','די ברורה אבל אפשר לחדד','קשה לי להגדיר למי בדיוק','אני מציע כמה דברים לכמה קהלים']},
 {k:'marketing',d:'שיווק',type:'choice',q:'מאיפה מגיעים רוב הלקוחות החדשים שלך?',opts:['המלצות','פרסום','תוכן וקהילה','שיתופי פעולה','אין מקור קבוע']},
 {k:'branding',d:'מיתוג ובידול',type:'scale',q:'עד כמה האתר, הוואטסאפ, ההצעות והפרסומים משדרים אותה רמה?',h:'1 = לא אחיד · 10 = מותג ברור ואחיד'},
 {k:'marketing',d:'שיווק',type:'choice',q:'כשאתה מפרסם, עד כמה הקהל שאתה מכוון אליו מוגדר?',opts:['מדויק מאוד','יש כיוון אבל אפשר לדייק','פונה לכמה קהלים','כמעט לכולם']},
 {k:'sales',d:'מכירות',type:'scale',q:'אם מחר ייכנסו פי שניים פניות, עד כמה העסק ערוך להפוך אותן להכנסות?',h:'1 = לא ערוך · 10 = תהליך מסודר'}
];
const names={marketing:'שיווק חד וברור',sales:'מכירות מסודרות',pr:'יחסי ציבור חזקים',branding:'מיתוג ובידול'};
const icons={marketing:'📈',sales:'💰',pr:'📣',branding:'✨'};
let i=0,answers=[];
const $=id=>document.getElementById(id);
function start(){i=0;answers=[];render();}
function render(){
 $('hero').style.display='none';$('result').style.display='none';$('quiz').style.display='block';
 const q=Q[i];$('count').textContent='שאלה '+(i+1)+' מתוך '+Q.length;$('pct').textContent=Math.round(i/Q.length*100)+'%';$('barfill').style.width=((i+1)/Q.length*100)+'%';$('domain').textContent=q.d;$('question').textContent=q.q;$('hint').textContent=q.h||'';$('scale').innerHTML='';
 if(q.type==='choice') q.opts.forEach((t,j)=>{const b=document.createElement('button');b.type='button';b.className='choice'+(answers[i]===j+1?' sel':'');b.textContent=t;b.onclick=()=>pick(j+1);$('scale').appendChild(b)});
 else for(let n=1;n<=10;n++){const b=document.createElement('button');b.type='button';b.className='num'+(answers[i]===n?' sel':'');b.textContent=n;b.onclick=()=>pick(n);$('scale').appendChild(b)}
 $('back').style.visibility=i?'visible':'hidden';window.scrollTo(0,0);
}
function pick(n){answers[i]=n;if(i<Q.length-1){i++;render();}else finish();}
function finish(){
 const s={marketing:0,sales:0,pr:0,branding:0},c={marketing:0,sales:0,pr:0,branding:0};
 Q.forEach((q,j)=>{let n=answers[j]||1;let score=q.type==='choice'?Math.round(n/q.opts.length*10):n;s[q.k]+=score;c[q.k]++;});
 const pct={};Object.keys(s).forEach(k=>pct[k]=Math.round(s[k]/(c[k]*10)*100));
 const gap=Object.keys(s).sort((a,b)=>pct[a]-pct[b])[0];
 $('quiz').style.display='none';$('result').style.display='block';
 $('rt').textContent='הדבר שהכי חשוב לעסק שלך הוא '+names[gap];
 $('rx').textContent='זהו התחום שכדאי לחזק עכשיו כדי ליצור עסק ברור, חזק וצומח יותר.';
 const map=$('result').querySelector('.map');
 map.innerHTML='<h3>מפת 4 התחומים</h3>'+['marketing','sales','pr','branding'].map(k=>'<div class="metric"><span class="metric-icon">'+icons[k]+'</span><span>'+({marketing:'שיווק',sales:'מכירות',pr:'יחסי ציבור',branding:'מיתוג ובידול'}[k])+'</span><div class="track"><div class="fill" style="width:'+pct[k]+'%"></div></div><b>'+pct[k]+'%</b></div>').join('');
 $('rr').textContent='חוזקות: '+Object.keys(s).filter(k=>pct[k]>=70).map(k=>({marketing:'שיווק',sales:'מכירות',pr:'יחסי ציבור',branding:'מיתוג ובידול'}[k])).join(', ');
 $('rn').textContent='התחום המרכזי לחיזוק: '+names[gap];
 $('nextText').textContent='לבנות מהלך ממוקד ב'+names[gap]+' ולהפוך אותו למנוע צמיחה ברור.';
 $('wa').href='https://wa.me/972553048242?text='+encodeURIComponent('היי יוסי, השלמתי את האבחון. התחום המרכזי שעלה לי הוא '+names[gap]+'.');
 window.scrollTo(0,0);
}
function back(){if(i>0){i--;render();}}
function restart(){i=0;answers=[];$('quiz').style.display='none';$('result').style.display='none';$('hero').style.display='block';}
window.start=start;window.goBack=back;window.restart=restart;
window.addEventListener('error',function(e){console.error('Quiz error:',e.message);});
})();