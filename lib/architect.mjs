import { resolveBenchmark } from './roles.mjs';

const patterns = [
  { id:'acquisition', name:'Acquisition integration', signals:['acquisition','integration','merger','consolidat','fragmented data','multiple systems'], entry:['solution-platform-architect','data-engineer'], flex:['technical-delivery-programme-lead','cloud-devops-engineer'], scale:['software-fullstack-engineer','data-engineer'] },
  { id:'ai', name:'AI productionisation', signals:['ai','llm','agent','automation'], entry:['ai-product-lead','ai-engineer'], flex:['ai-infrastructure-engineer','data-engineer','product-designer-ux','security-governance-specialist'], scale:['mlops-engineer','ai-engineer'] },
  { id:'ops', name:'Operational technology transformation', signals:['operations','efficiency','plant','capacity','workflow'], entry:['ai-product-lead','solution-platform-architect'], flex:['data-engineer','product-designer-ux'], scale:['software-fullstack-engineer','technical-delivery-programme-lead'] }
];

function makeMember(roleId, layer, evidence, reason, condition, weeks = 8, daysPerWeek = 2) {
  const benchmark = resolveBenchmark(roleId);
  return { roleId, layer, weeks, daysPerWeek, buyRate:benchmark.buyRate, sellRate:benchmark.sellRate, rateStatus:benchmark.status, rateSource:benchmark.source || null, evidence:evidence || 'Current Outside-In hypothesis', reason, condition };
}

export function architect(input = {}) {
  const evidence = [input.trigger,input.exposure,input.tension,input.hypothesis,input.unknown,input.whyElastic,input.observation,input.complexity,input.techDataBench,input.notes].filter(Boolean).join(' ');
  const text = evidence.toLowerCase();
  const ranked = patterns.map(p => ({ ...p, score:p.signals.reduce((n,s) => n + (text.includes(s) ? 1 : 0), 0) })).sort((a,b) => b.score-a.score);
  const pattern = ranked[0];
  const uncertainty = /unknown|unclear|validate|discovery|discover|understand|where to start|which use case|whether/i.test(text);
  const integration = /acquisition|integration|merger|consolidat|fragmented data|multiple systems/i.test(text);

  let coreIds;
  if (pattern.id === 'ai' && uncertainty && !integration) coreIds = ['ai-product-lead'];
  else if (pattern.id === 'acquisition' || integration) coreIds = ['solution-platform-architect','data-engineer'];
  else coreIds = pattern.entry.slice(0, uncertainty ? 1 : 2);

  const members = coreIds.map((roleId, index) => makeMember(
    roleId,
    'core',
    evidence,
    index === 0 ? 'Own the first outcome and turn the hypothesis into a testable delivery plan.' : 'Required from day one because the evidence indicates this capability is part of the first outcome.',
    'Start now because this capability is required for the initial outcome.'
  ));

  const deferredIds = [...new Set([...pattern.flex, ...pattern.scale].filter(id => !coreIds.includes(id)))];
  const deferredCapability = deferredIds.map((roleId, index) => makeMember(
    roleId,
    index < pattern.flex.length ? 'flex' : 'scale',
    evidence,
    'Keep specialist capability conditional rather than loading it into the opening team.',
    index < pattern.flex.length ? 'Activate when discovery proves the Core cannot credibly cover this specialist work.' : 'Add after the initial outcome is proved and parallel delivery or rollout is justified.',
    6,
    1
  ));

  return {
    pattern:pattern.name,
    confidence:Math.min(90, 58 + pattern.score * 8),
    outcome:input.whyElastic || input.hypothesis || 'Prove the smallest valuable outcome before scaling the team.',
    reasoning:members.length === 1 ? 'Start with one accountable lead because the current evidence supports discovery and definition before committing a larger team.' : `Start with ${members.length} Core roles because the evidence indicates multiple capabilities are required for the first outcome.`,
    members,
    deferredCapability,
    deployment:{ weeks:8, daysPerWeek:members.length === 1 ? 2 : null, principle:'Land, prove, then expand only where evidence requires more capability.' },
    core:members,
    flex:deferredCapability.filter(x => x.layer === 'flex'),
    scale:deferredCapability.filter(x => x.layer === 'scale')
  };
}
