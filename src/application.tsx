import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import logging from './config/logging';
import routes from './config/routes';
import { UserContextProvider } from './contexts/user';
import IUser from './interfaces/user';
import Navbar from './components/navigation';
import Footer from './components/footer';

const Application: React.FunctionComponent<{}> = props => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        logging.info('Loading application.');

        if (user === null || token === null) {
            logging.info('Not logged in in current session, checking localstorage', 'Auth');

            let _token = localStorage.getItem('token');
            let _user = localStorage.getItem('user');

            if (_user === null || _token === null) {
                logging.info('Nothing in localstorage, removing vars and redirecting');
                Logout()
                setLoading(false);
            }
            else {
                logging.info('Credentials found, verifying.', 'Auth');
                VerifyLocalStorageCredentials(_token, _user);
            }
        }
    }, []);

    const VerifyLocalStorageCredentials = async (_token: string, _user: string) => {
        try {
            logging.info(_user)

            let _parsedUser = JSON.parse(_user);
            let response = await axios({
                method: 'GET',
                url: 'http://localhost:1337/user/validate',
                headers: {
                    Authorization: `Bearer ${_token}`
                }
            });

            if (response.status === 200 || response.status === 304) {
                Login(_parsedUser, _token);
                setLoading(false);
            }
            else {
                logging.info('Credentials no longer valid', 'Auth');
                Logout();
                setLoading(false);
            }
        }
        catch (error) {
            logging.error(error, 'Auth')
            Logout();

            setLoading(false);
        }
    }

    const Login = (_user: IUser, _token: string) => {
        setUser(_user);
        setToken(_token);

        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('token', _token);
    }

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        setUser(null);
        setToken(null);
        navigate('/login');
    }

    if (loading) {
        return <div>loading...</div>;
    }

    let userContextValue = {
        user,
        token,
        Login,
        Logout
    }

    return (
        <UserContextProvider value={userContextValue}>
            <Navbar />
            <div className='main'>
                <Routes>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.component />}
                            />
                        );
                    })}
                </Routes>
            </div>
            <Footer />
        </UserContextProvider>
    );
}

export default Application;