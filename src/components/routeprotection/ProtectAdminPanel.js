import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectAdminPanel = ({ children }) => {
    const { user } = useContext(AuthContext);
    const PRIME_ACCOUNT_ID = '66646b06e6db92659aa0ac2b';

    if (!user || user._id !== PRIME_ACCOUNT_ID) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectAdminPanel;

