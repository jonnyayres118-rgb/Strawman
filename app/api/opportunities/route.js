import {NextResponse} from 'next/server';
import {parsePipelineCsv} from '../../../lib/prospects.mjs';

const SHEET_ID='1y61_TDijUNEFAXZX2hkM_jq28fmuk2yMWhWoy3psi3w';
const PIPELINE_CSV=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Pipeline`;

export const dynamic='force-dynamic';
export async function GET(){try{const res=await fetch(PIPELINE_CSV,{cache:'no-store'});if(!res.ok)throw new Error(`Google Sheet returned ${res.status}`);const opportunities=parsePipelineCsv(await res.text());return NextResponse.json({opportunities,source:'Elastic Labs — Prospect Engine · Pipeline',syncedAt:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});}catch(error){return NextResponse.json({opportunities:[],source:'Elastic Labs — Prospect Engine · Pipeline',error:error.message},{status:502});}}
