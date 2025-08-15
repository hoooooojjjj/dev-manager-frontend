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
  justify = 'center',
  align = 'center',
  wrap = 'nowrap',
  gap = 0,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        styles.flexBase,
        styles.flexDirection[direction],
        styles.justifyContent[justify],
        styles.alignItems[align],
        styles.flexWrap[wrap],
        gap,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
