import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IntakeValues } from './requests.dto';
import { createProject } from './apis';
import { useToast } from '@/store/useUi';
import { useRouter } from 'next/navigation';
import { Project } from './responses.dto';

// 프로젝트 생성 mutation
export const useCreateProject = (): UseMutationResult<Project, Error, IntakeValues> => {
  const { success, error } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      success('프로젝트가 생성되었습니다! 프로젝트 대시보드로 이동합니다.');
      router.push(`/projects/${data.id}`);
    },
    onError: (err: Error) => {
      error(err.message || '프로젝트 생성에 실패했습니다.', '프로젝트 생성 실패');
    },
  });
};
