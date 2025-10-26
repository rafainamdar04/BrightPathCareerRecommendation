import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: any }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto p-6 my-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Something went wrong</h2>
          <p className="text-sm text-red-700/80 dark:text-red-300/80">Try refreshing the page. If the problem persists, please check the console for details.</p>
        </div>
      )
    }
    return this.props.children
  }
}
