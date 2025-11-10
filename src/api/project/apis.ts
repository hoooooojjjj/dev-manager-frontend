import { post, get } from '@/api/client';
import { IntakeValues } from './requests.dto';
import { Project } from './responses.dto';

export async function createProject(data: IntakeValues): Promise<Project> {
  const response = await post<{ data: Project }>('/projects', data);
  return response.data;
}

export async function getProjects(): Promise<Project[]> {
  const response = await get<{ data: Project[] }>('/projects');
  return response.data;
}

export async function getProject(id: string): Promise<Project> {
  const response = await get<{ data: Project }>(`/projects/${id}`);
  return response.data;
}
