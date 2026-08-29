import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePipelineCsv} from '../lib/prospects.mjs';

test('maps active Pipeline rows into Opportunity Engine records',()=>{
 const csv='Priority,Company,Score,Status,Wedge,Owner / Backer,Employees,Revenue,12m Growth,Tech / Data Bench,Complexity,Trigger,Why Elastic,Key Unknown,Best Discovery Question,Primary Buyer,Buyer Name,LinkedIn / Contact,Last Touch,Next Action,Next Action Date,Outside-In,Source / Confidence,Notes,Last Researched,Active?\n1,"Zema Global Data Corporation",94,"Live / Research","Energy / Commodities Data & Analytics","FTV Capital",251-500,,growth,"mature bench",complex,"FTV investment + acquisitions","Temporary specialist delivery","Which workstreams remain?","Which workstream benefits from specialist capacity?","CPTO / COO","Ronnie Thomson",,,,,Build,"High confidence",notes,2026-08-29,TRUE';
 const rows=parsePipelineCsv(csv);
 assert.equal(rows.length,1);
 assert.equal(rows[0].company,'Zema Global Data Corporation');
 assert.equal(rows[0].score,94);
 assert.equal(rows[0].contact,'Ronnie Thomson · CPTO / COO');
 assert.match(rows[0].hypothesis,/Temporary specialist delivery/);
});

test('excludes rows explicitly marked inactive and sorts by score',()=>{
 const csv='Priority,Company,Score,Status,Wedge,Owner / Backer,Employees,Revenue,12m Growth,Tech / Data Bench,Complexity,Trigger,Why Elastic,Key Unknown,Best Discovery Question,Primary Buyer,Buyer Name,LinkedIn / Contact,Last Touch,Next Action,Next Action Date,Outside-In,Source / Confidence,Notes,Last Researched,Active?\n1,A,80,Research,X,Y,,,,,,t,w,u,q,B,N,,,,,,,,,FALSE\n2,B,95,Research,X,Y,,,,,,t,w,u,q,B,N,,,,,,,,,TRUE\n3,C,90,Research,X,Y,,,,,,t,w,u,q,B,N,,,,,,,,,TRUE';
 assert.deepEqual(parsePipelineCsv(csv).map(x=>x.company),['B','C']);
});
