import { useState, useCallback } from 'react';

interface AIResponse {
  content: string;
  type: 'text' | 'summary' | 'mindmap' | 'analysis';
  metadata?: any;
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (
    prompt: string,
    type: 'chat' | 'summarize' | 'mindmap' | 'analyze' = 'chat'
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Mock AI responses based on type
      let response: AIResponse;

      switch (type) {
        case 'summarize':
          response = {
            content: generateSummaryResponse(prompt),
            type: 'summary',
            metadata: {
              wordCount: Math.floor(Math.random() * 500) + 100,
              readingTime: Math.floor(Math.random() * 10) + 2,
              keyTopics: ['Education', 'Learning', 'AI', 'Technology']
            }
          };
          break;

        case 'mindmap':
          response = {
            content: 'Mind map generated successfully',
            type: 'mindmap',
            metadata: {
              nodes: generateMindMapData(prompt),
              connections: Math.floor(Math.random() * 20) + 10
            }
          };
          break;

        case 'analyze':
          response = {
            content: generateAnalysisResponse(prompt),
            type: 'analysis',
            metadata: {
              sentiment: 'positive',
              complexity: 'intermediate',
              topics: ['Learning', 'Education', 'AI']
            }
          };
          break;

        default:
          response = {
            content: generateChatResponse(prompt),
            type: 'text'
          };
      }

      return response;
    } catch (err) {
      const errorMessage = 'Failed to generate AI response. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateChatResponse = (prompt: string): string => {
    const responses = [
      "That's a great question! Let me help you understand this concept better.",
      "I can definitely assist you with that. Here's what you need to know:",
      "Excellent topic to explore! Let me break this down for you:",
      "I'm here to help you learn. Let me explain this step by step:",
      "That's an interesting point. Here's my analysis:"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} Based on your question about "${prompt}", I can provide detailed insights and explanations to help you understand this topic better. Would you like me to elaborate on any specific aspect?`;
  };

  const generateSummaryResponse = (content: string): string => {
    return `**Summary of Content:**

**Key Points:**
• Main concept focuses on educational technology and AI integration
• Emphasis on personalized learning experiences
• Discussion of modern teaching methodologies
• Analysis of student engagement strategies

**Important Insights:**
• AI-powered tools enhance learning efficiency by 40-60%
• Interactive content improves retention rates significantly
• Collaborative learning environments foster better understanding
• Real-time feedback mechanisms accelerate skill development

**Conclusion:**
The content highlights the transformative impact of AI in education, emphasizing the importance of adaptive learning systems and personalized educational experiences.`;
  };

  const generateAnalysisResponse = (content: string): string => {
    return `**Content Analysis:**

**Overview:**
This content demonstrates strong educational value with clear learning objectives and well-structured information delivery.

**Strengths:**
• Clear and concise presentation of concepts
• Good use of examples and practical applications
• Appropriate difficulty level for target audience
• Engaging and interactive elements

**Recommendations:**
• Consider adding more visual aids for complex concepts
• Include practice exercises for better retention
• Add cross-references to related topics
• Implement progress tracking mechanisms

**Educational Impact:**
High potential for knowledge transfer and skill development. Content is well-suited for both individual study and collaborative learning environments.`;
  };

  const generateMindMapData = (topic: string) => {
    return {
      central: topic,
      branches: [
        {
          name: 'Core Concepts',
          subbranches: ['Fundamentals', 'Principles', 'Theory']
        },
        {
          name: 'Applications',
          subbranches: ['Practical Use', 'Real-world Examples', 'Case Studies']
        },
        {
          name: 'Advanced Topics',
          subbranches: ['Research', 'Innovation', 'Future Trends']
        },
        {
          name: 'Resources',
          subbranches: ['Books', 'Articles', 'Videos', 'Tools']
        }
      ]
    };
  };

  return {
    generateResponse,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};