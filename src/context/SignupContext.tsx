import React, { createContext, useReducer, useContext } from 'react';

import { 
    SignupState, 
    SignupAction, 
    SignupContextType, 
    initialState 
} from '@/types/signup';


export const signupReducer = (state: SignupState, action: SignupAction): SignupState => { 
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