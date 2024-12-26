'use client';
import React from 'react';

import { Loader2 } from 'lucide-react';

import { Button as ShadcnBtn } from '@/components/ui/button';

interface IButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactElement | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: 'button' | 'submit';
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  role?:
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary';
  ariaExpanded?: boolean | 'true' | 'false';
}
const Button = ({
  type = 'button',
  isLoading,
  disabled,
  children,
  onClick,
  className,
  variant,
  role,
  ariaExpanded,
}: IButtonProps) => {
  return (
    <ShadcnBtn
      role={role}
      variant={variant}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={ariaExpanded}
    >
      {isLoading && <Loader2 className='animate-spin' />}
      {children}
    </ShadcnBtn>
  );
};

export default Button;
