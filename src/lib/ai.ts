import { HfInference } from '@huggingface/inference';
import type {
  AIMatchResult,
  AIExtractedSkill,
  AIProfileSummary,
  AIJobInsights,
  AIIinterviewQuestion,
  Job,
  CandidateProfile,
} from '@/types';

// Initialize Hugging Face client
const hf = process.env.HUGGINGFACE_API_KEY
  ? new HfInference(process.env.HUGGINGFACE_API_KEY)
  : null;

// Model configurations
const MODELS = {
  EMBEDDING: 'sentence-transformers/all-MiniLM-L6-v2',
  SUMMARIZATION: 'facebook/bart-large-cnn',
  TEXT_GENERATION: 'google/flan-t5-base',
  CLASSIFICATION: 'distilbert-base-uncased-finetuned-sst-2-english',
} as const;

// ============ EMBEDDING UTILITIES ============

async function getEmbeddings(text: string): Promise<number[] | null> {
  if (!hf) return null;

  try {
    const response = await hf.featureExtraction({
      model: MODELS.EMBEDDING,
      inputs: text,
    });
    return response as number[];
  } catch (error) {
    console.error('Error getting embeddings:', error);
    return null;
  }
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return magnitudeA * magnitudeB === 0 ? 0 : dotProduct / (magnitudeA * magnitudeB);
}

// ============ JOB MATCHING ============

export async function matchCandidateToJob(
  candidate: CandidateProfile,
  job: Job
): Promise<AIMatchResult | null> {
  if (!hf) {
    // Return mock result if no API key
    return {
      match_score: 75,
      skill_match: 70,
      experience_match: 80,
      location_match: 90,
      matched_skills: ['JavaScript', 'React', 'TypeScript'],
      missing_skills: ['GraphQL'],
      insights: ['Good overall fit', 'Skills align well with requirements'],
    };
  }

  try {
    // Get embeddings for candidate and job
    const candidateText = `${candidate.headline || ''} ${candidate.current_title || ''}`;
    const jobText = `${job.title} ${job.description || ''} ${job.requirements.join(' ')}`;

    const candidateEmbedding = await getEmbeddings(candidateText);
    const jobEmbedding = await getEmbeddings(jobText);

    if (!candidateEmbedding || !jobEmbedding) {
      return null;
    }

    // Calculate similarity scores
    const semanticMatch = cosineSimilarity(candidateEmbedding, jobEmbedding);

    // Calculate skill match
    const candidateSkills = candidate.ai_extracted_skills || [];
    const jobSkills = extractSkillKeywords(job.description + ' ' + job.requirements.join(' '));
    const matchedSkills = candidateSkills.filter(skill => jobSkills.includes(skill));
    const missingSkills = jobSkills.filter(skill => !candidateSkills.includes(skill));
    const skillMatch = jobSkills.length > 0
      ? (matchedSkills.length / jobSkills.length) * 100
      : 50;

    // Calculate experience match
    const experienceMatch = calculateExperienceMatch(candidate, job);

    // Calculate location match
    const locationMatch = job.city === candidate.city ? 100 : candidate.willing_relocate ? 50 : 0;

    // Calculate overall match score
    const matchScore = Math.round(
      semanticMatch * 40 + skillMatch * 0.3 + experienceMatch * 0.2 + locationMatch * 0.1
    );

    return {
      match_score: Math.min(100, Math.max(0, matchScore)),
      skill_match: Math.round(skillMatch),
      experience_match: Math.round(experienceMatch),
      location_match: Math.round(locationMatch),
      matched_skills: matchedSkills,
      missing_skills: missingSkills,
      insights: generateMatchInsights(matchScore, skillMatch, experienceMatch, locationMatch),
    };
  } catch (error) {
    console.error('Error matching candidate to job:', error);
    return null;
  }
}

function extractSkillKeywords(text: string): string[] {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Angular', 'Vue.js',
    'Node.js', 'TypeScript', 'SQL', 'MongoDB', 'AWS', 'Docker',
    'Kubernetes', 'Git', 'REST API', 'GraphQL', 'HTML', 'CSS',
    'Product Management', 'Sales', 'Marketing', 'Data Analysis',
    'Machine Learning', 'Project Management', 'Leadership',
  ];

  const foundSkills: string[] = [];
  const lowerText = text.toLowerCase();

  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}

function calculateExperienceMatch(candidate: CandidateProfile, job: Job): number {
  const candidateExp = candidate.years_experience || 0;
  const requiredExp = getRequiredExperience(job.seniority);

  if (requiredExp === 0) return 100;

  if (candidateExp >= requiredExp) {
    // Cap at 100, but don't penalize too much for over-qualification
    return Math.min(100, 100 - (candidateExp - requiredExp) * 2);
  }

  // Penalize under-qualification
  return Math.max(0, (candidateExp / requiredExp) * 100);
}

function getRequiredExperience(seniority?: string): number {
  switch (seniority) {
    case 'entry':
      return 0;
    case 'mid':
      return 3;
    case 'senior':
      return 5;
    case 'lead':
      return 7;
    case 'executive':
      return 10;
    default:
      return 0;
  }
}

function generateMatchInsights(
  matchScore: number,
  skillMatch: number,
  experienceMatch: number,
  locationMatch: number
): string[] {
  const insights: string[] = [];

  if (matchScore >= 90) {
    insights.push('Excellent match with strong alignment');
  } else if (matchScore >= 70) {
    insights.push('Good match with good alignment');
  } else {
    insights.push('Moderate match - review requirements');
  }

  if (skillMatch >= 80) {
    insights.push('Skills align very well with requirements');
  } else if (skillMatch >= 50) {
    insights.push('Core skills present, consider learning missing skills');
  } else {
    insights.push('Skill gap - consider additional training');
  }

  if (experienceMatch >= 80) {
    insights.push('Experience level is a good fit');
  } else if (experienceMatch >= 50) {
    insights.push('Experience level is acceptable');
  } else {
    insights.push('Experience level may be a concern');
  }

  if (locationMatch === 100) {
    insights.push('Perfect location match');
  } else if (locationMatch >= 50) {
    insights.push('Willing to relocate considered');
  }

  return insights;
}

// ============ SKILL EXTRACTION ============

export async function extractSkillsFromText(
  text: string
): Promise<AIExtractedSkill[] | null> {
  if (!hf) {
    // Return mock result if no API key
    return [
      { name: 'JavaScript', category: 'technical', confidence: 0.95 },
      { name: 'React', category: 'technical', confidence: 0.9 },
      { name: 'Teamwork', category: 'soft', confidence: 0.85 },
    ];
  }

  try {
    const skills = extractSkillKeywords(text);
    return skills.map(skill => ({
      name: skill,
      category: categorizeSkill(skill),
      confidence: 0.85,
      evidence: text,
    }));
  } catch (error) {
    console.error('Error extracting skills:', error);
    return null;
  }
}

function categorizeSkill(skill: string): 'technical' | 'soft' | 'industry' | 'language' {
  const technicalSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Angular', 'Vue.js',
    'Node.js', 'TypeScript', 'SQL', 'MongoDB', 'AWS', 'Docker',
    'Kubernetes', 'Git', 'REST API', 'GraphQL', 'HTML', 'CSS',
  ];

  const softSkills = [
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
    'Time Management', 'Adaptability', 'Creativity', 'Collaboration',
  ];

  const languages = ['English', 'Arabic', 'French', 'German', 'Spanish'];

  if (technicalSkills.includes(skill)) return 'technical';
  if (softSkills.includes(skill)) return 'soft';
  if (languages.includes(skill)) return 'language';
  return 'industry';
}

// ============ PROFILE SUMMARIZATION ============

export async function generateProfileSummary(
  candidate: CandidateProfile
): Promise<AIProfileSummary | null> {
  if (!hf) {
    // Return mock result if no API key
    return {
      summary: 'Experienced professional with strong technical skills and a passion for innovation.',
      key_strengths: ['Technical expertise', 'Problem solving', 'Communication'],
      career_highlights: ['Led multiple successful projects', 'Consistent high performer'],
      personality_traits: ['Detail-oriented', 'Collaborative', 'Adaptable'],
      recommended_roles: ['Senior Developer', 'Tech Lead', 'Full Stack Engineer'],
    };
  }

  try {
    const inputText = `
      Headline: ${candidate.headline || ''}
      Title: ${candidate.current_title || ''}
      Company: ${candidate.current_company || ''}
      Skills: ${candidate.ai_extracted_skills?.join(', ') || ''}
      Experience: ${candidate.years_experience || 0} years
    `;

    const response = await hf.textGeneration({
      model: MODELS.SUMMARIZATION,
      inputs: inputText,
      parameters: {
        max_length: 150,
        min_length: 50,
      },
    });

    const summary = (response as { generated_text?: string }).generated_text || '';

    return {
      summary,
      key_strengths: candidate.ai_extracted_skills?.slice(0, 3) || [],
      career_highlights: ['Strong technical background', 'Industry experience'],
      personality_traits: ['Professional', 'Dedicated'],
      recommended_roles: ['Developer', 'Engineer'],
    };
  } catch (error) {
    console.error('Error generating profile summary:', error);
    return null;
  }
}

// ============ JOB DESCRIPTION ENHANCEMENT ============

export async function enhanceJobDescription(
  basicInfo: {
    title: string;
    industry?: string;
    seniority?: string;
  }
): Promise<string | null> {
  if (!hf) {
    // Return mock result if no API key
    return `We are looking for a talented ${basicInfo.title} to join our team. The ideal candidate will have strong technical skills and a passion for delivering high-quality work. You will be responsible for developing innovative solutions and collaborating with cross-functional teams.`;
  }

  try {
    const prompt = `Generate a professional job description for a ${basicInfo.title} position${basicInfo.industry ? ` in the ${basicInfo.industry} industry` : ''}${basicInfo.seniority ? ` at ${basicInfo.seniority} level` : ''}. Focus on key responsibilities and requirements.`;

    const response = await hf.textGeneration({
      model: MODELS.TEXT_GENERATION,
      inputs: prompt,
      parameters: {
        max_length: 300,
        min_length: 100,
      },
    });

    return (response as { generated_text?: string }).generated_text || '';
  } catch (error) {
    console.error('Error enhancing job description:', error);
    return null;
  }
}

// ============ INTERVIEW QUESTION GENERATION ============

export async function generateInterviewQuestions(
  job: Job
): Promise<AIIinterviewQuestion[] | null> {
  if (!hf) {
    // Return mock result if no API key
    return [
      {
        question: 'Tell me about a challenging project you worked on.',
        category: 'behavioral',
        expected_answer_points: ['Describe the situation', 'Explain your actions', 'Share the outcome'],
        tips_for_success: 'Use the STAR method: Situation, Task, Action, Result',
      },
      {
        question: 'How do you approach learning new technologies?',
        category: 'technical',
        expected_answer_points: ['Demonstrate continuous learning', 'Show examples'],
        tips_for_success: 'Highlight your adaptability and growth mindset',
      },
    ];
  }

  try {
    const prompt = `Generate 3 interview questions for a ${job.title} position. Include technical, behavioral, and situational questions.`;

    const response = await hf.textGeneration({
      model: MODELS.TEXT_GENERATION,
      inputs: prompt,
      parameters: {
        max_length: 400,
        min_length: 150,
      },
    });

    const text = (response as { generated_text?: string }).generated_text || '';

    // Parse questions (simple split for demo - in production, use more sophisticated parsing)
    const questions: AIIinterviewQuestion[] = text.split('\n')
      .filter(line => line.trim().length > 0)
      .map((line, index) => ({
        question: line.replace(/^\d+\.\s*/, ''),
        category: index % 3 === 0 ? 'technical' : index % 3 === 1 ? 'behavioral' : 'situational',
        expected_answer_points: ['Demonstrate relevant experience', 'Show problem-solving skills'],
        tips_for_success: 'Be specific and use examples',
      }))
      .slice(0, 3);

    return questions;
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return null;
  }
}

// ============ JOB INSIGHTS ============

export async function generateJobInsights(job: Job): Promise<AIJobInsights | null> {
  if (!hf) {
    // Return mock result if no API key
    return {
      difficulty_level: 'medium',
      candidate_pool_size: 50,
      competition_level: 60,
      key_success_factors: ['Relevant experience', 'Strong skills', 'Good communication'],
      suggested_preparation_tips: ['Review job requirements', 'Practice common interview questions'],
    };
  }

  try {
    // Analyze job requirements to determine difficulty
    const difficulty = determineDifficulty(job);

    return {
      difficulty_level: difficulty,
      candidate_pool_size: estimateCandidatePool(job),
      competition_level: 60,
      key_success_factors: job.requirements.slice(0, 3),
      suggested_preparation_tips: [
        'Review the company and role',
        'Prepare examples of your work',
        'Practice technical questions',
      ],
    };
  } catch (error) {
    console.error('Error generating job insights:', error);
    return null;
  }
}

function determineDifficulty(job: Job): 'easy' | 'medium' | 'hard' {
  const requirementsCount = job.requirements.length;
  const seniority = job.seniority;

  if (seniority === 'entry' || requirementsCount < 3) return 'easy';
  if (seniority === 'senior' || seniority === 'lead' || requirementsCount > 5) return 'hard';
  return 'medium';
}

function estimateCandidatePool(job: Job): number {
  // Simplified estimation - in production, use historical data
  const basePool = 100;
  const multiplier = job.seniority === 'entry' ? 2 : job.seniority === 'executive' ? 0.5 : 1;
  return Math.round(basePool * multiplier);
}

// ============ UTILITY FUNCTIONS ============

export function isAIEnabled(): boolean {
  return hf !== null;
}

export function getAIModelInfo(): { enabled: boolean; models: typeof MODELS } {
  return {
    enabled: isAIEnabled(),
    models: MODELS,
  };
}
