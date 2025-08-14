"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { label } from './label.css';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`${label} ${className || ''}`}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
