'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type Variant = 'primary' | 'outline' | 'ghost' | 'white'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 shadow-md shadow-cyan-200 hover:shadow-lg hover:shadow-cyan-300',
  outline:
    'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100',
  ghost:
    'text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100',
  white:
    'bg-white text-cyan-700 hover:bg-slate-50 shadow-md hover:shadow-lg',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-xl',
        'transition-colors duration-200 focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-cyan-500 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  )
})

export default Button
