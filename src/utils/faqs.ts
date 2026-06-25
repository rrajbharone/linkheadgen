export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "What is a LinkedIn headline and why is it important?",
    answer: "A LinkedIn headline is the text that appears right under your name on your LinkedIn profile. It is one of the most critical elements of your profile because it is visible in LinkedIn searches, post comments, message previews, and connection requests. A well-crafted headline increases your profile visibility, explains what you do, and encourages recruiters or prospects to click on your profile."
  },
  {
    question: "How does the LinkHeadGen.com LinkedIn Headline Generator work?",
    answer: "Our generator uses proven LinkedIn branding formulas (like Role + Skill + Value, 'I Help' Statements, and Achievement-driven templates) to create high-converting headlines. It runs entirely in your browser using local pattern-matching logic based on your inputs (job title, industry, skills, etc.) without sending any data to a server or requiring external API calls."
  },
  {
    question: "Is this LinkedIn Headline Generator completely free to use?",
    answer: "Yes! LinkHeadGen.com is 100% free. There are no limits, no paywalls, no credits to buy, and no signup or email registration required. You can generate as many headlines as you need instantly."
  },
  {
    question: "What is the character limit for a LinkedIn headline?",
    answer: "As of 2026, the official LinkedIn headline character limit is 220 characters. Our tool includes an active character counter for every generated headline and marks it with a green 'LinkedIn-Safe' tag if it is within this limit, ensuring your headline won't be truncated."
  },
  {
    question: "How do I choose the best headline style for my profile?",
    answer: "Choose your style based on your career goal. If you are actively job hunting, use 'Recruiter Friendly' or 'Achievement Based' to show off core skills. If you are a freelancer or business owner seeking leads, use the 'I Help / Value' or 'Personal Brand' styles. Founders and executives should opt for 'Founder Style' or 'Executive' to emphasize leadership authority."
  },
  {
    question: "Can I customize the generated headlines?",
    answer: "Absolutely! The generated headlines serve as highly optimized templates. You should copy the best matches, paste them into your profile, and tweak the specific achievements, metrics, or company names to fit your unique professional history."
  },
  {
    question: "How does the 'Favorite' feature work on LinkHeadGen.com?",
    answer: "When you click the heart icon next to any generated headline, it is saved to your Favorites list. This list is saved locally in your browser's Local Storage, meaning your favorites will persist even if you close the tab or refresh the page, with zero data uploaded to external servers."
  },
  {
    question: "How do I optimize my LinkedIn headline for recruiters?",
    answer: "To optimize for recruiters, include high-intent keywords that recruiters search for (like exact job titles and technical skills). Avoid vague phrases like 'detail-oriented professional' or 'synergy creator' and instead use precise terms like 'Software Engineer | React, TypeScript, Node.js'."
  },
  {
    question: "What is the difference between a student headline and an executive headline?",
    answer: "Student headlines focus on potential, learning paths, and aspirations (e.g., 'Aspiring Data Analyst | Mathematics Major @ State Univ | Python & SQL'). Executive headlines emphasize scale, leadership, and business results (e.g., 'VP of Sales | Scaling SaaS Teams from $0M to $50M+ ARR | Enterprise Sales Strategy')."
  },
  {
    question: "Does this tool support Dark Mode?",
    answer: "Yes, LinkHeadGen.com features a complete premium dark theme. You can toggle between light and dark modes using the theme switch icon in the header. The site also respects your system's default light/dark preference."
  },
  {
    question: "How do keyboard shortcuts work on this site?",
    answer: "You can use keyboard shortcuts to operate the generator faster. Press 'Ctrl+Enter' to generate a new set of headlines using the current form inputs, and press 'Escape' to clear the inputs and reset the form."
  },
  {
    question: "Can I see my generation history?",
    answer: "Yes, our tool maintains a list of your recently generated headline sets. You can toggle between 'All Headlines', 'Favorites', and 'Recent History' in the output tab panel. All history is stored purely in your browser's Local Storage."
  },
  {
    question: "Should I include 'Open to Work' in my actual headline text?",
    answer: "Generally, no. LinkedIn provides a dedicated '#OpenToWork' photo frame and recruiter-only profile settings. Using valuable headline character space for 'Open to Work' reduces the room you have for listing core skills and value propositions that actually get recruiters interested."
  },
  {
    question: "How often should I update my LinkedIn headline?",
    answer: "You should update your headline whenever you start a new role, acquire a major new skill, achieve a significant career milestone, or shift your target career goals (e.g., transition from employee to freelancer)."
  },
  {
    question: "Does this site store my personal information or inputs?",
    answer: "No. LinkHeadGen.com values your privacy. All headline generation logic, history tracking, and favorites saving occur locally on your machine. We do not track, store, or sell your inputs, job titles, or search history."
  }
];
