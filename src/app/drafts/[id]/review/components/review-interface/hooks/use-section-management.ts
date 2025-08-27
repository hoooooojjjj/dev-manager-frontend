import { useState } from 'react';
import { Section } from '../types';
import { sectionDatas } from '../contants';

/**
 * 섹션 관리를 위한 커스텀 훅
 * 섹션 목록, 선택된 섹션, 그리고 섹션 내용 업데이트를 담당합니다.
 */
export function useSectionManagement() {
  const [sections, setSections] = useState<Section[]>(sectionDatas);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  /**
   * 섹션을 선택합니다
   * @param section - 선택할 섹션
   */
  const selectSection = (section: Section) => {
    setSelectedSection(section);
  };

  /**
   * 특정 섹션의 내용을 업데이트합니다
   * @param sectionId - 업데이트할 섹션 ID
   * @param newContent - 새로운 내용
   */
  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSections(prev => 
      prev.map(section =>
        section.id === sectionId 
          ? { ...section, content: newContent }
          : section
      )
    );
  };

  /**
   * 선택된 섹션을 초기화합니다
   */
  const resetSelection = () => {
    setSelectedSection(null);
  };

  return {
    sections,
    selectedSection,
    selectSection,
    updateSectionContent,
    resetSelection,
  };
}