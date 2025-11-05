import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface DashboardCardProps {
  title: string
  description?: string
  action?: React.ReactNode
  children?: React.ReactNode
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, action, children }) => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <p className="mt-1 text-sm text-zinc-500 dark:text-gray-400">{description}</p>}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
