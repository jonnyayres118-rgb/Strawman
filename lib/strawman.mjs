export const defaultRateCard = [
  ['Transformation / Product Lead','Delivery / Transformation','Lead',825,118000],
  ['Data / Integration Architect','Data','Lead',825,120000],
  ['Data Engineer','Data','Senior',650,95000],
  ['Integration Engineer','Data','Senior',650,95000],
  ['Principal AI Engineer','AI / ML','Principal / Practice Lead',1100,175000],
  ['AI Product Lead','Product','Lead',825,120000],
  ['AI Engineer','AI / ML','Senior',700,105000],
  ['ML Engineer','AI / ML','Senior',675,100000],
  ['MLOps Engineer','AI / ML','Senior',675,98000],
  ['AI Infrastructure Engineer','Infrastructure','Senior',725,105000],
  ['Cloud Architect','Infrastructure','Lead',820,118000],
  ['Platform Engineer','Infrastructure','Senior',650,92000],
  ['Product Designer','Design / Service','Senior',610,88000],
  ['Process / Service Designer','Design / Service','Senior',610,88000],
  ['Delivery Lead','Delivery / Transformation','Lead',725,105000]
].map(([role,capability,seniority,contractDayRateBenchmark,salaryBenchmark])=>({role,capability,seniority,contractDayRateBenchmark,salaryBenchmark}));

export function defaultCommercialAssumptions(){
  return {
    utilisation:{workingDaysPerYear:260,publicHolidays:8,annualLeave:25,sickAllowance:5,trainingDays:5,internalAllocation:8,targetUtilisation:80},
    engagementCosts:{
      'Employee':{employerNI:13.8,pension:5,apprenticeshipLevy:0.5,recruitment:8,insurance:0.5,payrollEOR:0,legal:0.3,training:1.5,benefits:3,managementOverhead:5,other:1,equipmentFixed:1500,softwareFixed:1200},
      'PAYE Contractor':{employerNI:13.8,pension:3,apprenticeshipLevy:0.5,recruitment:4,insurance:0.5,payrollEOR:1.5,legal:0.3,training:0,benefits:0,managementOverhead:3,other:0.5,equipmentFixed:800,softwareFixed:1000},
      'Outside IR35 Contractor':{employerNI:0,pension:0,apprenticeshipLevy:0,recruitment:5,insurance:0.3,payrollEOR:0,legal:0.5,training:0,benefits:0,managementOverhead:3,other:0.5,equipmentFixed:0,softwareFixed:600},
      'Freelancer':{employerNI:0,pension:0,apprenticeshipLevy:0,recruitment:6,insurance:0.3,payrollEOR:0,legal:0.3,training:0,benefits:0,managementOverhead:2.5,other:0.5,equipmentFixed:0,softwareFixed:400},
      'Agency Supplied Worker':{employerNI:0,pension:0,apprenticeshipLevy:0,recruitment:0,insurance:0.2,payrollEOR:0,legal:0.2,training:0,benefits:0,managementOverhead:2,other:0.5,equipmentFixed:0,softwareFixed:400},
      'Partner/Subcontractor':{employerNI:0,pension:0,apprenticeshipLevy:0,recruitment:0,insurance:0.2,payrollEOR:0,legal:0.5,training:0,benefits:0,managementOverhead:1.5,other:0.5,equipmentFixed:0,softwareFixed:0},
      'Employer of Record':{employerNI:0,pension:3,apprenticeshipLevy:0,recruitment:3,insurance:0.5,payrollEOR:6,legal:0.3,training:1,benefits:1.5,managementOverhead:3,other:0.5,equipmentFixed:800,softwareFixed:800}
    },
    marginBands:{'Principal / Practice Lead':25,'Director / Head of':25,'Lead':28,'Staff':30,'Senior':32,'Mid-level':35,'Junior':38},
    minAcceptableMargin:20,
    overheadPct:17
  };
}

export function createOpportunity(){
  return {
    id:`opp_${Date.now()}`,
    status:'Draft',
    client:{name:'',opportunityName:'New Opportunity',industry:'',location:'',contact:'',currency:'GBP',startDate:'',duration:'',notes:''},
    outsideIn:{trigger:'',facts:'',exposure:'',tension:'',existingCapability:'',skillsGaps:'',unknown:'',question:'',technologies:'',regulatory:'',locationReq:'',urgency:'',budget:''},
    mission:{statement:'',desiredOutcome:'',successOutcomes:[],clientRetains:[],elasticProvides:[],constraints:[],assumptions:[]},
    roles:[], phases:[], scenarios:{core:null,recommended:null,scale:null}, proposalEdits:{},
    cashflow:{clientTermsDays:30,talentTermsDays:30}
  };
}

function billableDays(assumptions, role){
  const u=assumptions.utilisation;
  const available=u.workingDaysPerYear-u.publicHolidays-u.annualLeave-u.sickAllowance-u.trainingDays-u.internalAllocation;
  const util=(role.utilisationOverridePct ?? u.targetUtilisation)/100;
  return Math.max(1,Math.round(available*util));
}

export function calculateRoleEconomics(role, assumptions=defaultCommercialAssumptions()){
  const days=billableDays(assumptions,role);
  const model=role.engagementModel||'Outside IR35 Contractor';
  const employee=model==='Employee'||model==='Employer of Record';
  const baseAnnual=role.manualBuyAnnual ?? (employee ? Number(role.salaryBenchmark||0) : Number(role.contractDayRateBenchmark||0)*days);
  const c=assumptions.engagementCosts[model]||assumptions.engagementCosts['Outside IR35 Contractor'];
  const pct=['employerNI','pension','apprenticeshipLevy','recruitment','insurance','payrollEOR','legal','training','benefits','managementOverhead','other'].reduce((s,k)=>s+Number(c[k]||0),0);
  const trueBuyAnnual=baseAnnual+(baseAnnual*pct/100)+Number(c.equipmentFixed||0)+Number(c.softwareFixed||0);
  const buyPerDay=role.manualBuyDay!=null ? Number(role.manualBuyDay) : trueBuyAnnual/days;
  const targetMargin=Number(role.targetMarginPct ?? assumptions.marginBands[role.seniority] ?? 30);
  const pricingMethod=role.pricingMethod||role.sellMethod||'margin';
  let sellPerDay;
  if(pricingMethod==='manual') sellPerDay=Number(role.manualSellDay||0);
  else if(pricingMethod==='markup') sellPerDay=buyPerDay*(1+Number(role.markupPct||0)/100);
  else sellPerDay=buyPerDay/(1-Math.min(95,Math.max(0,targetMargin))/100);
  const marginPct=sellPerDay?((sellPerDay-buyPerDay)/sellPerDay*100):0;
  const markupPct=buyPerDay?((sellPerDay-buyPerDay)/buyPerDay*100):0;
  const count=Number(role.count||0);
  const allocation=Math.max(0,Math.min(100,Number(role.allocationPct??100)))/100;
  const buyMonthly=(buyPerDay*days/12)*count*allocation;
  const sellMonthly=(sellPerDay*days/12)*count*allocation;
  return {days,buyPerDay,sellPerDay,marginPct,markupPct,trueBuyAnnual,buyMonthly,sellMonthly,gpMonthly:sellMonthly-buyMonthly,count,allocation};
}

export function calculateTeamEconomics(roles=[], assumptions=defaultCommercialAssumptions()){
  const rows=roles.map(role=>({role,economics:calculateRoleEconomics(role,assumptions)}));
  const headcount=roles.reduce((s,r)=>s+Number(r.count||0),0);
  const buyMonthly=rows.reduce((s,r)=>s+r.economics.buyMonthly,0);
  const sellMonthly=rows.reduce((s,r)=>s+r.economics.sellMonthly,0);
  const gpMonthly=sellMonthly-buyMonthly;
  const gmPct=sellMonthly?gpMonthly/sellMonthly*100:0;
  const totalDays=rows.reduce((s,r)=>s+r.economics.days*r.economics.count*r.economics.allocation,0);
  const avgBuyRate=totalDays?buyMonthly*12/totalDays:0;
  const avgSellRate=totalDays?sellMonthly*12/totalDays:0;
  return {rows,headcount,buyMonthly,sellMonthly,gpMonthly,gmPct,buyAnnual:buyMonthly*12,sellAnnual:sellMonthly*12,gpAnnual:gpMonthly*12,avgBuyRate,avgSellRate,revenuePerHead:headcount?sellMonthly*12/headcount:0,gpPerHead:headcount?gpMonthly*12/headcount:0,contributionMonthly:gpMonthly-sellMonthly*(Number(assumptions.overheadPct||0)/100)};
}

export function calculateCashExposure(teamEconomics, clientTermsDays=30, talentTermsDays=30){
  const exposureDays=Math.max(0,Number(clientTermsDays)-Number(talentTermsDays))+30;
  const maxExposure=(teamEconomics.buyMonthly/30)*exposureDays;
  return {exposureDays,maxExposure,monthsToFinance:exposureDays/30};
}
