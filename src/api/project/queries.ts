import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProjects } from './apis';
import { Project } from './responses.dto';

/**
 * 프로젝트 목록 조회
 */
export const useGetProjects = (): UseQueryResult<Project[], Error> => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 300 * 1000, // 5분
    gcTime: 600 * 1000, // 10분
  });
};
