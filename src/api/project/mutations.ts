import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IntakeValues } from './requests.dto';
import { createProject } from './apis';
import { useToast } from '@/store/useUi';
import { useRouter } from 'next/navigation';

// 프로젝트 생성 mutation
export const useCreateProject = (): UseMutationResult<{}, Error, IntakeValues> => {
  const { success, error } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (response) => {
      success('프로젝트가 생성되었습니다! 프로젝트 대시보드로 이동합니다.');
      // router.push(`/projects/${response.projectId}`);
    },
    onError: (err: Error) => {
      error(err.message || '프로젝트 생성에 실패했습니다.', '프로젝트 생성 실패');
    },
  });
};
