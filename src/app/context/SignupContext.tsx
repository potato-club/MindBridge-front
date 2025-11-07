import React, { createContext, useReducer, useContext } from 'react';

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
    // createdAt: Date;
    // updatedAt: Date;
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

const initialState: SignupState = {
    loginId: '',
    password: '',
    confirmPassword: '',
    username: '',
    phoneNumber: '',
    verified: false,
    nickname: '',
    
    birthDate: '',
    gender : Gender.NONE,
    // createdAt: new Date(),
    // updatedAt: new Date(), 
};

const signupReducer = (state: SignupState, action: SignupAction): SignupState => { 
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            return { ...state, ...action.payload };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const SignupContext = createContext<SignupContextType | null>(null);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(signupReducer, initialState);

    return (
        <SignupContext.Provider value={{ state, dispatch }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignupContext = (): SignupContextType => {
    const context = useContext(SignupContext);
    if (!context) {
        throw new Error('useSignupContext 는 SignupProvider 내에서 사용되어야합니다.');
    }
    return context;
};