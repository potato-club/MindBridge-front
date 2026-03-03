import styled from "@emotion/styled";

export const Header = styled.header`
    position: relative;
    text-align: center;
    padding-top: env(safe-area-inset-top, 16px);
    margin-top: 16px;
    margin-bottom: 24px;
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

export const HeaderTitle = styled.h1`
    font-size: 1rem;
    color: #1a1e20;
    margin: 0;
`;

export const Form = styled.form`
    width: 100%;
`;

export const Container = styled.div`
    postion: relative;
    width: 100%;
    max-width: min(90vw, 430px);
    margin: 0 auto;
    padding: 4vw;
    box-sizing: border-box;
`;

export const TabWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 362px;
    
    height: 52px;
    margin: 0 auto;
    
    background-color: #f2f4f5;
    color: #666e76;
    border-radius: 12px;
    overflow: hidden;
`;

export const Tab = styled.button<{ active?: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-size: 1rem;
    width: 100%;
    max-width: 175px;
    height: 100%;
    max-height: 44px;

    
    border: none;
    cursor: pointer;
    border-radius: 12px;
    
    background-color: ${({ active }) => (active ? "#fff" : '#f2f4f5')};
    color: ${({ active }) => (active ? "#212528" : "#666e76")};
`;

export const ContentWrapper = styled.div`
    position: relative;
    min-height: 250px;
    width: 100%;
    margin-top: 24px;
    box-sizing: border-box;
`;