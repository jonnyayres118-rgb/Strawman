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

test('preserves every Pipeline field needed to populate a complete Outside-In report',()=>{
 const csv='Priority,Company,Score,Status,Wedge,Owner / Backer,Employees,Revenue,12m Growth,Tech / Data Bench,Complexity,Trigger,Why Elastic,Key Unknown,Best Discovery Question,Primary Buyer,Buyer Name,LinkedIn / Contact,Last Touch,Next Action,Next Action Date,Outside-In,Source / Confidence,Notes,Last Researched,Active?\n1,Acme,96,Research,Legal,Backer,1800,£200m,28%,Central AI team,25 locations,Acquisition plus AI rollout,Integration creates temporary specialist demand,Internal vs partner delivery?,Which workstream is hardest?,COO,Jane Doe,jane@example.com,26-08,Build report,2026-08-30,Build,High confidence,Important note,2026-08-29,TRUE';
 const [row]=parsePipelineCsv(csv);
 assert.equal(row.priority,'1');
 assert.equal(row.employees,'1800');
 assert.equal(row.revenue,'£200m');
 assert.equal(row.growth,'28%');
 assert.equal(row.bench,'Central AI team');
 assert.equal(row.complexity,'25 locations');
 assert.equal(row.trigger,'Acquisition plus AI rollout');
 assert.equal(row.whyElastic,'Integration creates temporary specialist demand');
 assert.equal(row.unknown,'Internal vs partner delivery?');
 assert.equal(row.question,'Which workstream is hardest?');
 assert.equal(row.contactDetail,'jane@example.com');
 assert.equal(row.lastTouch,'26-08');
 assert.equal(row.nextAction,'Build report');
 assert.equal(row.nextActionDate,'2026-08-30');
 assert.equal(row.outsideIn,'Build');
 assert.equal(row.source,'High confidence');
 assert.equal(row.notes,'Important note');
 assert.equal(row.lastResearched,'2026-08-29');
});
