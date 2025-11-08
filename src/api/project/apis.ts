import { post } from '@/api/client';
import { IntakeValues } from './requests.dto';
import { Project } from './responses.dto';

export async function createProject(data: IntakeValues): Promise<Project> {
  const response = await post<{ data: Project }>('/projects', data);
  return response.data;
}
