import { ROLE_LIBRARY } from '../data/roles.mjs';
export { ROLE_LIBRARY };
export const listRoles = () => ROLE_LIBRARY.map(role => ({ ...role }));
export const getRole = id => ROLE_LIBRARY.find(role => role.id === id) || null;
export function resolveBenchmark(roleId) {
  const role = getRole(roleId);
  if (!role) return { status: 'missing-role', role: null, buyRate: null, sellRate: null };
  if (role.defaultBuy == null || role.defaultSell == null) return { status: 'missing-benchmark', role, buyRate: role.defaultBuy, sellRate: role.defaultSell };
  return { status: 'benchmark', role, buyRate: role.defaultBuy, sellRate: role.defaultSell };
}