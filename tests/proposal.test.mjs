import test from 'node:test';
import assert from 'node:assert/strict';
import {buildProposalModel,assertClientSafe} from '../lib/proposal.mjs';

const opportunity={client:{name:'AAB',opportunityName:'Integration & Automation Capability',contact:'COO',location:'UK',duration:'6 months'},outsideIn:{trigger:'Kreston Reeves integration',facts:'Acquisition integration is live.',exposure:'Integration demand across technology and process.',tension:'Demand may be uneven.',existingCapability:'Permanent technology team.',unknown:'Which workstreams are hardest to scale?',question:'Where does integration demand exceed permanent capacity?'},mission:{statement:'Create a repeatable integration capability that protects the permanent technology team.',desiredOutcome:'Faster repeatable integration.',successOutcomes:['Faster integration','Repeatable workflows'],clientRetains:['Strategy and ownership'],elasticProvides:['Specialist capability'],constraints:['Validate systems'],assumptions:['Team shape to validate']},roles:[{role:'Transformation / Product Lead',seniority:'Lead',tier:'core',count:1,why:'Owns the mission.',activation:'From mobilisation.'}],phases:[],scenarios:{}};
const economics={headcount:1,sellMonthly:50000,sellAnnual:600000,buyMonthly:30000,gpMonthly:20000,gmPct:40};

test('proposal contains canonical client sections',()=>{
  const model=buildProposalModel(opportunity,economics,{});
  const titles=model.sections.map(x=>x.title);
  for(const title of ['The Moment','The Mission','A Team Built Around the Mission','The Elastic Operating Model','Team Options','Investment','The Elastic Launch','Next Steps']) assert.ok(titles.includes(title));
});

test('client proposal strips internal economics',()=>{
  const model=buildProposalModel(opportunity,economics,{});
  assert.doesNotThrow(()=>assertClientSafe(model));
  const raw=JSON.stringify(model).toLowerCase();
  for(const forbidden of ['buymonthly','gpmonthly','gmpct','markup','bench assumption']) assert.equal(raw.includes(forbidden),false);
});

test('timeline is omitted when phase evidence is missing',()=>{
  const model=buildProposalModel(opportunity,economics,{});
  assert.equal(model.sections.some(x=>x.title==='Capacity Timeline'),false);
});