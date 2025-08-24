'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tabsList, tabsContent, tabsTriggerBase, tabsTriggerVariants } from './tabs.css';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={`${tabsList} ${className || ''}`} {...props} />
));
TabsList.displayName = TabsPrimitive.List.displayName;

type TabsTriggerVariants = {
  color?: 'default' | 'green' | 'blue' | 'purple';
};

export interface TabsTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'color'>,
    TabsTriggerVariants {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, color = 'default' as const, ...props }, ref) => {
  const colorClass = tabsTriggerVariants[color as keyof typeof tabsTriggerVariants];

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={`${tabsTriggerBase} ${colorClass} ${className || ''}`}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={`${tabsContent} ${className || ''}`} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
