import React from 'react'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:shadow-md hover:-translate-y-0.5 focus:ring-primary-400',
    secondary: 'bg-white text-[#4f46e5] border border-[#E4E4E7] hover:bg-zinc-50 dark:bg-[#111827] dark:text-[#6366f1] dark:border-[#1F2937] focus:ring-primary-400',
    ghost: 'text-zinc-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-gray-800',
  }
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
