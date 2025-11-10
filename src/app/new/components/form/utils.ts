import { IntakeValues } from '@/api/project/requests.dto';
import { UseFormSetValue } from 'react-hook-form';

// 배열 필드 타입 정의
export type ArrayFieldName = 'notionUrls' | 'repos' | 'focusFiles';

/**
 * 배열 필드에 항목을 추가하는 공통 함수
 */
export const addArrayItem = (
  input: string,
  currentArray: string[],
  fieldName: ArrayFieldName,
  setValue: UseFormSetValue<IntakeValues>,
  setInput: (value: string) => void
) => {
  const trimmedInput = input.trim();
  if (trimmedInput && !currentArray.includes(trimmedInput)) {
    setValue(fieldName, [...currentArray, trimmedInput]);
    setInput('');
  }
};

/**
 * 배열 필드에서 항목을 제거하는 공통 함수
 */
export const removeArrayItem = (
  index: number,
  currentArray: string[],
  fieldName: ArrayFieldName,
  setValue: UseFormSetValue<IntakeValues>
) => {
  setValue(
    fieldName,
    currentArray.filter((_, i) => i !== index)
  );
};
