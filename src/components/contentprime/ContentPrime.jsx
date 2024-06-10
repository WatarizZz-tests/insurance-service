import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './contentprimestyle.css';
import { AuthContext } from '../../context/AuthContext';
import ChangePasswordModal from '../modal/ChangePasswordModal';
import DeleteUserModal from '../modal/DeleteUserModal';
import ChangePrimePasswordModal from '../modal/ChangePrimePasswordModal';


const ContentPrime = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', assureur: '' });
    const [primePassword, setPrimePassword] = useState('');
    const [newPasswords, setNewPasswords] = useState({});
    const [messageregister, setMessageRegister] = useState('');
    const [messagedelete, setMessageDelete] = useState('');
    const [messagepw, setMessagePw] = useState('');
    const [messagepwprime, setMessagePwPRime] = useState('');
    const { user } = useContext(AuthContext);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangePrimePasswordModalOpen, setIsChangePrimePasswordModalOpen] = useState(false);

    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userIdToChangepw, setUserIdToChangepw] = useState(null);



    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/users`, {
                headers: { userId: user._id }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

     const handleRegister = async (e) => {
        e.preventDefault();
        const userToRegister = {
            ...newUser,
            email: newUser.email.toLowerCase()
        };
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/registerassureur`, userToRegister, {
                headers: { userId: user._id }
            });
            setUsers([...users, response.data]);
            setNewUser({ username: '', email: '', password: '', assureur: '' });
            setMessageRegister('Utilisateur créé avec succès!');
            setMessagePwPRime('');
            setMessageDelete("");
            setMessagePw("");
        } catch (error) {
            console.error("Error registering user:", error);
            setMessageRegister('Erreur lors de la création de l\'utilisateur.');
            setMessagePwPRime('');
            setMessageDelete("");
            setMessagePw("");
        }
    };

    const handleDelete = async (userIdToDelete) => {
        try {
            await axios.delete(`${BASE_URL}/api/auth/users/${userIdToDelete}`, {
                headers: { userId: user._id }
            });
            setUsers(users.filter(user => user._id !== userIdToDelete));
            setMessageDelete('Utilisateur supprimé avec succès!');
            setMessagePwPRime('');
            setMessageRegister("");
            setMessagePw("");
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessageDelete('Erreur lors de la suppression de l\'utilisateur.');
            setMessagePwPRime('');
            setMessageRegister("");
            setMessagePw("");
        }
    };
    const handlePasswordInputChange = (userId, value) => {
        setNewPasswords(prevState => ({ ...prevState, [userId]: value }));
    };
    const handlePasswordChange = async () => {
        const userId = userIdToChangepw; // Get the user ID from the state
        const newPassword = newPasswords[userId];
        if (!newPassword || !userId) return; // Check if newPassword or userId is not set

        try {
            await axios.put(`${BASE_URL}/api/auth/users/${userId}/password`, { password: newPassword }, {
                headers: { userId: user._id }
            });
            setNewPasswords(prevState => ({ ...prevState, [userId]: '' }));
            fetchUsers();
            setMessagePw('Mot de passe mis à jour avec succès!');
            setMessagePwPRime('');
            setMessageDelete("");
            setMessageRegister("");

        } catch (error) {
            console.error("Error updating password:", error);
            setMessagePw('Erreur lors de la mise à jour du mot de passe.');
            setMessagePwPRime('');
            setMessageDelete("");
            setMessageRegister("");
        }
    };

    const handlePrimePasswordChange = async () => {
        if (!primePassword) {
            setMessagePwPRime('Le mot de passe ne peut pas être vide.');
            return;
        }
    
        try {
            const response = await axios.put(`${BASE_URL}/api/auth/prime/password`, { password: primePassword }, {
                headers: { userId: user._id }
            });
            
            if (response.status === 200) {
                setPrimePassword('');
                setMessagePwPRime('Mot de passe prime mis à jour avec succès!');
                setMessageDelete("");
                setMessageRegister("");
                setMessagePw("");
            } else {
                throw new Error(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating prime password:", error);
            if (error.response) {
                console.error("Server responded with status:", error.response.status);
                console.error("Response data:", error.response.data);
                setMessagePwPRime('Erreur lors de la mise à jour du mot de passe prime.');
            } else {
                console.error("No response from server:", error.message);
                setMessagePwPRime('Aucune réponse du serveur.');
            }
            setMessageDelete("");
            setMessageRegister("");
            setMessagePw("");
        }
    };

    return (
        <div className="content-prime">
            <h2>Enregistrer un nouvel utilisateur</h2>
            {messageregister && <div className="message">{messageregister}</div>}
            <form className='form-register-user-panel' onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Assureur"
                    value={newUser.assureur}
                    onChange={(e) => setNewUser({ ...newUser, assureur: e.target.value })}
                    required
                />
                <button type="submit">Enregistrer</button>
            </form>

            <h2>Tous les utilisateurs</h2>
            {messagepw && <div className="message">{messagepw}</div>}
            {messagedelete && <div className="message">{messagedelete}</div>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nom d'utilisateur</th>
                            <th>Email</th>
                            <th>Assureur</th>
                            <th>Nouveau Mot de Passe</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.assureur}</td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="Nouveau mot de passe"
                                        value={newPasswords[user._id] || ''}
                                        onChange={(e) => handlePasswordInputChange(user._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button className='table-users-button-delete' onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        setUserIdToDelete(user._id);
                                    }}>Supprimer</button>
                                    <button className='table-users-button-changepw' onClick={() => {
                                        setIsChangePasswordModalOpen(true);
                                        setUserIdToChangepw(user._id);
                                    }}>Changer le mot de passe</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>Changer mon mot de passe</h2>
            {messagepwprime && <div className="message">{messagepwprime}</div>}
            <form className='form-prime-changepw'>
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={primePassword}
                    onChange={(e) => setPrimePassword(e.target.value)}
                />
                <div
    className='table-users-button-changepw-prime'
    onClick={handlePrimePasswordChange}
    role="button"
    tabIndex={0}
>
    Changer le mot de passe
</div>
            </form>
            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onRequestClose={() => setIsChangePasswordModalOpen(false)}
                onConfirm={() => {
                    handlePasswordChange(userIdToChangepw); 
                    setIsChangePasswordModalOpen(false);
                }}
            />

            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => {
                    setIsDeleteModalOpen(false); 
                    setUserIdToDelete(null); 
                }}
                onConfirm={() => {
                    handleDelete(userIdToDelete); 
                    setIsDeleteModalOpen(false); 
                    setUserIdToDelete(null); 
                }}
            />

<ChangePrimePasswordModal
    isOpen={isChangePrimePasswordModalOpen}
    onRequestClose={() => setIsChangePrimePasswordModalOpen(false)}
    onConfirm={() => {
        handlePrimePasswordChange();  // No arguments passed
        setIsChangePrimePasswordModalOpen(false);
    }}
/>
        </div>
    );
};

export default ContentPrime;
