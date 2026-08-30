const role=(id,name,discipline,description,skills,layers=["Core","Flex","Scale"],rates={})=>({id,name,discipline,seniority:"Senior",description,skills,layers,buyRange:rates.buyRange??null,sellRange:rates.sellRange??null,defaultBuy:rates.defaultBuy??null,defaultSell:rates.defaultSell??null});
const standard={buyRange:[500,800],sellRange:[800,1200],defaultBuy:650,defaultSell:950};
export const ROLE_LIBRARY=[
role("principal-ai-architect","Principal AI / AI Architect","AI","Owns AI architecture, technical direction and production design.",["AI architecture","LLMs","RAG","systems design"],undefined,standard),
role("ai-engineer","AI Engineer","AI","Builds production AI features, agents and model integrations.",["LLMs","RAG","agents","APIs"],undefined,standard),
role("ai-infrastructure-engineer","AI Infrastructure Engineer","AI Platform","Builds secure, scalable infrastructure for AI workloads.",["cloud","inference","observability","CI/CD"],undefined,standard),
role("ai-product-lead","AI Product Lead / AI Product Manager","Product","Turns an AI opportunity into a prioritised product and delivery plan.",["product strategy","discovery","AI","roadmaps"],undefined,standard),
role("data-engineer","Data Engineer","Data","Builds reliable ingestion, transformation and data products.",["ETL","ELT","SQL","warehouses"],undefined,standard),
role("data-scientist","Data Scientist","Data","Builds analytical and predictive models around business outcomes.",["Python","modelling","experimentation","analytics"],undefined,standard),
role("mlops-engineer","MLOps Engineer","AI Platform","Operationalises models with deployment, monitoring and governance.",["MLOps","CI/CD","monitoring","cloud"],undefined,standard),
role("cloud-devops-engineer","Cloud / DevOps Engineer","Platform","Builds cloud foundations and dependable delivery pipelines.",["AWS","Azure","GCP","DevOps"],undefined,standard),
role("product-manager","Product Manager","Product","Owns product outcomes, priorities and stakeholder decisions.",["discovery","roadmaps","delivery","stakeholders"],undefined,standard),
role("product-designer-ux","Product Designer / UX","Design","Designs usable workflows and interfaces around real user needs.",["UX","research","prototyping","service design"],undefined,standard),
role("solution-platform-architect","Solution / Platform Architect","Architecture","Shapes the end-to-end platform and integration architecture.",["architecture","APIs","integration","platforms"],undefined,standard),
role("software-fullstack-engineer","Software Engineer / Full-stack Engineer","Engineering","Builds product experiences, services and integrations.",["React","Node.js","APIs","databases"],undefined,standard),
role("technical-delivery-lead","Technical Delivery / Programme Lead","Delivery","Coordinates complex technical delivery and dependencies.",["delivery","programme management","risk","stakeholders"],undefined,standard),
role("security-governance-specialist","Security / Governance Specialist","Governance","Ensures security, privacy and AI governance requirements are designed in.",["security","privacy","governance","risk"],undefined,standard)
];
