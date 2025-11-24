export interface Post {
  userId: string; 
  anonymous: boolean;
  nickname: string;
  url: string;


  category: string;
  id: string;

  title: string;
  contents: string;   

  likeCount: number;
  viewCount: number;
  commentCount: number;


  createdAt: string; 
  updatedAt: string;
}

// 2. 카테고리 배열 요소의 타입 정의
export interface CategoryItem {
  category: string;
  name: string;
}