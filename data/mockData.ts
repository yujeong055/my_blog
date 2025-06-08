// 기본 인터페이스 정의
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  email: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
  updatedAt?: string;
  parentCommentId?: string;
  likes?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;    coverImage?: string;  // 이미지 필드는 빈 문자열로 남겨둠
    date: string;
    author: Author;
    category: Category;
    tags: Tag[];
    status: 'draft' | 'published';
  comments?: Comment[];
  readingTime?: number;
  viewCount?: number;
  featured?: boolean;
  aiRelated: {
    topics: string[];
    complexity: 'beginner' | 'intermediate' | 'advanced';
    technologies: string[];
    codeSnippets?: {
      language: string;
      code: string;
      description: string;
    }[];
  };
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

// 목업 데이터
export const mockAuthors: Author[] = [  {
    id: "author1",
    name: "김개발",
    avatar: "",
    bio: "AI 엔지니어 | 풀스택 개발자",
    email: "kim@example.com",
    socialLinks: {
      twitter: "https://twitter.com/kimdev",
      github: "https://github.com/kimdev",
      linkedin: "https://linkedin.com/in/kimdev"
    }
  },
  {
    id: "author2",
    name: "이인공",
    avatar: "",
    bio: "머신러닝 전문가 | 기술 블로거",
    email: "lee@example.com",
    socialLinks: {
      github: "https://github.com/lee-ai",
      linkedin: "https://linkedin.com/in/lee-ai"
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "머신러닝",
    slug: "machine-learning",
    description: "머신러닝 기초부터 고급 주제까지"
  },
  {
    id: "cat2",
    name: "딥러닝",
    slug: "deep-learning",
    description: "딥러닝 이론과 실전 응용"
  },
  {
    id: "cat3",
    name: "자연어처리",
    slug: "nlp",
    description: "NLP 관련 최신 기술과 응용"
  }
];

export const mockTags: Tag[] = [
  {
    id: "tag1",
    name: "TensorFlow",
    slug: "tensorflow",
    description: "구글의 오픈소스 머신러닝 프레임워크"
  },
  {
    id: "tag2",
    name: "PyTorch",
    slug: "pytorch",
    description: "페이스북의 딥러닝 프레임워크"
  },
  {
    id: "tag3",
    name: "Transformers",
    slug: "transformers",
    description: "자연어처리의 혁신적 아키텍처"
  }
];

export const mockPosts: BlogPost[] = [
  {
    id: "post1",
    title: "머신러닝 입문자를 위한 TensorFlow 2.0 가이드",
    slug: "tensorflow-guide-for-beginners",
    excerpt: "TensorFlow 2.0의 기본 개념과 실전 활용법을 살펴봅니다.",
    content: `
# TensorFlow 2.0 시작하기

TensorFlow 2.0은 머신러닝 입문자들을 위해 더욱 직관적인 API를 제공합니다.
이 글에서는 기본적인 모델 생성부터 학습까지 다뤄보겠습니다.

## 설치 방법
\`\`\`python
pip install tensorflow
\`\`\`

## 간단한 모델 만들기
\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(10, activation='softmax')
])
\`\`\`
    `,
    date: "2025-05-01",
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: [mockTags[0]],
    status: "published",
    readingTime: 15,
    viewCount: 1250,
    featured: true,
    aiRelated: {
      topics: ["머신러닝", "딥러닝", "TensorFlow"],
      complexity: "beginner",
      technologies: ["Python", "TensorFlow 2.0"],
      codeSnippets: [
        {
          language: "python",
          code: "import tensorflow as tf",
          description: "TensorFlow 임포트"
        }
      ]
    },
    metadata: {      seoTitle: "초보자를 위한 TensorFlow 2.0 가이드 - 실전 예제로 배우기",
      seoDescription: "TensorFlow 2.0의 기본 개념과 실전 활용법을 단계별로 학습합니다.",
      keywords: ["TensorFlow", "머신러닝", "딥러닝", "Python", "AI 입문"],
      ogImage: ""
    }
  },
  {
    id: "post2",
    title: "GPT 모델의 작동 원리 이해하기",
    slug: "understanding-gpt-models",
    excerpt: "GPT 모델의 내부 구조와 작동 원리를 상세히 살펴봅니다.",
    content: `
# GPT 모델의 구조 이해하기

GPT(Generative Pre-trained Transformer)는 현대 자연어처리의 핵심 모델입니다.
이 글에서는 GPT 모델의 구조와 작동 원리를 자세히 알아보겠습니다.

## Transformer 아키텍처
- Self-Attention 메커니즘
- Position Encoding
- Layer Normalization

## 모델 구현 예시
\`\`\`python
import torch
import torch.nn as nn

class GPTModel(nn.Module):
    def __init__(self):
        super().__init__()
        # 모델 구현
\`\`\`
    `,
    date: "2025-05-10",
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: [mockTags[2]],
    status: "published",
    readingTime: 25,
    viewCount: 3000,
    featured: true,
    aiRelated: {
      topics: ["자연어처리", "Transformer", "GPT"],
      complexity: "intermediate",
      technologies: ["PyTorch", "Transformers"],
      codeSnippets: [
        {
          language: "python",
          code: "class GPTModel(nn.Module):",
          description: "GPT 모델 클래스 정의"
        }
      ]
    },
    metadata: {
      seoTitle: "GPT 모델의 작동 원리 완벽 가이드",
      seoDescription: "GPT 모델의 내부 구조와 작동 원리를 심층적으로 이해합니다.",
      keywords: ["GPT", "Transformer", "자연어처리", "딥러닝"]
    }
  },
  {
    id: "post3",
    title: "PyTorch로 구현하는 MNIST 분류기",
    slug: "mnist-classifier-with-pytorch",
    excerpt: "PyTorch를 사용하여 간단한 MNIST 숫자 분류기를 만들어봅니다.",
    content: `
# PyTorch로 MNIST 분류기 만들기

MNIST 데이터셋을 사용하여 간단한 숫자 분류기를 구현해보겠습니다.
PyTorch의 기본적인 사용법부터 모델 학습까지 다룹니다.

## 데이터 준비
\`\`\`python
from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
\`\`\`

## 모델 정의
\`\`\`python
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)
\`\`\`
    `,
    date: "2025-05-15",
    author: mockAuthors[0],
    category: mockCategories[1],
    tags: [mockTags[1]],
    status: "published",
    readingTime: 20,
    viewCount: 1800,
    featured: false,
    aiRelated: {
      topics: ["컴퓨터 비전", "딥러닝", "PyTorch"],
      complexity: "beginner",
      technologies: ["Python", "PyTorch", "CNN"],
      codeSnippets: [
        {
          language: "python",
          code: "class Net(nn.Module):",
          description: "CNN 모델 클래스 정의"
        }
      ]
    },
    metadata: {
      seoTitle: "PyTorch로 만드는 MNIST 분류기 - 초보자 가이드",
      seoDescription: "PyTorch를 사용하여 MNIST 데이터셋으로 간단한 이미지 분류기를 구현합니다.",
      keywords: ["PyTorch", "MNIST", "CNN", "딥러닝", "이미지 분류"]
    }
  }
];
