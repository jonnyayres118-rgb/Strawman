// Commercial inputs are evidence-led. Add values only when verified from recovered source or approved by Elastic Labs.
export const COMMERCIAL_BENCHMARKS = {
  assumptions: {
    billableDaysPerYear: { value:167, status:'RECOVERED_CONTEXT', source:'Elastic Labs prior commercial model' },
    onCostRate: { value:0.386, status:'RECOVERED_CONTEXT', source:'Elastic Labs prior commercial model' }
  },
  roles: {}
};

export function benchmarkForRole(roleId) {
  return COMMERCIAL_BENCHMARKS.roles[roleId] || { roleId, status:'MISSING_INPUT', buyRate:null, sellRate:null };
}
