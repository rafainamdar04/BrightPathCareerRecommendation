// utils/skillGapAnalysis.ts

export interface SkillGapResult {
  alignmentScore: number
  matchedSkills: string[]
  missingSkills: string[]
  recommendations: string[]
  nextSteps: string[]
  timeEstimate: string
}

/**
 * Simple skill matching using keyword overlap
 * For production, integrate with OpenAI/Mistral embeddings
 */
export function analyzeSkillGap(
  userSkills: string[],
  requiredSkills: string[]
): SkillGapResult {
  // Normalize skills for comparison
  const normalizeSkill = (skill: string) =>
    skill.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '')

  const normalizedUserSkills = userSkills.map(normalizeSkill)
  const normalizedRequiredSkills = requiredSkills.map(normalizeSkill)

  // Find matches and gaps
  const matchedSkills: string[] = []
  const missingSkills: string[] = []

  requiredSkills.forEach((required, index) => {
    const normalizedRequired = normalizedRequiredSkills[index]
    const isMatch = normalizedUserSkills.some((userSkill) =>
      userSkill.includes(normalizedRequired) || normalizedRequired.includes(userSkill)
    )

    if (isMatch) {
      matchedSkills.push(required)
    } else {
      missingSkills.push(required)
    }
  })

  // Calculate alignment score
  const alignmentScore =
    requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0

  // Generate recommendations based on missing skills
  const recommendations = generateRecommendations(missingSkills, alignmentScore)

  // Generate next steps
  const nextSteps = generateNextSteps(missingSkills, alignmentScore)

  // Estimate time to close gap
  const timeEstimate = estimateTimeToCloseGap(missingSkills.length)

  return {
    alignmentScore,
    matchedSkills,
    missingSkills,
    recommendations,
    nextSteps,
    timeEstimate,
  }
}

function generateRecommendations(
  missingSkills: string[],
  alignmentScore: number
): string[] {
  const recommendations: string[] = []

  if (alignmentScore >= 80) {
    recommendations.push(
      "You're almost there! Focus on advanced topics to stand out from other candidates."
    )
  } else if (alignmentScore >= 60) {
    recommendations.push(
      'You have a solid foundation. Prioritize the missing skills to increase your competitiveness.'
    )
  } else if (alignmentScore >= 40) {
    recommendations.push(
      'Good start! Dedicate time to learning the core missing skills to improve your profile.'
    )
  } else {
    recommendations.push(
      'Focus on building foundational skills first. Consider structured courses or bootcamps.'
    )
  }

  // Add specific skill recommendations
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3)
    recommendations.push(
      `Priority skills to learn: ${topMissing.join(', ')}. These will have the highest impact.`
    )
  }

  return recommendations
}

function generateNextSteps(missingSkills: string[], alignmentScore: number): string[] {
  const steps: string[] = []

  if (missingSkills.length === 0) {
    steps.push('✓ Complete the roadmap items to demonstrate your expertise')
    steps.push('✓ Build portfolio projects showcasing these skills')
    steps.push('✓ Network with professionals in your target role')
    return steps
  }

  // Prioritize based on skill categories
  const technicalSkills = missingSkills.filter((s) =>
    /python|java|javascript|sql|react|node|aws|azure|machine learning|data|api/i.test(s)
  )
  const softSkills = missingSkills.filter((s) =>
    /communication|leadership|management|presentation|teamwork/i.test(s)
  )
  const certSkills = missingSkills.filter((s) =>
    /certification|certified|aws|azure|gcp|pmp/i.test(s)
  )

  if (technicalSkills.length > 0) {
    steps.push(
      `1. Start with foundational technical skills: Take online courses for ${technicalSkills[0]}`
    )
  }

  if (softSkills.length > 0) {
    steps.push(
      `2. Develop soft skills through practice: Join groups or volunteer to improve ${softSkills[0]}`
    )
  }

  if (certSkills.length > 0) {
    steps.push(`3. Plan certification path: Research requirements for ${certSkills[0]}`)
  }

  steps.push('4. Build projects that combine multiple missing skills')
  steps.push('5. Track your progress weekly and adjust your learning plan')

  return steps
}

function estimateTimeToCloseGap(missingSkillsCount: number): string {
  if (missingSkillsCount === 0) return 'You are ready now!'
  if (missingSkillsCount <= 2) return '1-2 months with dedicated learning'
  if (missingSkillsCount <= 4) return '3-4 months with consistent effort'
  if (missingSkillsCount <= 6) return '4-6 months with structured learning'
  return '6-12 months with comprehensive upskilling'
}

/**
 * Extract skills from user form data
 */
export function extractUserSkills(formData: any): string[] {
  const skills: string[] = []

  // Extract from certifications
  if (formData.Certifications) {
    const certs = formData.Certifications.split(',').map((c: string) => c.trim())
    skills.push(...certs)
  }

  // Extract from workshops
  if (formData.Workshops) {
    const workshops = formData.Workshops.split(',').map((w: string) => w.trim())
    skills.push(...workshops)
  }

  // Extract from interested subjects
  if (formData.Interested_subjects) {
    const subjects = formData.Interested_subjects.split(',').map((s: string) => s.trim())
    skills.push(...subjects)
  }

  // Add skills based on high academic performance (> 75%)
  const academicFields = [
    { key: 'Percentage_in_Algorithms', skill: 'Algorithms' },
    { key: 'Percentage_in_Programming_Concepts', skill: 'Programming' },
    { key: 'Percentage_in_Software_Engineering', skill: 'Software Engineering' },
    { key: 'Percentage_in_Computer_Networks', skill: 'Networks' },
    { key: 'Acedamic_percentage_in_Operating_Systems', skill: 'Operating Systems' },
    { key: 'Percentage_in_Computer_Architecture', skill: 'Computer Architecture' },
    { key: 'Percentage_in_Mathematics', skill: 'Mathematics' },
  ]

  academicFields.forEach(({ key, skill }) => {
    if (formData[key] && formData[key] >= 75) {
      skills.push(skill)
    }
  })

  // Add based on coding skills rating
  if (formData.Coding_skills_rating >= 7) {
    skills.push('Coding')
  }

  return [...new Set(skills)] // Remove duplicates
}
