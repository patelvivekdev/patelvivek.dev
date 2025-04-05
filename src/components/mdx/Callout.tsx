import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  AlertCircle,
  Info,
  XOctagon,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react'

const calloutVariants = cva(
  'relative mb-2 w-full rounded-lg p-4 [&>svg~*]:pl-11 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 border-l-4 border-l-primary text-foreground',
        note: 'bg-blue-50 dark:bg-blue-950/30 border-l-4 border-l-blue-500 text-blue-900 dark:text-blue-100 [&>svg]:text-blue-500',
        tip: 'bg-green-50 dark:bg-green-950/30 border-l-4 border-l-green-500 text-green-900 dark:text-green-100 [&>svg]:text-green-500',
        important:
          'bg-orange-50 dark:bg-orange-950/30 border-l-4 border-l-orange-500 text-orange-900 dark:text-orange-100 [&>svg]:text-orange-500',
        warning:
          'bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-l-yellow-500 text-yellow-900 dark:text-yellow-100 [&>svg]:text-yellow-500',
        caution:
          'bg-red-50 dark:bg-red-950/30 border-l-4 border-l-red-500 text-red-900 dark:text-red-100 [&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const icons = {
  default: Info,
  note: Info,
  tip: Lightbulb,
  important: AlertCircle,
  warning: AlertTriangle,
  caution: XOctagon,
}

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  icon?: keyof typeof icons
  title?: string | React.ReactNode
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => {
    const Icon = icons[icon || variant || 'default']

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        <Icon className='h-6 w-6' />
        <div className='space-y-2'>
          {title && (
            <h4 className='font-medium leading-none tracking-tight'>
              {typeof title === 'string' ? title.toUpperCase() : title}
            </h4>
          )}
          <div className='overflow-x-auto text-[0.925rem] leading-relaxed [&>*:first-child]:mt-0 [&>*]:mt-4 [&>code]:overflow-x-auto [&>pre]:overflow-x-auto'>
            {children}
          </div>
        </div>
      </div>
    )
  },
)
Callout.displayName = 'Callout'

export default Callout
export { calloutVariants }
