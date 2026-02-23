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
    min-height: 40dvh;
    
    margin: 0 auto;
    padding: 4vw;
    border-radius: 30px;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;

    box-sizing: border-box;
    position: relative;
`;



export const User = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 3vw;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    color: #343a3f;
`;

export const Input = styled.input`
    flex: 1;
    padding: 0.75rem;
    background-color: #f8fafb;
    font-size: 0.95rem;

    color: #666e76;

    border: 1px solid transparent;
    border-radius: 12px;
    outline: none;
    box-sizing: border-box;
    
    &:hover {
        border-color: #000000;
    }

`;

export const UserName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: 47px;
    font-size: 0.75rem;
    
    border-radius: 12px;
    box-sizing: border-box;
`;

/* input + button */
export const UserRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    width: 100%;
    height: 47px;
    
    border-radius: 12px;
    box-sizing: border-box;
`;

/* SendButton 이걸로 통일 */
export const SendButton = styled.button`
    width: 98px;
    height: 47px;
    
    font-size: 0.875rem;
    font-weight: 600;
    
    color: #6868d5;
    background-color: #ffffff;
    
    border: 1px solid #6868d5;
    border-radius: 12px;
    
    cursor: pointer;
    white-space: nowrap;
    
    &:hover {
        background-color: #6868d5;
        color: #ffffff;
    }

    @media screen and (max-width: 400px) {
        font-size: 0.8rem;
        padding: 0.5rem;
    }
`;

export const VerifyMessage = styled.p`
    margin-top: 0.9rem;
    font-size: 0.75rem;
    color: #ff4d4f;
`;

/* 하단 고정 버튼 */
export const SubmitButton = styled.button`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);

    bottom: clamp(20px, 10dvh, 100px);

    width: 90%;
    max-width: 370px;
    height: 55px;
    
    font-size: 1rem;
    font-weight: bold;

    color: #ffffff;
    background-color: #6868d5;

    border: none;
    border-radius: 12px;
    cursor: pointer;

    transition: background 0.2s ease-in-out;

    &:hover {
        background-color: #5757c9;
    }

    @media screen and (max-width: 400px) {
        font-size: 0.9rem;
        height: 50px;
    }
`;