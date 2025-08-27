import { Section, Review, ReviewRequest } from '../types';

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateSection = (section: Section): void => {
  if (!section.id.trim()) {
    throw new ValidationError('Section ID is required', 'id');
  }
  if (!section.title.trim()) {
    throw new ValidationError('Section title is required', 'title');
  }
  if (!section.content.trim()) {
    throw new ValidationError('Section content is required', 'content');
  }
};

export const validateReviewRequest = (request: ReviewRequest): void => {
  validateSection(request.section);
  
  if (!request.instruction.trim()) {
    throw new ValidationError('Review instruction is required', 'instruction');
  }
  
  if (request.instruction.length < 10) {
    throw new ValidationError('Review instruction must be at least 10 characters long', 'instruction');
  }
};

export const validateReview = (review: Review): void => {
  if (!review.id.trim()) {
    throw new ValidationError('Review ID is required', 'id');
  }
  if (!review.sectionId.trim()) {
    throw new ValidationError('Section ID is required', 'sectionId');
  }
  if (!review.originalContent.trim()) {
    throw new ValidationError('Original content is required', 'originalContent');
  }
  if (!review.revisedContent.trim()) {
    throw new ValidationError('Revised content is required', 'revisedContent');
  }
};

export const isValidInstruction = (instruction: string): boolean => {
  return instruction.trim().length >= 10;
};