"use strict";
// 単一JSアプリ。バックエンド・外部サービスは不要です。
(function () {
  const DOMAINS = ['', 'セキュリティ設計', 'レジリエンス設計', '高パフォーマンス設計', 'コスト最適化設計'];
  const STORAGE_KEY = 'saa-enshushitsu-progress-v2';
  const OLD_KEY = 'saa-enshushitsu-history-v1';
  const SOURCE = Array.isArray(window.SAA_QUESTION_BANKS) ? window.SAA_QUESTION_BANKS : [];
  const ids = new Set();
  const ALL_Q = SOURCE.filter(q => {
    if (!q || !Number.isInteger(q.id) || ids.has(q.id)) { console.warn('Duplicate/invalid question:', q && q.id); return false; }
    const keys = q.choices?.map(o=>o.key);
    if (!Array.isArray(keys) || keys.length < 4 || !(q.correct||[]).every(k => keys.includes(k))) { console.warn('Invalid question:',q.id); return false; }
    ids.add(q.id); return true;
  });
  const qById = new Map(ALL_Q.map(q=>[q.id,q]));
  const el = id => document.getElementById(id);
  const readJSON = key => { try {const x=JSON.parse(localStorage.getItem(key)||'null');return x && typeof x==='object' ? x : null;}catch{return null;} };
  const legacy = readJSON(OLD_KEY);
  const loaded = readJSON(STORAGE_KEY);
  let history = (loaded?.history && typeof loaded.history==='object') ? loaded.history : (legacy || {});
  let queue = [], index = 0, selected = new Set(), graded = false, sessionCorrect = 0, sessionMode = 'practice';
  function save() {try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({version:2,history,savedAt:new Date().toISOString()}));}catch(e){console.warn('履歴を保存できません',e);} }
  if (!loaded && legacy) save();
  const shuffle = arr => {const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const shown = name => {
    ['home','quiz','results'].forEach(id => el(id).classList.toggle('hide',id!==name));
    el('quit').classList.toggle('hide',name!=='quiz');
    window.scrollTo({top:0,behavior:'auto'});
  };
  function stats() {
    const relevant = ALL_Q.filter(q=>history[q.id]?.attempts>0);
    const totalAttempts = relevant.reduce((acc,q)=>acc+ (Number(history[q.id].attempts)||0),0);
    const totalRight = relevant.reduce((acc,q)=>acc+(Number(history[q.id].correct)||0),0);
    const wrong = relevant.filter(q=>history[q.id]?.last===false);
    el('bank-total').textContent=ALL_Q.length;
    el('done').innerHTML=`${relevant.length} <small>問</small>`;
    el('accuracy').textContent = totalAttempts ? `${Math.round(100*totalRight/totalAttempts)}%` : '—';
    el('wrong').innerHTML=`${wrong.length} <small>問</small>`;
    el('wrongButton').textContent=`${wrong.length}問`;
    el('domain-stats').replaceChildren();
    for(let d=1;d<=4;d++){
      const total=ALL_Q.filter(q=>q.domain===d).length, done=relevant.filter(q=>q.domain===d).length;
      const div=document.createElement('div');div.className='domain-item';
      const head=document.createElement('div');head.className='domain-head';
      const t=document.createElement('span');t.textContent=DOMAINS[d];
      const n=document.createElement('b');n.textContent=`${done} / ${total}`;
      head.append(t,n);
      const bar=document.createElement('div');bar.className='mini-track';
      const fill=document.createElement('span');fill.style.width=total?`${100*done/total}%`:'0%';
      bar.append(fill);div.append(head,bar);el('domain-stats').append(div);
    }
    updateEligible();
  }
  function getFiltered() {
    const domain=Number(el('domain').value),diff=Number(el('difficulty').value),filter=el('filter').value;
    return ALL_Q.filter(q=>(!domain||q.domain===domain)&&(!diff||q.diff===diff)&&(filter!=='new'||!history[q.id]?.attempts));
  }
  function updateEligible() { const pool=getFiltered().length; el('eligible').textContent=`この条件で ${pool} 問が対象`; }
  function begin(questions,mode) {
    if(!questions.length){alert('対象の問題がありません。条件を変更してください。');return;}
    queue=shuffle(questions);index=0;selected=new Set();graded=false;sessionCorrect=0;sessionMode=mode;
    shown('quiz');render();
  }
  function render() {
    if(index>=queue.length){finish();return;}
    const q=queue[index];selected=new Set();graded=false;
    el('progress').textContent=`${index+1} / ${queue.length} 問`;
    el('progressBar').style.width=`${Math.round((index)/queue.length*100)}%`;
    el('serial').textContent=String(index+1).padStart(2,'0');
    el('tags').textContent=`${DOMAINS[q.domain]} · 難易度${q.diff}`;
    el('stem').textContent=q.text;
    el('feedback').replaceChildren();el('feedback').classList.add('hide');
    el('next').classList.add('hide');el('submit').classList.toggle('hide',q.type!=='multi');
    el('multihint').classList.toggle('hide',q.type!=='multi');
    el('submit').disabled=true;
    const c=el('choices');c.replaceChildren();
    q.choices.forEach(choice=>{
      const btn=document.createElement('button');btn.className='choice';btn.type='button';btn.dataset.key=choice.key;btn.setAttribute('aria-pressed','false');
      const key=document.createElement('span');key.className='choice-key';key.textContent=choice.key;
      const t=document.createElement('span');t.textContent=choice.text;btn.append(key,t);
      btn.onclick=()=>{
        if(graded)return;
        if(q.type==='single'){selected=new Set([choice.key]);grade();}
        else{selected.has(choice.key)?selected.delete(choice.key):selected.add(choice.key);paint();}
      };
      c.append(btn);
    });
    paint();
  }
  function paint(){
    const q=queue[index];
    el('choices').querySelectorAll('button').forEach(b=>{
      const k=b.dataset.key;
      b.classList.toggle('selected',selected.has(k));
      b.classList.toggle('correct-choice',graded&&q.correct.includes(k));
      b.classList.toggle('wrong-choice',graded&&selected.has(k)&&!q.correct.includes(k));
      b.setAttribute('aria-pressed',selected.has(k)?'true':'false');b.disabled=graded;
    });
    el('submit').disabled=graded||selected.size===0;
  }
  function grade(){
    if(graded||selected.size===0)return;
    const q=queue[index];const ok=selected.size===q.correct.length&&[...selected].every(k=>q.correct.includes(k));
    graded=true;sessionCorrect+=ok?1:0;
    const h=history[q.id]||{attempts:0,correct:0,streak:0};
    history[q.id]={attempts:(Number(h.attempts)||0)+1,correct:(Number(h.correct)||0)+(ok?1:0),last:ok,streak:ok?(Number(h.streak)||0)+1:0,lastAt:new Date().toISOString()};
    save();paint();
    el('submit').classList.add('hide');
    const box=el('feedback');box.replaceChildren();
    const title=document.createElement('h3');title.className=ok?'good':'bad';title.textContent=ok?'✓ 正解！':'✕ 不正解';box.append(title);
    const answer=document.createElement('p');answer.className='answer';answer.textContent=`正解：${q.correct.join('・')}`;box.append(answer);
    const desc=document.createElement('p');desc.textContent=q.explanation;box.append(desc);
    const head=document.createElement('h4');head.textContent='すべての選択肢の解説';box.append(head);
    q.choices.forEach(o=>{
      const p=document.createElement('p');p.className='why';
      p.textContent=`${o.key}  ${q.correct.includes(o.key)?'✓ 正しい選択肢です。 '+q.explanation:(q.wrong_reasons?.[o.key]||'条件を満たしません。')}`;
      box.append(p);
    });
    box.classList.remove('hide');el('next').classList.remove('hide');
  }
  function finish(){
    const total=queue.length,score=Math.round(sessionCorrect/total*100);
    el('resultScore').textContent=`${sessionCorrect} / ${total}`;
    el('resultText').textContent=`今回の正答率は ${score}% です。間違えた問題を繰り返して定着させよう。`;
    stats();shown('results');
  }
  el('start').onclick=()=>{let pool=getFiltered();if(el('count').value!=='all')pool=shuffle(pool).slice(0,Number(el('count').value));begin(pool,'practice');};
  el('submit').onclick=grade;
  el('next').onclick=()=>{index++;render();};
  el('quit').onclick=()=>{stats();shown('home');};
  el('brand').onclick=()=>{stats();shown('home');};
  el('goHome').onclick=()=>{stats();shown('home');};
  el('reviewWrong').onclick=()=>begin(ALL_Q.filter(q=>history[q.id]?.last===false),'wrong');
  el('reviewDone').onclick=()=>begin(ALL_Q.filter(q=>history[q.id]?.attempts>0),'done');
  el('doWrong').onclick=()=>begin(ALL_Q.filter(q=>history[q.id]?.last===false),'wrong');
  ['domain','difficulty','count','filter'].forEach(id=>el(id).addEventListener('change',updateEligible));
  el('export').onclick=()=>{
    const body=JSON.stringify({schema:'saa-enshushitsu-progress',version:2,history,exportedAt:new Date().toISOString()},null,2);
    const url=URL.createObjectURL(new Blob([body],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download=`saa_learning_history_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  el('import').addEventListener('change',async ev=>{
    const f=ev.target.files?.[0];if(!f)return;
    try{
      const data=JSON.parse(await f.text());
      if(data.schema!=='saa-enshushitsu-progress'||data.version!==2||!data.history||typeof data.history!=='object'||Array.isArray(data.history))throw Error('形式が異なります');
      if(!confirm('読み込んだ履歴で現在の学習履歴を置き換えます。よろしいですか？'))return;
      history=data.history;save();stats();alert('学習履歴を読み込みました。');
    }catch(e){alert(`読み込めませんでした：${e.message}`);}finally{ev.target.value='';}
  });
  stats();shown('home');
})();
