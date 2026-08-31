import test from 'node:test';
import assert from 'node:assert/strict';
import {buildClientHtml,buildInternalCsv} from '../lib/export.mjs';

const proposal={
  cover:{title:'Integration Capability',client:'AAB'},
  sections:[
    {id:'moment',title:'The Moment',body:'Acquisition integration creates uneven delivery demand.'},
    {id:'mission',title:'The Mission',mission:'Create repeatable integration capability.'},
    {id:'team',title:'A Team Built Around the Mission',roles:[{role:'Integration Lead',count:1,tier:'core',why:'Own the mission',activation:'Required from day one'}]},
    {id:'operating',title:'The Elastic Operating Model',body:'Knowledge stays. Capacity changes.'},
    {id:'options',title:'Team Options',options:[{name:'Recommended',people:1,monthlyInvestment:18000}]},
    {id:'investment',title:'Investment',monthlyInvestment:18000},
    {id:'launch',title:'The Elastic Launch',stages:['Understand','Design','Integrate','Mobilise','Operate & Flex']},
    {id:'next',title:'Next Steps',steps:['Validate','Refine','Match','Mobilise']}
  ]
};

const economics={rows:[{role:{role:'Integration Lead',tier:'core',count:1},economics:{buyPerDay:650,sellPerDay:900,marginPct:27.8}}],gmPct:27.8};

test('client HTML contains canonical proposal narrative and no internal economics labels',()=>{
  const html=buildClientHtml(proposal);
  for(const label of ['The Moment','The Mission','A Team Built Around the Mission','The Elastic Operating Model','Team Options','Investment','The Elastic Launch','Next Steps']) assert.match(html,new RegExp(label));
  for(const forbidden of ['BUY/day','GP/day','GM %','markup','bench assumption','buyPerDay','marginPct']) assert.equal(html.toLowerCase().includes(forbidden.toLowerCase()),false,forbidden);
});

test('internal CSV contains buy sell and margin fields',()=>{
  const csv=buildInternalCsv(economics);
  assert.match(csv,/BUY\/day/);
  assert.match(csv,/SELL\/day/);
  assert.match(csv,/GM %/);
  assert.match(csv,/Integration Lead/);
});
