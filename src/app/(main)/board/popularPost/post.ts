// post.ts

// 게시물 데이터의 타입을 정의합니다.
export interface Post {
  id: number;
  title: string;
  content?: string; 
  author: string;   
  likes: number;
  views: number;
  comments: number;
  createdAt: string; 
}