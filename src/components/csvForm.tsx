import React, { useState } from 'react';
import { ClientData } from '../pages/sendcsv';
import Papa from 'papaparse';

interface ICSVForm {
    upload: (newClients: ClientData[]) => void;
}

const CSVForm: React.FunctionComponent<ICSVForm> = props => {
    const { upload } = props
    const [error, setError] = useState('');

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            download: true,
            complete: (results) => {
                const newClients = results.data.map((client: any) => ({
                    document: client.document,
                    balance: client.balance,
                    date: new Date().toLocaleDateString()
                }));

                setError('');
                upload(newClients);
            },
            error: (error) => {
                setError(error.message);
            },
        });
    };

    return (
        <form className='file-form'>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {error && <p>{error}</p>}
        </form>
    );
}

export default CSVForm;