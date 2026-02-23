import styled from "@emotion/styled";

export const Form = styled.form`
    width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justift-content: center;
    align-items: center;

    width: 100%;
    max-width: 420px;
    min-height: 100dvh;
    margin: 0 auto;
    padding:  24px;

    border-radius: 20px;
    background-color: #ffffff;
    box-sizing: border-box;

    @media (max-width: 420px) {
        padding: 16px;
    }
`;

export const Header = styled.header`
    display: none;
`;

export const LogoAndAppName = styled.div`
    text-aign: center;
    margin-bottom: 15%;
`;

export const AppName = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #3bc4ff;

    @media (max-width: 400px) {
        font-size: 24px;
    }   
`;

export const AppDescription = styled.p`
    font-size: 14px;
    color: #888;
    margin-top: 8px;
`;

export const InputWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    padding: 14px;
    margin-bottom: 14px;

    border: 1px solid #ccc;
    border-radius: 8px;

    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
        boerder-color: black;
    }
`;

export const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 15px;
    color: #444;

    &:focus {
        outline: none;
    }
`;

/* 로그인 버튼 */
export const LoginButtonWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    margin-top: 24px;
`;

export const LoginButton = styled.button`
    width: 100%;
    height: 52px;
    
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    
    background: #6868d5;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #5858c0;
    }
`;

export const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 360px;
    margin: 16px auto 0;

    @media (max-width: 400px {
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
`;

export const TextButton = styled.button`
    padding: 1px 13px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #555;
`;
