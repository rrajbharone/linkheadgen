export interface GeneratorInputs {
  jobTitle: string;
  industry: string;
  experienceLevel: string;
  skills: string;
  targetAudience: string;
  careerGoal: string;
  headlineStyle: string;
}

// Helper to clean and split skills
function parseSkills(skillsStr: string): string[] {
  return skillsStr
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Helper to select a random element from an array
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to shuffle an array
function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateHeadlines(inputs: GeneratorInputs): string[] {
  const {
    jobTitle = 'Professional',
    industry = 'Technology',
    experienceLevel = 'Senior',
    skills = 'Management',
    targetAudience = 'businesses',
    careerGoal = 'Attract Clients',
    headlineStyle = 'Professional'
  } = inputs;

  const parsedSkills = parseSkills(skills);
  const skill1 = parsedSkills[0] || 'Leadership';
  const skill2 = parsedSkills[1] || 'Strategy';
  const skill3 = parsedSkills[2] || 'Optimization';
  const allSkillsList = parsedSkills.join(' • ') || 'Leadership • Strategy';
  const commaSkills = parsedSkills.slice(0, 3).join(', ') || 'Leadership, Strategy';

  // 1. Setup modifiers based on Experience Level
  let expPrefix = '';
  let expTitleModifier = '';
  switch (experienceLevel.toLowerCase()) {
    case 'student':
      expPrefix = 'Aspiring';
      expTitleModifier = 'Student';
      break;
    case 'fresher':
      expPrefix = 'Associate';
      expTitleModifier = 'Graduate';
      break;
    case 'junior':
      expPrefix = 'Junior';
      expTitleModifier = 'Associate';
      break;
    case 'mid-level':
      expPrefix = '';
      expTitleModifier = 'Professional';
      break;
    case 'senior':
      expPrefix = 'Senior';
      expTitleModifier = 'Specialist';
      break;
    case 'manager':
      expPrefix = 'Lead';
      expTitleModifier = 'Manager';
      break;
    case 'director':
      expPrefix = 'Director of';
      expTitleModifier = 'Director';
      break;
    case 'executive':
      expPrefix = 'Executive';
      expTitleModifier = 'Leader';
      break;
    default:
      expPrefix = '';
      expTitleModifier = '';
  }

  // Determine actual job title phrasing
  const rawTitle = jobTitle.trim();
  const title = expPrefix && !rawTitle.toLowerCase().includes(expPrefix.toLowerCase()) 
    ? `${expPrefix} ${rawTitle}` 
    : rawTitle;

  // 2. Action verbs based on Career Goal
  let goalActions: string[] = [];
  let valueStatements: string[] = [];
  
  switch (careerGoal.toLowerCase()) {
    case 'get hired':
      goalActions = [
        `driving operational excellence`,
        `solving complex structural challenges`,
        `delivering scalable products and solutions`,
        `optimizing system performance and processes`,
        `building high-performance architectures`,
        `streamlining workflows and infrastructure`,
        `spearheading key initiatives`
      ];
      valueStatements = [
        `driving technical and business innovation`,
        `delivering projects on-time and under-budget`,
        `helping engineering teams scale efficiently`,
        `transforming business requirements into functional solutions`
      ];
      break;
    case 'attract clients':
      goalActions = [
        `growing business revenue`,
        `helping companies scale operations`,
        `maximizing marketing ROI and customer reach`,
        `streamlining client workflows for 10x output`,
        `optimizing digital channels and conversion funnels`,
        `unlocking hidden growth opportunities`,
        `designing premium client experiences`
      ];
      valueStatements = [
        `helping partners achieve rapid business growth`,
        `driving predictable revenue stream increases`,
        `slashing operational overhead by up to 30%`,
        `crafting high-converting visual and digital systems`
      ];
      break;
    case 'build authority':
      goalActions = [
        `defining industry standards`,
        `architecting future-ready business models`,
        `leading high-impact digital transformations`,
        `mentoring the next generation of industry leaders`,
        `shaping the future of organizational performance`,
        `advising global brands on digital excellence`,
        `transforming legacy systems into modern platforms`
      ];
      valueStatements = [
        `empowering organizations to scale responsibly`,
        `bridging the gap between cutting-edge technology and human strategy`,
        `influencing organizational design and agile adoption`,
        `published author & speaker on industry trends`
      ];
      break;
    case 'networking':
      goalActions = [
        `connecting innovators and builders`,
        `collaborating with global business leaders`,
        `sharing field insights and technical breakthroughs`,
        `fostering growth-minded professional ecosystems`,
        `facilitating strategic cross-industry partnerships`,
        `exchanging ideas on high-impact technology`
      ];
      valueStatements = [
        `building communities centered on innovation`,
        `helping industry peers connect and share resources`,
        `advocating for tech accessibility and community growth`
      ];
      break;
    case 'personal branding':
    default:
      goalActions = [
        `sharing insights on modern leadership`,
        `exploring the frontiers of next-gen technology`,
        `crafting experiences that resonate with users`,
        `bringing ideas to life through code and design`,
        `championing design thinking and clean development`,
        `empowering professionals to work smarter`
      ];
      valueStatements = [
        `sharing lessons from building scalable systems`,
        `humanizing technology through visual storytelling`,
        `helping professionals navigate their career growth`
      ];
  }

  // 3. Problem solving phrases based on Target Audience
  const audience = targetAudience.trim() || 'businesses';
  const problems = [
    `solve complex problems for ${audience}`,
    `scale operations for ${audience}`,
    `maximize ROI for ${audience}`,
    `drive digital success for ${audience}`,
    `streamline business processes for ${audience}`,
    `create competitive advantages for ${audience}`,
    `deliver growth and clarity for ${audience}`
  ];

  // 4. Achievement placeholders based on Style / Job Title
  const achievements = [
    `Helped scale teams from 0 to 50+`,
    `Generated $1M+ in business revenue`,
    `Improved system efficiency by 40%`,
    `Delivered 15+ high-impact projects`,
    `Reduced operational costs by 25%`,
    `Featured speaker at national summits`,
    `Built products used by 100k+ active users`,
    `Led multi-functional teams of 20+ professionals`
  ];

  // Helper arrays for specific styles
  const creativeOpenings = [
    `On a mission to transform`,
    `Bridging the gap between`,
    `Crafting the future of`,
    `Reimagining what's possible in`,
    `Turning ideas into reality in`
  ];

  const brandStatements = [
    `Building clean systems for a complex world`,
    `Passion for growth, technology, and user experience`,
    `Empowering others to achieve business breakthroughs`,
    `Simplifying workflows and building high-value strategies`,
    `Driven by results, design, and impact`
  ];

  // Pool of candidate headlines
  const candidates: string[] = [];

  // ================= FRAMEWORK 1: Job Title + Skills =================
  const fw1 = [
    `${title} | Specializing in ${commaSkills} | ${industry} Professional`,
    `${title} • Expert in ${skill1} & ${skill2} • ${industry} Specialist`,
    `${title} | ${allSkillsList}`,
    `${title} | Focused on ${skill1}, ${skill2} & ${skill3} | ${industry}`
  ];

  // ================= FRAMEWORK 2: Job Title + Industry + Value =================
  const fw2 = [
    `${title} in ${industry} | Helping ${audience} ${getRandomElement(goalActions)}`,
    `${title} @ ${industry} | Driving growth through high-performance ${skill1}`,
    `${title} | Helping ${audience} achieve goals via ${skill1} and ${skill2}`,
    `${title} | Specializing in ${industry} | Bridging ${skill1} & business value`
  ];

  // ================= FRAMEWORK 3: I Help X Achieve Y =================
  const fw3 = [
    `I help ${audience} ${getRandomElement(goalActions)} using ${skill1} & ${skill2} | ${title}`,
    `Helping ${audience} ${getRandomElement(goalActions)} | ${title} | ${skill1} Specialist`,
    `I build solutions that help ${audience} ${getRandomElement(goalActions)} | ${title}`,
    `Helping ${audience} conquer challenges through ${skill1} | ${title} | ${industry}`
  ];

  // ================= FRAMEWORK 4: Achievement Driven =================
  const fw4 = [
    `${title} | ${getRandomElement(achievements)} | Expert in ${skill1}`,
    `${title} | Driving ${getRandomElement(valueStatements)} | ${skill1} & ${skill2} Specialist`,
    `${title} | ${getRandomElement(achievements)} | Transforming ${industry}`,
    `${title} | Helping ${audience} save time & cost | ${getRandomElement(achievements)}`
  ];

  // ================= FRAMEWORK 5: Authority Positioning =================
  const fw5 = [
    `${title} | ${industry} Specialist | Helping ${audience} ${getRandomElement(goalActions)}`,
    `${title} | Speaker & Advisor | Driving digital excellence in ${industry}`,
    `Defining next-gen standards as a ${title} in ${industry} | ${skill1} Expert`,
    `${title} | Thought Leader in ${industry} | Specializing in ${skill1} & ${skill2}`
  ];

  // ================= FRAMEWORK 6: Recruiter Optimized =================
  const fw6 = [
    `${title} specializing in ${commaSkills} | Open to Opportunities in ${industry}`,
    `${title} | ${allSkillsList} | Open to new roles | ${experienceLevel} level`,
    `${title} | ${skill1} & ${skill2} Expert | Seeking new opportunities in ${industry}`,
    `${title} | Experienced in ${industry} | Open to ${careerGoal} opportunities`
  ];

  // ================= FRAMEWORK 7: Founder Branding =================
  const companyPl = `${industry.replace(/\s+/g, '')}Flow`;
  const fw7 = [
    `Founder @ ${companyPl} | Building the future of ${industry} | ${title}`,
    `Founder & ${title} | Helping ${audience} ${getRandomElement(goalActions)}`,
    `Co-Founder @ ${companyPl} | Transforming ${industry} with ${skill1} & ${skill2}`,
    `Founder @ ${companyPl} | ${title} | Specializing in ${skill1}`
  ];

  // ================= FRAMEWORK 8: Personal Branding =================
  const fw8 = [
    `${title} | Passionate about ${industry} & ${skill1} | ${getRandomElement(brandStatements)}`,
    `${title} | Content Creator & Speaker | Sharing insights on ${industry}`,
    `${title} | Helping professionals scale | ${getRandomElement(brandStatements)}`,
    `Cultivating innovation in ${industry} | ${title} | Creator of ${companyPl}`
  ];

  // Assemble candidate list based on style weighting
  // We want to generate a diverse set of 20 headlines.
  // We'll add 3 candidates from each framework to get 24 candidates, then shuffle and select 20.
  // Depending on the selected style, we will prioritize certain frameworks by adding more of them first.
  let pool: string[] = [];

  const style = headlineStyle.toLowerCase();

  if (style.includes('professional')) {
    // Weight heavily towards Job Title + Skills, Job Title + Industry + Value
    pool.push(...fw1, ...fw2, ...fw5.slice(0, 3), ...fw3.slice(0, 2), ...fw6.slice(0, 2), ...fw4.slice(0, 2), ...fw8.slice(0, 2));
  } else if (style.includes('executive')) {
    // Weight towards Authority, Job Title + Industry, Achievement
    pool.push(...fw5, ...fw2, ...fw4, ...fw1.slice(0, 2), ...fw3.slice(0, 2), ...fw8.slice(0, 2));
  } else if (style.includes('recruiter')) {
    // Weight towards Recruiter Optimized, Job Title + Skills
    pool.push(...fw6, ...fw1, ...fw2.slice(0, 3), ...fw4.slice(0, 3), ...fw3.slice(0, 2));
  } else if (style.includes('personal')) {
    // Weight towards Personal Brand, I Help X
    pool.push(...fw8, ...fw3, ...fw2, ...fw5.slice(0, 2), ...fw1.slice(0, 2), ...fw7.slice(0, 2));
  } else if (style.includes('achievement')) {
    // Weight towards Achievement, Authority
    pool.push(...fw4, ...fw5, ...fw1.slice(0, 3), ...fw2.slice(0, 3), ...fw3.slice(0, 2));
  } else if (style.includes('founder')) {
    // Weight towards Founder Branding, Authority
    pool.push(...fw7, ...fw5, ...fw8.slice(0, 3), ...fw2.slice(0, 3), ...fw1.slice(0, 2));
  } else if (style.includes('creative')) {
    // Add custom creative headers
    const creativePool = [
      `${getRandomElement(creativeOpenings)} ${industry} as a ${title} | ${skill1} & ${skill2}`,
      `Bridging the gap between ${industry} and ${skill1} | ${title}`,
      `${title} @ the intersection of ${skill1} & ${industry} | ${getRandomElement(brandStatements)}`,
      `Design. Build. Scale. | ${title} in ${industry} | Specialized in ${skill1}`,
      `${title} | Crafting solutions for ${audience} | Passionate about ${skill1}`
    ];
    pool.push(...creativePool, ...fw8.slice(0, 3), ...fw3.slice(0, 3), ...fw1.slice(0, 3), ...fw2.slice(0, 3));
  } else {
    // Default uniform fallback
    pool.push(...fw1, ...fw2, ...fw3, ...fw4, ...fw5, ...fw6, ...fw7, ...fw8);
  }

  // Ensure all frameworks are represented at least once to ensure variety
  pool.push(getRandomElement(fw1));
  pool.push(getRandomElement(fw2));
  pool.push(getRandomElement(fw3));
  pool.push(getRandomElement(fw4));
  pool.push(getRandomElement(fw5));
  pool.push(getRandomElement(fw6));
  pool.push(getRandomElement(fw7));
  pool.push(getRandomElement(fw8));

  // Deduplicate pool
  const uniquePool = Array.from(new Set(pool));

  // Shuffle pool to ensure fresh combinations on every click
  const shuffledPool = shuffleArray(uniquePool);

  // Return exactly 20 unique headlines, truncated if they exceed a reasonable length (optional, but they should be good)
  // Let's take the first 20.
  const finalHeadlines = shuffledPool.slice(0, 20);

  // If we somehow have fewer than 20 (unlikely), fill it up
  while (finalHeadlines.length < 20) {
    const fallback = `${title} | ${allSkillsList} | Dedicated to ${industry}`;
    if (!finalHeadlines.includes(fallback)) {
      finalHeadlines.push(fallback);
    } else {
      finalHeadlines.push(`${title} | ${skill1} Specialist | Helping ${audience} (${finalHeadlines.length + 1})`);
    }
  }

  return finalHeadlines;
}
