import { TALENT_NETWORK } from '../data/talent.mjs';
export const listTalent = (network = TALENT_NETWORK) => network.map(person => ({ ...person, roleIds:[...(person.roleIds || [])] }));
export const getTalent = (id, network = TALENT_NETWORK) => network.find(person => person.id === id) || null;
export const findTalentForRole = (roleId, network = TALENT_NETWORK) => network.filter(person => (person.roleIds || []).includes(roleId));
export function assignTalent(member, person) {
  if (!person || !(person.roleIds || []).includes(member.roleId)) throw new Error('Talent does not match selected role');
  return { ...member, personId: person.id, buyRate: person.buyRate ?? member.buyRate, rateSource: person.buyRate == null ? member.rateSource : 'talent' };
}