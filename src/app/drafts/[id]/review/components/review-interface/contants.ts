import { Section } from '.';

// 섹션 데이터 (실제로는 API에서 가져올 내용)
export const sectionDatas: Section[] = [
  {
    id: 'summary',
    title: 'TL;DR',
    content:
      'AI가 생성한 개발 명세서의 핵심 내용을 요약했습니다. 현재 인증 시스템의 보안 취약점을 해결하고 성능을 개선하는 방안을 제시합니다.',
    status: 'completed',
  },
  {
    id: 'current_behavior',
    title: '현재 동작',
    content:
      '현재 JWT 토큰 기반 인증 시스템이 24시간 만료 시간으로 설정되어 있으며, 리프레시 로직이 없어 보안상 위험이 있습니다.',
    status: 'completed',
  },
  {
    id: 'root_cause',
    title: '근본 원인',
    content:
      '장기간 유효한 JWT 토큰과 토큰 탈취 시 무력화 방법 부재가 주요 보안 취약점의 근본 원인입니다.',
    status: 'completed',
  },
  {
    id: 'solutions',
    title: '해결 방안',
    content: 'JWT 보안을 강화해야 합니다. 토큰 만료 시간 단축과 리프레시 토큰 구현이 필요합니다.',
    status: 'needs_work',
  },
  {
    id: 'learning_points',
    title: '학습 포인트',
    content:
      '보안과 사용자 경험의 균형을 맞추는 것이 핵심입니다. 단기 토큰 + 자동 갱신으로 두 마리 토끼를 잡을 수 있습니다.',
    status: 'completed',
  },
];
