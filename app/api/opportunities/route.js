import {NextResponse} from 'next/server';
import {parsePipelineCsv} from '../../../lib/prospects.mjs';

const SHEET_ID='1y61_TDijUNEFAXZX2hkM_jq28fmuk2yMWhWoy3psi3w';
const PIPELINE_CSV=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Pipeline`;
const pipelineSnapshot=`Lawfront|97|outreach 1|Legal
TC Group|96|outreach 1|Professional Services
AAB|96|Research|Professional Services
Pro Global / PoloWorks|96|Research|Insurance Services / London Market
Sumer Group|95|Research|Professional Services
Mourant|95|Research|Legal / Professional Services
Knights Group|94|Research|Legal
DJH|94|outreach 1|Professional Services
Clear Group|94|outreach 1|Insurance
Dantherm Group|94|Research|Industrial / Distribution
Mapei UK|94|Research|Specialist Manufacturing / Chemicals
Zema Global Data Corporation|94|Live / Research|Energy / Commodities Data & Analytics
Wynnstay Group|93|Research|Agri-food / Agricultural Supply
Dains|92|outreach 1|Professional Services
SONAS Bathrooms|92|Research|Manufacturing / Distribution
CloserStill Media|91|Research|Multi-site / Media
Buzzacott|91|Research|Professional Services
Zeus Packaging|91|Research|Packaging / Manufacturing / Distribution
TST Group|91|Research|Logistics / Freight / Warehousing
TFP Fertility Group|90|Research|Healthcare
Pinewood Group Limited|90|Research|Media / Studios
Melba Swintex|90|Research|Specialist Manufacturing / Distribution
Affinia|89|outreach 1|Professional Services
Taylor Rose|89|Research|Legal
TAG|89|Research|Travel / Services
Global Ports Holding|89|Research|Infrastructure / Ports
Huws Gray|88|outreach 1|Multi-site / Distribution
Bright Horizons UK|88|Research|Healthcare / Education
JMG Group|87|Research|Insurance
Maritime Transport Ltd|87|Research|Logistics / Freight
Progeny|86|outreach 1|Professional Services
UK P&I Club|86|Research|Insurance
Oneglobal Broking|85|Research|Insurance
ME+EM Ltd|85|Research|Retail / Ecommerce
Partners&|84|outreach 1|Insurance
Rokstone Underwriting|84|Research|Insurance
JKS Restaurants|84|Research|Hospitality / Multi-site
Three Crowns LLP|83|Research|Legal
Gravita|82|outreach 1|Professional Services
Stowe Family Law|82|Research|Legal
Campbell Lutyens|81|Research|Financial Services
Hobbycraft|80|Validate|Retail
Seventeen Group|78|Research|Insurance
Hanson Wade|78|Research|Information / Events
Pemberton Asset Management|77|Research|Financial Services
Foundation|76|Research|Financial Services
Prestige Insurance Holdings|75|Validate|Insurance
AerFin|74|Research|Aviation
Allison Homes|73|Research|Construction
Tilia Homes|71|Research|Construction
MHA|69|Watch|Professional Services
Science in Sport Group|67|Watch|Consumer / Ecommerce
Crown Agents Bank|64|Watch|Financial Services`;
const fallback=pipelineSnapshot.split('\n').map(line=>{const [company,score,status,industry]=line.split('|');return {company,score:Number(score),status,industry,ownership:'From Prospect Engine',trigger:'Open the Google Sheet record for the full researched trigger and evidence.',exposure:'Imported from the live Prospect Engine Pipeline.',tension:'Opportunity retained from the full Elastic Labs prospect universe.',hypothesis:'Use the researched Sheet record as the source of truth before outreach.',unknown:'Validate current capability, incumbents and live programme scope.',question:'Which workstream is hardest for the permanent team to absorb without adding fixed headcount?',contact:'Buyer to validate',source:'Elastic Labs — Prospect Engine · Pipeline snapshot'};});

export const dynamic='force-dynamic';
export async function GET(){try{const res=await fetch(PIPELINE_CSV,{cache:'no-store'});if(!res.ok)throw new Error(`Google Sheet returned ${res.status}`);const opportunities=parsePipelineCsv(await res.text());if(opportunities.length<50)throw new Error(`Public Sheet export returned only ${opportunities.length} opportunities`);return NextResponse.json({opportunities,source:'Elastic Labs — Prospect Engine · Pipeline',syncedAt:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});}catch(error){return NextResponse.json({opportunities:fallback,source:'Elastic Labs — Prospect Engine · Pipeline snapshot',syncedAt:new Date().toISOString(),fallback:true,error:error.message},{headers:{'Cache-Control':'no-store'}});}}
