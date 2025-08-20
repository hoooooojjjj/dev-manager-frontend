import { FileText, Code, GitPullRequest, FileIcon, Globe, Briefcase } from 'lucide-react';

export const getCitationIcon = (type: string) => {
  switch (type) {
    case 'code':
      return <Code />;
    case 'pr':
      return <GitPullRequest />;
    case 'doc':
      return <FileIcon />;
    case 'web':
      return <Globe />;
    case 'job':
      return <Briefcase />;
    default:
      return <FileText />;
  }
};
