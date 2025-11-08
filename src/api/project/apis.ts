import { post } from '@/api/client';
import { IntakeValues } from './requests.dto';

export async function createProject(data: IntakeValues): Promise<{}> {
  const response = await post<{ data: {} }>('/projects', data);
  return response.data;
}
