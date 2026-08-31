export const patterns=[
{id:'acquisition',name:'Acquisition integration',maturity:'client-validated',signals:['acquisition','integration','merger','consolidat'],core:[['Transformation / Product Lead','Lead'],['Data / Integration Architect','Lead'],['Data Engineer','Senior']],flex:[['Process / Service Designer','Senior'],['Cloud Architect','Lead'],['AI Engineer','Senior']],scale:[['Integration Engineer','Senior'],['Data Engineer','Senior'],['Delivery Lead','Lead']]},
{id:'ai',name:'AI productionisation',maturity:'hypothesised',signals:['ai','llm','agent','automation'],core:[['AI Product Lead','Lead'],['Principal AI Engineer','Principal / Practice Lead'],['AI Engineer','Senior']],flex:[['Data Engineer','Senior'],['AI Infrastructure Engineer','Senior'],['Product Designer','Senior']],scale:[['AI Engineer','Senior'],['MLOps Engineer','Senior'],['Delivery Lead','Lead']]},
{id:'data',name:'Data and platform consolidation',maturity:'hypothesised',signals:['data','platform','warehouse','migration','consolidat'],core:[['Transformation / Product Lead','Lead'],['Data / Integration Architect','Lead'],['Data Engineer','Senior']],flex:[['Platform Engineer','Senior'],['Process / Service Designer','Senior'],['Cloud Architect','Lead']],scale:[['Data Engineer','Senior'],['Integration Engineer','Senior'],['Delivery Lead','Lead']]},
{id:'ops',name:'Operational technology transformation',maturity:'hypothesised',signals:['operations','efficiency','plant','capacity','workflow','process'],core:[['Transformation / Product Lead','Lead'],['Data / Integration Architect','Lead'],['Data Engineer','Senior']],flex:[['Process / Service Designer','Senior'],['Platform Engineer','Senior'],['AI Engineer','Senior']],scale:[['Integration Engineer','Senior'],['Data Engineer','Senior'],['Delivery Lead','Lead']]}
];

const text=i=>[i.trigger,i.facts,i.exposure,i.tension,i.hypothesis,i.unknown,i.mission,i.statement,i.outcome,i.technologies].filter(Boolean).join(' ').toLowerCase();
const roleObj=(tuple,tier)=>({role:tuple[0],seniority:tuple[1],tier,hierarchy:tier==='core'?'delivery spine':tier==='flex'?'specialist':'capacity',why:tier==='core'?'Required from the start to own or deliver a distinct part of the mission.':tier==='flex'?'Provides specialist capability without carrying it for the full engagement.':'Adds parallel delivery capacity once demand or proof justifies it.',activation:tier==='core'?'Active from mobilisation.':tier==='flex'?'Activate only when discovery or delivery evidence shows the specialist capability is needed.':'Activate after proof, or when workload requires parallel delivery.',condition:tier==='scale'?'Add after proof or when workload requires parallel delivery.':'Active when required.'});

export function architect(i={}){
  const t=text(i);
  const ranked=patterns.map(p=>({...p,score:p.signals.reduce((n,s)=>n+(t.includes(s)?1:0),0)})).sort((a,b)=>b.score-a.score);
  const p=ranked[0]||patterns[3];
  let core=p.core.slice(0,3);
  if(/strong internal|existing (data|engineering|technology|product) team|significant internal capability/i.test(t)) core=core.slice(0,2);
  const coreRoles=core.map(x=>roleObj(x,'core'));
  const flexRoles=p.flex.map(x=>roleObj(x,'flex'));
  const scaleRoles=p.scale.map(x=>roleObj(x,'scale'));
  const score=p.score||0;
  return {pattern:p.name,maturity:p.maturity,confidence:Math.min(92,58+score*8),core:coreRoles,flex:flexRoles,scale:scaleRoles,rationale:`Start with ${coreRoles.length} core roles around the mission. Keep specialist capability conditional and add scale only when evidence or workload requires it.`,shrink:'Remove a Core role only where the client can clearly retain that ownership or delivery capability internally.',expand:'Expand after proof, or when genuinely parallel workstreams create more demand than the Core can absorb.'};
}
