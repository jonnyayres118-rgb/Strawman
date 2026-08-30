import { calculateScenario } from "./commercial-model.mjs";
const id=(prefix="id")=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const recalc=s=>({...s,economics:calculateScenario(s)});
export function createEngagement({account,outcome="",context="",members=[],deployment={weeks:8},scenarioName="Recommended"}={}){const scenario=recalc({id:id("scenario"),name:scenarioName,members:members.map(m=>({...m,id:m.id||id("member")})),deployment});return{id:id("engagement"),account,outcome,context,scenarios:[scenario],activeScenarioId:scenario.id};}
export function updateScenario(e,scenarioId,patch){return{...e,scenarios:e.scenarios.map(s=>s.id===scenarioId?recalc({...s,...patch}):s)};}
export function addMember(e,scenarioId,member){const s=e.scenarios.find(x=>x.id===scenarioId);return updateScenario(e,scenarioId,{members:[...s.members,{...member,id:member.id||id("member")} ]});}
export function removeMember(e,scenarioId,memberId){const s=e.scenarios.find(x=>x.id===scenarioId);return updateScenario(e,scenarioId,{members:s.members.filter(m=>m.id!==memberId)});}
export function updateMember(e,scenarioId,memberId,patch){const s=e.scenarios.find(x=>x.id===scenarioId);return updateScenario(e,scenarioId,{members:s.members.map(m=>m.id===memberId?{...m,...patch}:m)});}
export function duplicateMember(e,scenarioId,memberId){const s=e.scenarios.find(x=>x.id===scenarioId),m=s.members.find(x=>x.id===memberId);return addMember(e,scenarioId,{...m,id:id("member")});}
export function moveMember(e,scenarioId,memberId,layer){return updateMember(e,scenarioId,memberId,{layer});}
export function duplicateScenario(e,scenarioId,name){const source=e.scenarios.find(s=>s.id===scenarioId);const copy=recalc({...source,id:id("scenario"),name:name||`${source.name} copy`,members:source.members.map(m=>({...m,id:id("member")}))});return{...e,scenarios:[...e.scenarios,copy],activeScenarioId:copy.id};}
export function addScenario(e,scenario){const next=recalc({...scenario,id:scenario.id||id("scenario"),members:(scenario.members||[]).map(m=>({...m,id:m.id||id("member")}))});return{...e,scenarios:[...e.scenarios,next],activeScenarioId:next.id};}
