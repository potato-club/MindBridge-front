import { create } from 'zustand';

// 스토어에서 관리할 상태들의 타입을 정의합니다.
interface SignUpState {
  userid: string;
  password: string;
  passwordCheck: string;
  username: string;
  phonenumber: string;
  
  // 상태를 변경할 함수들의 타입도 정의합니다.
  setUserId: (id: string) => void;
  setPassword: (pw: string) => void;
  setPasswordCheck: (pwCheck: string) => void;
  setUsername: (name: string) => void;
  setPhoneNumber: (num: string) => void;
  
  // 모든 상태를 초기화하는 함수
  reset: () => void;
}

// 초기 상태 값
const initialState = {
  userid: '',
  password: '',
  passwordCheck: '',
  username: '',
  phonenumber: '',
};

// zustand 스토어를 생성합니다.
export const useSignUpStore = create<SignUpState>((set) => ({
  ...initialState, // 초기 상태를 설정합니다.

  // 상태를 변경하는 함수들을 구현합니다.
  setUserId: (id) => set({ userid: id }),
  setPassword: (pw) => set({ password: pw }),
  setPasswordCheck: (pwCheck) => set({ passwordCheck: pwCheck }),
  setUsername: (name) => set({ username: name }),
  setPhoneNumber: (num) => set({ phonenumber: num }),

  // reset 함수를 호출하면 모든 상태가 초기값으로 돌아갑니다.
  reset: () => set(initialState),
}));