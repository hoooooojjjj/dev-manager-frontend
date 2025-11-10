import { Loader2 } from 'lucide-react';
import * as styles from './index.css';
import { Flex } from '../Flex';

interface LoadingProps {
  size?: number;
  color?: string;
}

export function Loading({ size = 40, color = 'currentColor' }: LoadingProps) {
  return (
    <Flex justify="center" align="center">
      <Loader2 className={styles.spinner} size={size} color={color} />
    </Flex>
  );
}
