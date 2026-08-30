export function salaryToLoadedDayCost({ annualSalary, billableDaysPerYear, onCostRate, source = null } = {}) {
  if (annualSalary == null || billableDaysPerYear == null || onCostRate == null || Number(billableDaysPerYear) <= 0) {
    return { status:'MISSING_INPUT', annualSalary:annualSalary ?? null, loadedAnnualCost:null, loadedDayCost:null, source };
  }
  const loadedAnnualCost = Number(annualSalary) * (1 + Number(onCostRate));
  return { status:'VERIFIED', annualSalary:Number(annualSalary), loadedAnnualCost, loadedDayCost:loadedAnnualCost / Number(billableDaysPerYear), source };
}
