import React from 'react';
import clsx from 'clsx';
import * as styles from './flex.css';

type FlexProps = {
  direction?: keyof typeof styles.flexDirection;
  justify?: keyof typeof styles.justifyContent;
  align?: keyof typeof styles.alignItems;
  wrap?: keyof typeof styles.flexWrap;
  gap?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify,
  align,
  wrap,
  gap = 0,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        styles.flexBase,
        styles.flexDirection[direction],
        justify && styles.justifyContent[justify],
        align && styles.alignItems[align],
        wrap && styles.flexWrap[wrap],
        className
      )}
      style={{ gap: `${gap}px` }}
      {...rest}
    >
      {children}
    </div>
  );
};
