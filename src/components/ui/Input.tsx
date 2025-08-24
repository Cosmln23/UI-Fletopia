import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  type = 'text',
  className,
  id,
  ...rest
}) => {
  const inputId = id ?? React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword && showPassword ? 'text' : type;
  const describedByIds: string[] = [];

  if (helperText) describedByIds.push(`${inputId}-helper`);
  if (error) describedByIds.push(`${inputId}-error`);

  return (
    <div className={styles.wrapper}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.field}>
        <input
          id={inputId}
          className={[styles.input, error ? styles.inputError : '', className ?? ''].join(' ')}
          type={actualType}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedByIds.join(' ') || undefined}
          {...rest}
        />
        {isPassword ? (
          <button
            type="button"
            className={[styles.toggleBtn, styles.passwordToggle].join(' ')}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        ) : null}
      </div>
      {helperText ? (
        <div id={`${inputId}-helper`} className={styles.helper}>
          {helperText}
        </div>
      ) : null}
      {error ? (
        <div id={`${inputId}-error`} className={styles.errorText}>
          {error}
        </div>
      ) : null}
    </div>
  );
};


