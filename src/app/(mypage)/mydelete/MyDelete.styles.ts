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
    display: flex;
    justify-content: center;
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



/* 안내문 */
export const InfoText = styled.div`
  font-size: 1rem;
  padding: 10% 0;
  

  h1 {
    color: #212528;
    font-weight: 600;
    margin-bottom: 5%;
  }
`;

export const Text = styled.p`
  color: #848c95;
  opacity: 0.8;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5%;
`;

export const Warning = styled.p`
  color: #6868d5;
  font-size: 0.9rem;
  font-weight: 400;
  margin-top: 1.5%;
`;

/* 버튼 영역 */
export const DeleteButton = styled.button`
  margin-top: 10%;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  width: 90%;
  max-width: 370px;
  height: 55px;

  font-size: 1rem;
  font-weight: bold;

  color: #fff;
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

/* ===============================
  모달 스타일
================================= */

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  position: fixed;
  top: 0;
  bottom: 1;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);

  padding-top: 60%;
`;

export const Modal = styled.div`
  background-color: #fff;
  padding: 6% 3%;
  margin: 0 10%;
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 176px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 3%;
  }

  p {
    font-size: 0.8rem;
    color: #848c95;
    margin-bottom: 12%;
  }
`;

/* 모달 버튼 */
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CancelBtn = styled.button`
  padding: 5% 0%;
  border-radius: 12px;
  width: 50%;
  max-width: 130px;
  height: 100%;
  max-height: 50px;

  background-color: #f2f4f5;
  color: #333;
  font-size: 1rem;
  margin-right: 2%;
`;

export const ConfirmBtn = styled.button`
  padding: 5% 0%;
  border-radius: 12px;
  width: 50%;
  max-width: 130px;
  height: 100%;
  max-height: 50px;

  background-color: #6868d5;
  color: white;
  font-size: 1rem;
  margin-left: 2%;
`;