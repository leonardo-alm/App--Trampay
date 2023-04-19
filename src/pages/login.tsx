import React, { useContext, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/user';
import { Oval } from 'react-loader-spinner';

const LoginPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate()
    const userContext = useContext(UserContext);

    const Login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (error !== '')
            setError('');

        setAuthing(true);

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username,
                    password
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201 || response.status === 304) {
                userContext.Login(response.data.username, response.data.token);
                navigate('/');
            }
            else {
                setError(response.data.msg);
                setAuthing(false);
            }
        }
        catch (error) {
            setError('Unable to sign in, please try again!');
            logging.error(error, 'Login');
            setAuthing(false);
        }
    }

    return (
        <form onSubmit={Login} className='form'>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username ..."
                onChange={event => setUsername(event.target.value)}
                value={username}
            />

            <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password ..."
                onChange={event => setPassword(event.target.value)}
                value={password}
            />

            <button
                disabled={authing}
                color="info"
            >
                {authing ?
                    <Oval
                        height={30}
                        width={30}
                        color="#272727"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    /> : "Login"}
            </button>
            <small>
                <p className="m-1 text-center">
                    Don't have an account? <Link to="/register">Register.</Link>
                </p>
            </small>
            {error && <small className="text-danger">{error}</small>}
        </form>
    );
}

export default LoginPage;