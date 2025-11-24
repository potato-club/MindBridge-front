import { Post } from '../types/post'; 


export const getPopularPosts = (posts: Post[]): Post[] => {
    const popularPost = posts.find(p => p.id === '4');
    const otherPosts = posts.filter(p => p.id !== '4');
    
    const sortedOtherPosts = otherPosts
      .sort((a, b) => {
        // 점수 계산 (기존 로직 유지)
        const scoreA = a.likeCount + a.viewCount + a.commentCount;
        const scoreB = b.likeCount + b.viewCount + b.commentCount; 
        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        }
        // 최신순 정렬
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 2);
  
      return popularPost ? [popularPost, ...sortedOtherPosts] : sortedOtherPosts;
  };