import pdf from "pdf-parse";
import mammoth from "mammoth";

export const runtime="nodejs";
export async function POST(request){
 try{
  const form=await request.formData();const file=form.get("file");if(!file||typeof file.arrayBuffer!=="function")return Response.json({error:"Choose a PDF, DOCX or TXT file."},{status:400});
  const buffer=Buffer.from(await file.arrayBuffer());const name=String(file.name||"").toLowerCase();let text="";
  if(name.endsWith(".pdf")||file.type==="application/pdf"){const out=await pdf(buffer);text=out.text||""}
  else if(name.endsWith(".docx")||String(file.type).includes("wordprocessingml")){const out=await mammoth.extractRawText({buffer});text=out.value||""}
  else text=buffer.toString("utf8");
  if(!text.trim())return Response.json({error:"No readable text was found in that file. Paste the Outside-In text instead."},{status:422});
  return Response.json({text:text.trim()});
 }catch(error){return Response.json({error:`Could not parse this Outside-In: ${error.message}`},{status:500})}
}