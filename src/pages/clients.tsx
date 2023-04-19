import React, { useContext, useState, useEffect } from 'react';
import IPage from '../interfaces/page';
import UserContext from '../contexts/user';
import axios from 'axios'
import { ClientData } from './sendcsv';

const ClientsPage: React.FunctionComponent<IPage> = props => {
    const [clients, setClients] = useState<ClientData[]>([])
    const { token } = useContext(UserContext)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: 'http://localhost:3000/clients',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setClients(response.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchClients()

    }, [])

    return (
        <>
            <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>document</th>
                            <th>balance</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) =>
                            <tr key={index}>
                                <td>{client.document}</td>
                                <td>{client.balance}</td>
                                <td>{client.date}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default ClientsPage;