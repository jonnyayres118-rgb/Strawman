import {NextResponse} from 'next/server';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {parsePipelineCsv} from '../../../lib/prospects.mjs';

const DATA_FILES=['pipeline-core.csv','pipeline-growth.csv','pipeline-latest.csv'];

async function loadPlatformResearch(){
  const batches=await Promise.all(DATA_FILES.map(async file=>{
    const csv=await readFile(path.join(process.cwd(),'data',file),'utf8');
    return parsePipelineCsv(csv);
  }));
  const byCompany=new Map();
  for(const opportunity of batches.flat()) byCompany.set(opportunity.company,opportunity);
  return [...byCompany.values()].sort((a,b)=>b.score-a.score);
}

export const dynamic='force-dynamic';
export async function GET(){
  try{
    const opportunities=await loadPlatformResearch();
    if(opportunities.length!==53) throw new Error(`Platform research contains ${opportunities.length} opportunities; expected 53`);
    return NextResponse.json({opportunities,source:'Elastic Labs Opportunity Engine',syncedAt:new Date().toISOString(),platformOwned:true},{headers:{'Cache-Control':'no-store'}});
  }catch(error){
    return NextResponse.json({error:error instanceof Error?error.message:'Unable to load platform research.'},{status:500,headers:{'Cache-Control':'no-store'}});
  }
}
