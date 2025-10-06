import { DM_Serif_Display, Gugi, Source_Code_Pro } from 'next/font/google';

export const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
export const gugi = Gugi({ weight: '400', subsets: ['latin'] });

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
