import { useState } from 'react';

/**
 * 리뷰 폼 상태 인터페이스
 */
export interface ReviewFormState {
  instruction: string;
  strictCitation: boolean;
  isProcessing: boolean;
}

/**
 * 리뷰 폼 상태 및 유효성 검사를 담당하는 커스텀 훅
 * 수정 지시문, 엄격한 인용 옵션, 처리 상태를 관리합니다.
 */
export function useReviewForm() {
  const [instruction, setInstruction] = useState('');
  const [strictCitation, setStrictCitation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 수정 지시문을 업데이트합니다
   * @param value - 새로운 지시문 값
   */
  const updateInstruction = (value: string) => {
    setInstruction(value);
  };

  /**
   * 엄격한 인용 옵션을 토글합니다
   * @param checked - 체크 여부
   */
  const toggleStrictCitation = (checked: boolean) => {
    setStrictCitation(checked);
  };

  /**
   * 처리 상태를 설정합니다
   * @param processing - 처리 중 여부
   */
  const setProcessingState = (processing: boolean) => {
    setIsProcessing(processing);
  };

  /**
   * 폼을 초기 상태로 리셋합니다
   */
  const resetForm = () => {
    setInstruction('');
    setStrictCitation(false);
    setIsProcessing(false);
  };

  /** 폼 유효성 검사 - 5자 이상의 지시문이 필요 */
  const isFormValid = instruction.trim().length >= 5;

  return {
    instruction,
    strictCitation,
    isProcessing,
    isFormValid,
    updateInstruction,
    toggleStrictCitation,
    setProcessingState,
    resetForm,
  };
}
