import { Post, CategoryItem } from '../types/post'; 

export const categories: CategoryItem[] = [
  { category: 'all', name: '전체' },
  { category: 'free', name: '자유' },
  { category: 'love', name: '연애' },
  { category: 'studies', name: '공부' },
  { category: 'friends', name: '친구' },
  { category: 'family', name: '가정사' },
  { category: 'politics', name: '정치/경제' },
  { category: 'current_affairs', name: '시사/이슈' }
];

const categoryKeys = categories.map(c => c.category).filter(c => c !== 'all');
