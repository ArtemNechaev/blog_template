import React from 'react';
import { Provider as AuthProvider, Session } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import {Store} from 'redux';

interface ProviderProps {
    children: React.ReactNode,
    session: Session,
    store: Store
}
export const JoinedProvider = (props: ProviderProps) => {
    const { children, session, store } = props;
    return (
        <ReduxProvider store={store}>
            <AuthProvider session={session}>
                {children}
            </AuthProvider>
        </ReduxProvider>
    )
}

export default JoinedProvider;