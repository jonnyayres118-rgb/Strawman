const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const list=xs=>Array.isArray(xs)&&xs.length?`<ul>${xs.map(x=>`<li>${esc(typeof x==='string'?x:JSON.stringify(x))}</li>`).join('')}</ul>`:'';
const money=n=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(Number(n||0));
function sectionHtml(s){
 if(s.type==='moment')return `<h2>${esc(s.title)}</h2><h3>Observable change</h3><p>${esc(s.trigger)}</p><h3>Evidence</h3>${list(s.facts)}<h3>Hypothesis</h3><p>${esc(s.tension)}</p><p>${esc(s.exposure)}</p><h3>Critical unknown</h3><p>${esc(s.unknown)}</p><p>${esc(s.question)}</p>`;
 if(s.type==='mission')return `<h2>${esc(s.title)}</h2><blockquote>${esc(s.statement)}</blockquote><h3>What success could look like</h3>${list(s.outcomes)}${s.constraints?.length?'<h3>Constraints</h3>'+list(s.constraints):''}`;
 if(s.type==='team')return `<h2>${esc(s.title)}</h2>${['core','flex','scale'].map(t=>`<h3>${t[0].toUpperCase()+t.slice(1)}</h3>${(s.roles||[]).filter(r=>r.tier===t).map(r=>`<p><b>${esc(r.count)}x ${esc(r.role)}</b> (${esc(r.seniority)})<br>${esc(r.why)}<br><i>${esc(r.activation)}</i></p>`).join('')}`).join('')}<h3>Client retains</h3>${list(s.clientRetains)}<h3>Elastic provides</h3>${list(s.elasticProvides)}`;
 if(s.type==='model')return `<h2>${esc(s.title)}</h2><table><tr><td><b>Core</b><br>Continuity, trust, ownership</td><td><b>Flex</b><br>Specialist capability when required</td><td><b>Scale</b><br>Additional capacity after proof</td><td><b>Operate</b><br>Talent and capability management</td></tr></table><p><b>${esc(s.statement)}</b></p>`;
 if(s.title==='Capacity Timeline')return `<h2>${esc(s.title)}</h2>${(s.phases||[]).map(p=>`<h3>${esc(p.name)} · ${esc(p.months)}</h3><p>${esc(p.purpose)}</p>`).join('')}`;
 if(s.type==='options')return `<h2>${esc(s.title)}</h2><table><tr>${(s.options||[]).map(o=>`<td><b>${esc(o.name)}</b><br>${esc(o.people)} people<br>${o.monthlyInvestment?money(o.monthlyInvestment)+'/month':'Indicative'}<br>${(o.roles||[]).map(r=>`${esc(r.count)}x ${esc(r.role)}`).join('<br>')}</td>`).join('')}</tr></table>`;
 if(s.type==='investment')return `<h2>${esc(s.title)}</h2><p style="font-size:24px"><b>${money(s.monthlyInvestment)} / month</b></p>${list(s.included)}<p>Annualised: ${money(s.annualisedInvestment)}</p><p>Initial commitment: ${esc(s.duration||'To be confirmed')}</p>`;
 if(s.type==='launch')return `<h2>${esc(s.title)}</h2>${(s.stages||[]).map(x=>`<h3>${esc(x.number)} ${esc(x.name)}</h3><p>${esc(x.text)}</p>`).join('')}`;
 if(s.type==='next')return `<h2>${esc(s.title)}</h2>${(s.steps||[]).map(x=>`<p><b>${esc(x.number)} ${esc(x.name)}</b></p>`).join('')}<p><b>Indicative mobilisation: ${esc(s.mobilisation)}</b></p>${s.assumptions?.length?'<h3>Assumptions</h3>'+list(s.assumptions):''}`;
 return `<h2>${esc(s.title||'')}</h2>`;
}
export function buildClientHtml(model){
 const body=(model.sections||[]).map(sectionHtml).join('<hr>');
 const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(model.cover?.title||'Elastic Labs Proposal')}</title><style>body{font-family:Arial,sans-serif;color:#17171b;max-width:820px;margin:40px auto;line-height:1.55}h1,h2,h3{color:#17171b}h2{border-bottom:2px solid #17171b;padding-bottom:8px;margin-top:38px}blockquote{border-left:4px solid #ff2d6b;margin:20px 0;padding:14px 18px;background:#f7f5f2;font-size:20px;font-weight:700}table{width:100%;border-collapse:collapse}td{border:1px solid #ddd;padding:12px;vertical-align:top}hr{border:0;border-top:1px solid #ddd;margin:34px 0}</style></head><body><h1>${esc(model.cover?.title||'Capability Proposal')}</h1><p><b>${esc(model.cover?.client||'')}</b><br>${esc(model.cover?.subtitle||'')}</p>${body}</body></html>`;
 const forbidden=['buyPerDay','marginPct','BUY/day','GP/day','GM %','markup','bench assumption'];
 for(const term of forbidden)if(html.toLowerCase().includes(term.toLowerCase()))throw new Error(`Client export contains internal field: ${term}`);
 return html;
}
const csvCell=v=>`"${String(v??'').replace(/"/g,'""')}"`;
export function buildInternalCsv(economics){
 const rows=[['Role','Tier','FTE','BUY/day','SELL/day','GP/day','GM %']];
 for(const x of economics.rows||[]){const buy=Number(x.economics?.buyPerDay||0),sell=Number(x.economics?.sellPerDay||0);rows.push([x.role?.role,x.role?.tier,x.role?.count,Math.round(buy),Math.round(sell),Math.round(sell-buy),Number(x.economics?.marginPct||0).toFixed(1)])}
 return rows.map(r=>r.map(csvCell).join(',')).join('\n');
}
