import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTeamModel, calculateTeamEconomics } from '../lib/team-model.mjs';

const architectTeam={
 core:[{role:'AI Product Lead',why:'Own mission'},{role:'AI Engineer',why:'Build'}],
 flex:[{role:'Data Engineer',activation:'When data needs it'}],
 scale:[{role:'AI Engineer',condition:'After proof'}]
};

test('buildTeamModel preserves hierarchy and creates editable commercial rows',()=>{
 const team=buildTeamModel(architectTeam);
 assert.equal(team.core[0].hierarchy,'Lead');
 assert.equal(team.core[1].hierarchy,'Builder');
 assert.equal(team.flex[0].hierarchy,'Specialist');
 assert.equal(team.scale[0].hierarchy,'Scale');
 assert.equal(team.core[0].buyRate,null);
 assert.equal(team.core[0].sellRate,null);
});

test('team economics respond to individual rate and utilisation changes',()=>{
 const team=buildTeamModel(architectTeam);
 team.core[0]={...team.core[0],buyRate:600,sellRate:900,weeks:12,daysPerWeek:2};
 team.core[1]={...team.core[1],buyRate:500,sellRate:800,weeks:12,daysPerWeek:3};
 const first=calculateTeamEconomics(team);
 assert.equal(first.core.cost,32400);
 assert.equal(first.core.revenue,50400);
 assert.equal(first.core.gp,18000);
 const increased={...team,core:team.core.map((m,i)=>i===1?{...m,sellRate:900}:m)};
 const second=calculateTeamEconomics(increased);
 assert.equal(second.core.revenue,54000);
 assert.equal(second.core.gp,21600);
 assert.equal(second.core.gm,40);
});

test('flex and scale economics remain visible separately from initial core',()=>{
 const team=buildTeamModel(architectTeam);
 team.flex[0]={...team.flex[0],buyRate:700,sellRate:1000,weeks:4,daysPerWeek:1};
 const result=calculateTeamEconomics(team);
 assert.equal(result.flex.revenue,4000);
 assert.equal(result.initialInvestment,result.core.revenue);
 assert.equal(result.fullPotentialInvestment,result.core.revenue+result.flex.revenue+result.scale.revenue);
});