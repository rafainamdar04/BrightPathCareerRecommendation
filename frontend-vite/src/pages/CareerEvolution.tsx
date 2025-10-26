import React from 'react'
// Deprecated: consolidated into Career Insights

const fieldConfig = [
  // Academic Performance (9 fields) - Percentages 0-100
  { name: 'Acedamic_percentage_in_Operating_Systems', label: 'Operating Systems', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Algorithms', label: 'Algorithms', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Programming_Concepts', label: 'Programming Concepts', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Software_Engineering', label: 'Software Engineering', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Computer_Networks', label: 'Computer Networks', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Electronics_Subjects', label: 'Electronics', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Computer_Architecture', label: 'Computer Architecture', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Mathematics', label: 'Mathematics', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Communication_skills', label: 'Communication Skills', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  
  // Work & Skills Ratings
  { name: 'Hours_working_per_day', label: 'Hours Working Per Day', type: 'number', min: 1, max: 24, category: 'Work & Skills' },
  { name: 'Logical_quotient_rating', label: 'Logical Quotient Rating (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  { name: 'Hackathons', label: 'Hackathons Participated', type: 'number', min: 0, max: 10, category: 'Work & Skills' },
  { name: 'Coding_skills_rating', label: 'Coding Skills Rating (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  { name: 'Public_speaking_points', label: 'Public Speaking Points (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  
  // Personal Capabilities
  { name: 'Can_work_long_time_before_system', label: 'Can Work Long Time Before System?', type: 'radio', options: ['yes', 'no'], category: 'Personal Capabilities' },
  { name: 'Self_learning_capability', label: 'Self Learning Capability?', type: 'radio', options: ['yes', 'no'], category: 'Personal Capabilities' },
  { name: 'Reading_and_writing_skills', label: 'Reading & Writing Skills', type: 'radio', options: ['poor', 'medium', 'excellent'], category: 'Personal Capabilities' },
  { name: 'Memory_capability_score', label: 'Memory Capability', type: 'radio', options: ['poor', 'medium', 'excellent'], category: 'Personal Capabilities' },
  
  // Additional Learning
  { name: 'Extra_courses_did', label: 'Extra Courses Did', type: 'checkbox', options: ['Yes', 'No'], category: 'Additional Learning' },
  { name: 'Certifications', label: 'Certifications', type: 'checkbox', options: ['app development', 'distro making', 'full stack', 'hadoop', 'information security', 'machine learning', 'python', 'r programming', 'shell programming'], category: 'Additional Learning' },
  { name: 'Workshops', label: 'Workshops', type: 'checkbox', options: ['cloud computing', 'data science', 'database security', 'game development', 'hacking', 'system designing', 'testing', 'web technologies'], category: 'Additional Learning' },
  
  // Interests & Career Preferences
  { name: 'Interested_subjects', label: 'Interested Subjects', type: 'checkbox', options: ['Cloud Computing', 'Computer Architecture', 'data engineering', 'hacking', 'IOT', 'Management', 'networks', 'parallel computing', 'programming', 'security', 'Software Engineering'], category: 'Interests & Preferences' },
  { name: 'Interested_career_area', label: 'Interested Career Area', type: 'radio', options: ['Business process analyst', 'Cloud Computing', 'Data engineering', 'developer', 'security', 'system developer', 'testing', 'Web development'], category: 'Interests & Preferences' },
  { name: 'Type_of_company_want_to_settle_in', label: 'Type of Company', type: 'radio', options: ['BPA', 'Cloud Services', 'Finance', 'IoT', 'product development', 'Product based', 'SAP', 'Testing and Maintainance Services', 'Web Services'], category: 'Interests & Preferences' },
  { name: 'Job_Higher_Studies', label: 'Job or Higher Studies?', type: 'radio', options: ['Job', 'Higher Studies', 'Both'], category: 'Interests & Preferences' },
  { name: 'Management_or_Technical', label: 'Management or Technical?', type: 'radio', options: ['Management', 'Technical'], category: 'Interests & Preferences' },
  
  // Work Style
  { name: 'Hard_smart_worker', label: 'Hard or Smart Worker?', type: 'radio', options: ['hard worker', 'smart worker', 'both'], category: 'Work Style' },
  { name: 'Worked_in_teams_ever', label: 'Worked in Teams?', type: 'radio', options: ['yes', 'no'], category: 'Work Style' },
] as const

interface CareerStage {
  role: string
  timeframe: string
  confidence: number
  stage: number
}

interface EvolutionResult {
  current_role: string
  future_roles: CareerStage[]
  trajectory_description: string
}

function NumberInput({ name, min, max }: { name: string, min: number, max: number }) {
  return (
    <div className="relative group">
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        placeholder="Enter number"
        required
        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
      />
      <div className="absolute -bottom-5 left-0 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
        Range: {min}-{max}
      </div>
    </div>
  )
}

function RadioGroup({ name, options }: { name: string, options: readonly string[] | string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(o => (
        <label key={o} className="relative flex-1 min-w-[120px] cursor-pointer group">
          <input type="radio" name={name} value={o as string} required className="peer sr-only" />
          <div className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-center font-medium transition-all duration-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/30 peer-checked:text-indigo-700 dark:peer-checked:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transform hover:-translate-y-0.5">
            {o}
          </div>
        </label>
      ))}
    </div>
  )
}

function CheckboxGroup({ name, options }: { name: string, options: readonly string[] | string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map(o => (
        <label key={o} className="relative cursor-pointer group block">
          <input type="checkbox" name={name} value={o as string} className="peer sr-only" />
          <div className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/30 peer-checked:text-purple-700 dark:peer-checked:text-purple-300 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-between">
            <span>{o}</span>
            <div className="relative w-5 h-5 rounded border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center transition-all">
              <svg className="w-3.5 h-3.5 text-white opacity-0 scale-50 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100" fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeWidth="3">
                <polyline points="3 8 6 11 13 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}

export function CareerEvolution() {
  if (import.meta.env.DEV) {
    console.warn('CareerEvolution page is deprecated. Use Career Insights instead.')
  }
  return null
}
