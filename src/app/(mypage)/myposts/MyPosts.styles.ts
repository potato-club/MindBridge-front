import styled from "@emotion/styled";

export const Header = styled.header`
    position: relative;
    text-align: center;
    padding-top: env(safe-area-inset-top, 16px);
    margin-top: 16px;
    margin-bottom: 24px;
`;

export const HeaderTitle = styled.h1`
    font-size: 1rem;
    color: #1a1e20;
    margin: 0;
`;

export const BackButton = styled.button`
    position: absolute;
    top: calc(env(safe-area-inset-top, 0px) + 16px);
    left: 16px;

    display: flex;
    align-items: center;
    justify-contnet: center;

    width: 24px;
    height: 24px;
    font-size: 22px;
    font-weight: bold;

    background: none;
    border: none;
    color: #212528;
    cursor: poionter;
`;

export const Form = styled.form`
    width: 100%;
`;

/* 전체 컨테이너 */
export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: min(90vw, 420px);
  margin: 0 auto;
  padding: 4vw;
  box-sizing: border-box;
`;

export const PostsList = styled.div`
    display: felx;
    flex-direction: column;
    gap: 1rem;
`;

export const PostItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    
    width: 100%;
    max-width: 362px;
    height: 100%;
    max-height: 85px;

    padding: 1% 0;
    border-bottom: 1px solid #f2f4f5;
    
    background-color: #fff;
`;

export const MoreWrapper = styled.div`
    position: absolute;
    top: 2%;
    right: 2%;
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 1% 2%;
    color: #abb5bd
`;

// 제목
export const PostTitle = styled.h3`
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 78px;
    
    font-size: 1rem;
    font-weight: 600;
    color: #212528;
    
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

/* 본문 */
export const PostContent = styled.p`
  font-size: 0.75rem;
  color: #abb5bd;
  margin-bottom: 4%;
  line-height: 1.5;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

/* 날짜 */
export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.75rem;
  color: #abb5bd;
  margin-top: 0.3rem;
`;

/* 통계 */
export const PostStats = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;

  img {
    vertical-align: bottom;
    width: 100%;
    max-width: 25px;
    height: 100%;
    max-height: 17px;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: #abb5bd;
  }
`;