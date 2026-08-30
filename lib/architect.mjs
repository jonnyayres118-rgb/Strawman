import { resolveBenchmark } from "./roles.mjs";

const patterns=[
{id:"acquisition",name:"Acquisition integration",signals:["acquisition","integration","merger","consolidat"],entry:["technical-delivery-lead"],core:["solution-platform-architect","data-engineer"],flex:["ai-engineer","product-designer-ux","cloud-devops-engineer"],scale:["data-engineer","software-fullstack-engineer"]},
{id:"ai",name:"AI productionisation",signals:["ai","llm","agent","automation"],entry:["ai-product-lead"],core:["ai-engineer","ai-infrastructure-engineer"],flex:["data-engineer","product-designer-ux","security-governance-specialist"],scale:["ai-engineer","mlops-engineer"]},
{id:"ops",name:"Operational technology transformation",signals:["operations","efficiency","plant","capacity","workflow"],entry:["ai-product-lead"],core:["solution-platform-architect","data-engineer"],flex:["ai-engineer","product-designer-ux"],scale:["software-fullstack-engineer","technical-delivery-lead"]}
];

const roleMember=(roleId,layer,reason,condition="")=>{const benchmark=resolveBenchmark(roleId);return{roleId,layer,weeks:layer==="Core"?8:6,daysPerWeek:layer==="Core"?2:1,buyRate:benchmark.buyRate,sellRate:benchmark.sellRate,rateSource:benchmark.source,reason,condition};};

export function architect(i={}){
 const text=[i.trigger,i.exposure,i.tension,i.hypothesis,i.unknown,i.whyElastic,i.notes].filter(Boolean).join(" ").toLowerCase();
 const ranked=patterns.map(p=>({...p,score:p.signals.reduce((n,s)=>n+(text.includes(s)?1:0),0)})).sort((a,b)=>b.score-a.score);
 const p=ranked[0];
 const uncertainty=/unknown|unclear|validate|discovery|understand|whether|how much/i.test(text);
 const complexityHits=["integration","data","platform","architecture","migration","multiple","acquisition"].filter(s=>text.includes(s)).length;
 const entryOnly=uncertainty && complexityHits<2;
 const coreIds=entryOnly?p.entry:[...p.entry,...p.core];
 const members=coreIds.map((id,index)=>roleMember(id,"Core",index===0?"Own the first outcome and turn the hypothesis into a testable delivery plan.":"Required from the start because the evidence indicates this capability is part of the first delivery outcome."));
 const deferredCapability=[...p.flex.map(id=>roleMember(id,"Flex","Specialist capability is useful only if discovery proves it is required.","Activate when the Core cannot credibly cover this specialist work.")),...p.scale.map(id=>roleMember(id,"Scale","Additional delivery capacity should follow evidence of value.","Add after the initial outcome is proved and parallel delivery is justified."))];
 return{pattern:p.name,confidence:Math.min(90,58+p.score*8),outcome:i.whyElastic||i.hypothesis||"Prove the smallest valuable outcome before scaling the team.",reasoning:entryOnly?"Start with one accountable lead because the current evidence supports discovery and definition before committing a larger team.":`Start with ${members.length} Core ${members.length===1?"role":"roles"} because the evidence indicates multiple capabilities are required for the first outcome.`,members,deferredCapability,deployment:{weeks:8,principle:"Land, prove, then expand only where evidence requires more capability."}};
}
