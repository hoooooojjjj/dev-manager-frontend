import { vars } from '@/lib/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const sectionsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const sectionButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem 1rem',
  width: '100%',
  borderRadius: '0.5rem',
  border: `1px solid ${vars.colors.buttonBorder}`,
  backgroundColor: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: vars.colors.muted,
  },
});

export const sectionButtonSelected = style([
  sectionButton,
  {
    backgroundColor: vars.colors.muted,
    borderColor: vars.colors.accentForeground,
  },
]);

export const sectionTitle = style({
  fontSize: '0.875rem',
  fontWeight: '500',
});

export const badge = style({
  flexShrink: 0,
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.5rem',
});
