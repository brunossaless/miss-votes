import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4 py-2.5 sm:min-h-9 sm:py-2'

const variantStyles = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-secondary hover:text-foreground',
} as const

export type ButtonVariant = keyof typeof variantStyles

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function buttonClassName(
  variant: ButtonVariant = 'default',
  className?: string,
) {
  return cn(baseStyles, variantStyles[variant], className)
}

export function Button({
  variant = 'default',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  )
}
