import styled from "@emotion/styled";

export const Header = styled.header`
    display: none;
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    padding: 4vw;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;

    box-sizing: border-box;
    position: relative;
`;

export const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-items: center;
    margin: 10% ;
    color: #212528;
`;

export const UserProfilePic = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 124px;
    height: 100%;
    max-height: 124px;
    margin-bottom: 30%;

    border-radius: 50%;
    background-color: #ddd;

    font-size: 80px;
`;

export const UserName = styled.button`
    font-size: 1.3rem;
    font-weight: 600;
`;

export const UserMileage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 363px;
    height: 100%;
    max-height: 81.08px;

    background-color: #6868d5;
    padding: 4% 4%; 
    margin: 2% 2%;
    margin-bottom: 5%;

    border-radius: 12px;

    cursor: pointer;
`;

export const MileageItem = styled.div`
    display: flex;  
    flex-direction: column;
`;

export const MileageText = styled.span`
    width: 100%;
    max-width: 48px;
    color: #fff;
    font-size: 0.8rem;
    margin-left: 2%;
`;

export const MileagePoint = styled.h1`
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;

    margin-left: 2%;

`;

export const MileageIcon = styled.div`
    display: flex;  
    align-items: center;
`;

export const MileageButton = styled.button`
    display: flex;  
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    font-size: 22px;
    font-weight: bold;

    background: none;
    border: none;
    color: #ced4db;
    cursor: pointer;
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

    padding: 4% 2%;
    margin-left: 2%;
    margin-right: 2%;
    font-size: 16px;
    font-weight: 575;
    cursor: pointer;

    transition: background-color 0.1s ease;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    font-size: 22px;
    font-weight: 500;

    background: none;
    border: none;
    color: #ced4db;
    cursor: pointer;
`;

export const Logout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    color: #212528;
    background-color: #fff;

    padding: 4% 2%;
    margin-left: 2%;
    margin-right: 2%;

    font-size: 16px;
    font-weight: 575;
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

export const Modal = styled.div`
    background-color: #fff;
    padding: 30px 30px;
    
    border-radius: 12px;
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 393px;
    
    
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h2`
    text-align: center;

    font-size: 1rem;
    font-weight: 700;
    color: #212528;
    margin-bottom: 5%;
`;

export const ModalSubtitle = styled.h4`
    font-size: 0.9rem;
    font-weight: 500;
    color: #495157;
`;


export const ModalText = styled.p`
    font-size: 0.8rem;
    color: #848c95;
    margin-bottom: 4%;
`;

export const ComfirmButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    gap-top: 10%;
    border-radius: 12px;
    width: 100%;
    max-width: 262px;
    height: 100%;
    max-height: 50px;


    background-color: #6868d5;
    color: #fff;
    font-size: 0.85rem;
    border: none;
    cursor: pointer;

    transition: background-color 0.1s ease;
`;
