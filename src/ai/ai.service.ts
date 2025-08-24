import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async parseTaskDescription(naturalText: string) {
    // Call AI API (OpenAI, HuggingFace, etc.)
    // Return structured task metadata
    return {
      title: 'Send report to John',
      dueDate: new Date('2025-08-29T16:00:00'),
      recurrence: 'weekly',
      priority: 'high',
      category: 'work',
    };
  }
}

