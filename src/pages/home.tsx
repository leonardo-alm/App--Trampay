import React from 'react';
import IPage from '../interfaces/page';
import { NavLink } from 'react-router-dom';

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div className='home-links'>
            <NavLink className='home-link' to={'/sendcsv'}>Upload new file</NavLink>
            <NavLink className='home-link' to={'/clients'}>See list of clients</NavLink>
        </div>
    )
}

export default HomePage;