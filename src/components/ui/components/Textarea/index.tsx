import * as React from 'react';
import { textarea } from './index.css';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <textarea className={`${textarea} ${className || ''}`} ref={ref} {...props} />;
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
