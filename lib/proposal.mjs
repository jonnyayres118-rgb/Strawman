const clean=s=>String(s??'').replace(/—/g,'-').replace(/–/g,'-');
const arr=v=>Array.isArray(v)?v.filter(Boolean).map(clean):String(v||'').split(/\n|;/).map(x=>x.trim()).filter(Boolean).map(clean);
const scenarioSummary=(name,roles,monthly)=>({name,people:(roles||[]).reduce((s,r)=>s+Number(r.count||0),0),monthlyInvestment:monthly,roles:(roles||[]).map(r=>({role:clean(r.role),seniority:clean(r.seniority),count:Number(r.count||0)}))});
export function buildProposalModel(o,econ,architectResult={}){
  const cl=o.client||{},x=o.outsideIn||{},m=o.mission||{},roles=o.roles||[];
  const timeline=(o.phases||[]).filter(p=>p.roleIds?.length||p.roles?.length).length?{title:'Capacity Timeline',phases:o.phases}:null;
  const recommended=o.scenarios?.recommended||roles;
  const core=o.scenarios?.core||roles.filter(r=>r.tier==='core');
  const scale=o.scenarios?.scale||roles;
  const sections=[
    {type:'moment',title:'The Moment',trigger:clean(x.trigger),facts:arr(x.facts),exposure:clean(x.exposure),tension:clean(x.tension),existingCapability:clean(x.existingCapability),unknown:clean(x.unknown),question:clean(x.question)},
    {type:'mission',title:'The Mission',statement:clean(m.statement||m.desiredOutcome),outcomes:arr(m.successOutcomes),constraints:arr(m.constraints),assumptions:arr(m.assumptions)},
    {type:'team',title:'A Team Built Around the Mission',roles:roles.map(r=>({role:clean(r.role),seniority:clean(r.seniority),tier:r.tier||'core',count:Number(r.count||0),why:clean(r.why),activation:clean(r.activation)})),clientRetains:arr(m.clientRetains),elasticProvides:arr(m.elasticProvides),rationale:clean(architectResult.rationale)},
    {type:'model',title:'The Elastic Operating Model',statement:'Knowledge stays. Capacity changes.'},
    ...(timeline?[timeline]:[]),
    {type:'options',title:'Team Options',options:[scenarioSummary('Core',core,Number(o.scenarioEconomics?.core?.sellMonthly||0)),scenarioSummary('Recommended',recommended,Number(econ.sellMonthly||0)),scenarioSummary('Scale',scale,Number(o.scenarioEconomics?.scale?.sellMonthly||0))]},
    {type:'investment',title:'Investment',monthlyInvestment:Number(econ.sellMonthly||0),annualisedInvestment:Number(econ.sellAnnual||0),teamSize:Number(econ.headcount||0),duration:clean(cl.duration),included:['Embedded specialist capability','Elastic Labs capability management','Specialist Flex access','Onboarding and integration','Performance oversight','Workforce and capability planning']},
    {type:'launch',title:'The Elastic Launch',stages:[['01','Understand','Validate roadmap, environment, capability and constraints.'],['02','Design','Finalise Core, Flex, Scale and commercials.'],['03','Integrate','Complete access, onboarding and ways of working.'],['04','Mobilise','Core joins the organisation and delivery begins.'],['05','Operate & Flex','Adjust capability as requirements change.']].map(([number,name,text])=>({number,name,text}))},
    {type:'next',title:'Next Steps',steps:[['01','Validate'],['02','Refine'],['03','Match'],['04','Mobilise']].map(([number,name])=>({number,name})),mobilisation:'2-4 weeks',assumptions:arr(m.assumptions)}
  ];
  return {cover:{client:clean(cl.name),title:clean(cl.opportunityName||m.statement||'Capability Proposal'),subtitle:'Initial capability strawman',contact:clean(cl.contact),location:clean(cl.location)},sections};
}
const forbidden=['buy','grossprofit','gross profit','grossmargin','gross margin','gmpct','gpmonthly','markup','bench assumption','truebuy','overheadpct','cash exposure'];
export function assertClientSafe(model){const raw=JSON.stringify(model).toLowerCase();const hit=forbidden.find(k=>raw.includes(`\"${k}\"`)||raw.includes(k+':'));if(hit)throw new Error(`Client proposal contains internal field: ${hit}`);return true;}
