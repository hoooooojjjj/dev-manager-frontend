import { UseFormSetValue } from 'react-hook-form';
import { IntakeValues } from './schemas';

export const addFocusFile = (
  focusFileInput: string,
  focusFiles: string[],
  setValue: UseFormSetValue<IntakeValues>,
  setFocusFileInput: (value: string) => void
) => {
  if (focusFileInput.trim() && !focusFiles.includes(focusFileInput.trim())) {
    setValue('focus_files', [...focusFiles, focusFileInput.trim()]);
    setFocusFileInput('');
  }
};

export const removeFocusFile = (
  index: number,
  focusFiles: string[],
  setValue: UseFormSetValue<IntakeValues>
) => {
  setValue(
    'focus_files',
    focusFiles.filter((_, i) => i !== index)
  );
};
