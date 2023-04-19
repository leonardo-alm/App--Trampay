import React, { useContext } from 'react';
import IPage from '../interfaces/page';
import UserContext from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import ClientForm from '../components/csvForm';
import axios from 'axios';

export interface ClientData {
    document: string;
    balance: number;
    date: string;
}

const SendCSVPage: React.FunctionComponent<IPage> = props => {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    const SendCSV = async (newClients: ClientData[]) => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/clients',
                data: newClients,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                navigate('/clients')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='main upload'>
            <ClientForm upload={SendCSV} />
        </div>

    );
}

export default SendCSVPage;