export type SignupState = {
    loginId: string;
    password: string;
    confirmPassword: string;
    username: string;
    phoneNumber: string;
    verified: boolean;

    //2페이지
    nickname: string;
    birthDate: string;//날짜 타입
    gender : Gender;
  
};

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    NONE = 'NONE'
}


export type SignupAction = 
    | { type: 'UPDATE_FORM_DATA'; payload: Partial<SignupState> } 
    | { type: 'RESET_FORM' };


export type SignupContextType = {
    state: SignupState;
    dispatch: React.Dispatch<SignupAction>;
};

export const initialState: SignupState = {
    loginId: '',
    password: '',
    confirmPassword: '',
    username: '',
    phoneNumber: '',
    verified: false,
    nickname: '',
    
    birthDate: '',
    gender : Gender.NONE,
};