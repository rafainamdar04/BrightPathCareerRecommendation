import React from 'react'
import { cn } from '../../utils/cn'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export const FormField: React.FC<FormFieldProps> = ({ label, hint, error, className, id, ...props }) => {
  const inputId = id || props.name || label
  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 dark:text-gray-300">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-[#E4E4E7] dark:border-[#1F2937] placeholder-zinc-400 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-600 transition-all duration-200 ease-out',
          error && 'border-danger focus:ring-danger/30 focus:border-danger',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
