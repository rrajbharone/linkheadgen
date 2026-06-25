export interface FormulaItem {
  name: string;
  tag: string;
  description: string;
  structure: string;
  example: string;
}

export const formulasData: FormulaItem[] = [
  {
    name: "Role + Skill + Value",
    tag: "Core Professional",
    description: "Ideal for showing off core capabilities and demonstrating immediate business impact.",
    structure: "[Job Title] | [Key Skill 1], [Key Skill 2] | Helping [Audience] [Business Value]",
    example: "Software Engineer | React, TypeScript & Node.js | Helping B2B SaaS Startups Scale Operations"
  },
  {
    name: "I Help X Achieve Y",
    tag: "Client Acquisition",
    description: "Highly focused on client acquisition. Directly targets what problems you solve and for whom.",
    structure: "I help [Target Audience] [Desired Outcome] through [Your Primary Skill/Method]",
    example: "I help B2B consulting firms generate 20+ inbound qualified leads monthly through organic SEO strategy"
  },
  {
    name: "Achievement Driven",
    tag: "Authority Building",
    description: "Highlights major career milestones or impressive metrics to establish instant credibility.",
    structure: "[Job Title] | [Notable Metric-Driven Achievement] | Specialist in [Core Skills]",
    example: "Product Manager | Led development of Mobile App with 100k+ active users | Reduced churn by 18%"
  },
  {
    name: "Founder Formula",
    tag: "Startup & Enterprise",
    description: "Tailored for founders, creators, and business leaders who want to leverage company and personal brand.",
    structure: "Founder @ [Company Name] | [Job Title] | Building the future of [Industry]",
    example: "Founder @ LegalTechFlow | CEO | Building the next generation of AI document automation for law firms"
  },
  {
    name: "Recruiter Formula",
    tag: "Job Seekers",
    description: "Optimized for recruiter searches. Emphasizes your role, skills, and current open-to-work availability.",
    structure: "[Job Title] specializing in [Skills] | Seeking Opportunities in [Target Industry/Location]",
    example: "Technical Project Manager specializing in Agile, Scrum, & JIRA | Seeking Roles in Fintech (Remote)"
  },
  {
    name: "Personal Brand Formula",
    tag: "Creators & Influencers",
    description: "For professionals who speak, create content, or wish to position themselves as modern industry leaders.",
    structure: "[Job Title] | Passionate about [Industry Topic] | Sharing insights on [Core Topic]",
    example: "HR Director | Speaker & Content Creator | Sharing actionable insights on remote workplace culture"
  }
];
