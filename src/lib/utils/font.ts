import { DM_Serif_Display, Gugi, JetBrains_Mono } from 'next/font/google';

export const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
export const gugi = Gugi({ weight: '400', subsets: ['latin'] });

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
