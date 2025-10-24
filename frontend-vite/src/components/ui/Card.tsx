import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div className={cn('rounded-2xl border border-[#E4E4E7] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm', className)} {...props} />
)

export const CardHeader: React.FC<CardHeaderProps> = ({ className, ...props }) => (
  <div className={cn('px-5 pt-5', className)} {...props} />
)

export const CardTitle: React.FC<CardTitleProps> = ({ className, ...props }) => (
  <h3 className={cn('text-lg font-semibold text-zinc-900 dark:text-gray-100', className)} {...props} />
)

export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => (
  <div className={cn('px-5 pb-5', className)} {...props} />
)
