import styled from "@emotion/styled";

export const Header = styled.header`
    display: none;
`;

export const Form = styled.form`
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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin: auto;
    padding: 10vw;
    gap: 16px;
`;

export const IMG = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 50px 
    font-weight: bold;
    color:red;
`;

export const ResulText = styled.div`
    width: 100%;
    max-width: 195px;
    
    color: #212528;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
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