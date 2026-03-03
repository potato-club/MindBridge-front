import styled from "@emotion/styled";

export const Header = styled.header`
    display: none;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    padding: 4vw;
    border-radius: 30px;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;

    box-sizing: border-box;
    position: relative;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direrction: column;
    align-items: center;
    margin-bottom: 20px;
    color: #212528;
`;

export const UserProfilePic = styled.div`
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background-color: #ddd;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    margin-bottom: 10px;
`;

export const UserName = styled.h2`
    font-size: 1rem;
    font-weight: bold;
`;

export const UserMileage = styled.div`
    width: 100%;
    max-width: 363px;
    height: 100%;
    max-height: 81.08px;

    padding: 81.08px;
    background-color: #6868d5;
    padding: 12px;
    margin-bottom: 5%;

    border-radius: 12px;
    text-align: center;
`;

export const UserActions = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    max-width: 402px;
    height: 100%;
    max-height: 324px;
`;

export const UserActionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #212538;
    background-color: #fff;

    padding: 12px 16px;
    font-size: 16px;
    font-weight: 550;
    cursor: pointer;

    transition: background-color 0.1s ease;
`;

export const BackButton = styled.button`
    display: display;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    font-size: 22px;
    font-weight: bold;

    backgropund: none;
    border: none;
    color: #ced4db;
    cursor: pointer;
`;

export const Logout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    color: #212528;
    font-weight: 550;
    font-size: 16px;
    
    background-color: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;

    transition: background-color 0.1s ease;
`;

/* 모달 스타일 */
export const Overlay =  styled.div`
    position: fixed;
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;
    
    background-color: rgba(0, 0, 0, 0.45);
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 999;
`;

export const Model = styled.div`
    background-color: #fff;
    padding: 30px 25px;
    
    border-radius: 16px;
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 393px;
    
    text-align: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    color: #495157;
    margin-bottom: 5%;
`;

export const ModelText = styled.p`
    font-size: 0.8rem;
    color: #848c95;
    margin-bottom: 10%;
`;

export const Buttons = styled.button`
    display: flex;
    justify-content: center;
`;

export const ComfirmButton = styled.button`
    border-radius: 12px;
    width: 50%;
    max-width: 262px;
    height: 100%;
    max-height: 50px;

    background-color: #6868d5;
    color: #fff;
    font-size: 1rem;

    margin-left: 2%;
    border: none;
    cursor: pointer;

    transition: background-color 0.1s ease;
`;