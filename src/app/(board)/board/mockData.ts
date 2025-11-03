

// 게시물 데이터의 타입을 정의합니다.
export interface Post {
  post_id: string;
  user_id: string; 
  anonymous: boolean;
  nickname:string;

  category: string;
  board_id: string;

  title: string;
  content: string;   

  like_count: number;
  view_count: number;
  comment_count: number;

  created_at: Date; 
  updated_at: Date;
}

export const categories = [
  { category: 'all', name: '전체' },
  { category: 'free', name: '자유' },
  { category: 'love', name: '연애' },
  { category: 'studies', name: '공부' },
  { category: 'friends', name: '친구' },
  { category: 'family', name: '가정사' },
  { category: 'politics', name: '정치/경제' },
  { category: 'current_affairs', name: '시사/이슈' }
];

// 카테고리 키 목록 (all 제외)
const categoryKeys = categories.map(c => c.category).filter(c => c !== 'all');

// API 연동 전 사용할 가짜(mock) 데이터 (25개 생성)
export const allPosts: Post[] = Array.from({ length: 25 }, (_, i) => {
    const assignedCategory = categoryKeys[i % categoryKeys.length];
    const now = new Date();
    now.setDate(now.getDate() - (i % 7)); 

    // bigint와 Date를 string으로 가정하여 처리
    return {
        post_id: (i + 1).toString(), 
        user_id: (i % 3 + 1).toString(),
      
        nickname: i % 3 === 0 ? '김코딩' : i % 3 === 1 ? '박해커' : '홍길동',
        
        category: assignedCategory, 
        title: `[${assignedCategory.toUpperCase()}] 게시물 제목 ${i + 1}`,
        content: `게시물 내용입니다. 이 내용은 게시물 번호 ${i + 1}에 해당합니다.`,
        
        like_count: Math.floor(Math.random() * 100),
        view_count: Math.floor(Math.random() * 200),
        comment_count: Math.floor(Math.random() * 50),
        
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
    } as Post; // Post 타입 강제 지정
});


// 인기 게시물 3개를 계산하는 함수
export const getPopularPosts = (posts: Post[]): Post[] => {
  const popularPost = posts.find(p => p.post_id === '4'); // ID를 string으로 변경
  const otherPosts = posts.filter(p => p.post_id !== '4');
  
  const sortedOtherPosts = otherPosts
    .sort((a, b) => {
      // 기존 로직 유지
      const scoreA = a.like_count + a.view_count + a.comment_count;
      const scoreB = b.like_count + b.view_count + b.comment_count; 
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 2);

    return popularPost ? [popularPost, ...sortedOtherPosts] : sortedOtherPosts;
};