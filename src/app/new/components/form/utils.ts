import { IntakeValues } from '@/api/project/requests.dto';
import { UseFormSetValue } from 'react-hook-form';

// 배열 필드 타입 정의
type ArrayFieldName = 'notionUrls' | 'repos' | 'focusFiles';

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

// 편의를 위한 특화 함수들 (선택적으로 사용 가능)
export const addNotionUrl = (
  input: string,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>,
  setInput: (value: string) => void
) => addArrayItem(input, array, 'notionUrls', setValue, setInput);

export const removeNotionUrl = (
  index: number,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>
) => removeArrayItem(index, array, 'notionUrls', setValue);

export const addRepo = (
  input: string,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>,
  setInput: (value: string) => void
) => addArrayItem(input, array, 'repos', setValue, setInput);

export const removeRepo = (
  index: number,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>
) => removeArrayItem(index, array, 'repos', setValue);

export const addFocusFile = (
  input: string,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>,
  setInput: (value: string) => void
) => addArrayItem(input, array, 'focusFiles', setValue, setInput);

export const removeFocusFile = (
  index: number,
  array: string[],
  setValue: UseFormSetValue<IntakeValues>
) => removeArrayItem(index, array, 'focusFiles', setValue);
