let totalScore = 0;
const completed = new Set();

function selectedValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
}
function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value).sort();
}
function sameArray(a,b) { return a.length === b.length && a.every((v,i) => v === b[i]); }
function normalize(s) { return (s || '').toLowerCase().replace(/[ä]/g,'ae').replace(/[ö]/g,'oe').replace(/[ü]/g,'ue').replace(/ß/g,'ss').trim(); }
function textContains(id, words) { const value=normalize(document.getElementById(id).value); return words.some(word => value.includes(word)); }
function finishMission(id, score, max, message) {
  if (!completed.has(id)) { totalScore += score; completed.add(id); }
  const box=document.getElementById(`feedback-${id}`);
  box.className=`feedback-box show ${score===max ? 'good':'partial'}`;
  box.innerHTML=`<strong>${score===max ? 'Sehr gut!' : 'Überprüfe deine Antworten noch einmal.'}</strong> Du erhältst <strong>${score} / ${max} XP</strong>.<br>${message}`;
  document.getElementById('total-score').textContent=totalScore;
  document.getElementById('final-score').textContent=`${totalScore} / 16 XP`;
  document.getElementById('progress-label').textContent=`${completed.size} von 4 Missionen geprüft`;
  document.getElementById('progress-fill').style.width=`${completed.size * 25}%`;
}
function checkCoventry() {
  let score=0;
  if(selectedValue('coventry-1')==='b') score++;
  if(sameArray(selectedValues('coventry-2'),['infrastruktur','moral'])) score+=2;
  if(textContains('coventry-text',['zivil','bevoelker','stadt','menschen'])) score++;
  finishMission('coventry',score,4,'<strong>Lösung:</strong> Coventry steht für Luftkrieg gegen Städte und Zivilbevölkerung. Luftangriffe sollten Infrastruktur schwächen und die Bevölkerung einschüchtern.');
}
function checkStalingrad() {
  let score=0;
  if(selectedValue('stalingrad-1')==='b') score++;
  if(document.getElementById('stalingrad-order-1').value==='2' && document.getElementById('stalingrad-order-2').value==='3' && document.getElementById('stalingrad-order-3').value==='1') score+=2;
  if(textContains('stalingrad-text',['soldat','zivil','kriegsgefangen','bevoelker'])) score++;
  finishMission('stalingrad',score,4,'<strong>Lösung:</strong> Stalingrad gilt als Kriegswende, weil Deutschland die militärische Initiative im Osten verlor. Reihenfolge: Angriff – Einkesselung – Kapitulation.');
}
function checkLeningrad() {
  let score=0;
  if(selectedValue('leningrad-1')==='a') score++;
  if(sameArray(selectedValues('leningrad-2'),['schwaechen','versorgung'])) score+=2;
  if(textContains('leningrad-text',['zivil','bevoelker','menschen','stadt'])) score++;
  finishMission('leningrad',score,4,'<strong>Lösung:</strong> Leningrad steht für Belagerungskrieg. Die Versorgung wurde gezielt eingeschränkt, um die Zivilbevölkerung zu schwächen.');
}
function checkHiroshima() {
  let score=0;
  if(selectedValue('hiroshima-1')==='a') score++;
  if(sameArray(selectedValues('hiroshima-2'),['tod','zerstoerung'])) score+=2;
  if(textContains('hiroshima-text',['zerstoer','atom','strahlung','stadt','tod','langfrist'])) score++;
  finishMission('hiroshima',score,4,'<strong>Lösung:</strong> Hiroshima steht für Atomkrieg: Eine Bombe zerstörte große Teile einer Stadt, tötete sehr viele Menschen und hatte langfristige Strahlungsfolgen.');
}
function showModelAnswer() {
  const box=document.getElementById('feedback-final');
  box.className='feedback-box show good';
  box.innerHTML='<strong>Musterlösung:</strong> Der Zweite Weltkrieg war nicht nur ein Krieg zwischen Armeen. Coventry zeigt, dass Luftangriffe Städte und ihre Zivilbevölkerung trafen. Stalingrad steht für extremen Frontkrieg und hohe Verluste. Leningrad macht deutlich, dass die gezielte Aushungerung der Zivilbevölkerung als Kriegsmittel eingesetzt wurde. Hiroshima zeigt, dass Atomwaffen ganze Städte zerstören und langfristige Folgen für Menschen haben konnten.';
}