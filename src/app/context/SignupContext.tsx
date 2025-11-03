import React, { createContext, useReducer, useContext } from 'react';

export type SignupState = {
    loginid: string;
    password: string;
    username: string;
    phonenumber: string;
    verified: boolean;

    //2페이지
    nickname: string;
    birth_date: Date;
    gender : Gender;
    created_at: Date;
    updated_at: Date;
};

export enum Gender {
    MALE = 'MALE',
    FEMAILE = 'FEMALE',
    NONE = 'NONE'
}

export type SignupAction = 
    | { type: 'UPDATE_FORM_DATA'; payload: Partial<SignupState> } // Partial은 상태의 일부만 업데이트할 때 사용
    | { type: 'RESET_FORM' };


export type SignupContextType = {
    state: SignupState;
    dispatch: React.Dispatch<SignupAction>;
};

const initialState: SignupState = {
    loginid: '',
    password: '',
    username: '',
    phonenumber: '',
    verified: false,
    nickname: '',
    
    birth_date: new Date(),
    gender : Gender.NONE,
    created_at: new Date(),
    updated_at: new Date(), 
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