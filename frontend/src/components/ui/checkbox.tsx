import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  className = '',
  containerClassName = '',
  labelClassName = '',
  checkboxClassName = '',
  errorClassName = '',
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={twMerge('flex flex-col', containerClassName)}>
      <div className="flex items-center">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={twMerge(
              'h-4 w-4 rounded border-input text-primary-600 focus:ring-primary-500',
              'transition-colors duration-200',
              error ? 'border-red-500' : 'border-gray-300',
              checkboxClassName,
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
        </div>
        
        {label && (
          <label
            htmlFor={checkboxId}
            className={twMerge(
              'ml-2 block text-sm text-foreground',
              error ? 'text-red-600 dark:text-red-400' : '',
              labelClassName
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
      
      {error && (
        <p
          id={`${checkboxId}-error`}
          className={twMerge(
            'mt-1 text-sm text-red-600 dark:text-red-400',
            errorClassName
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
