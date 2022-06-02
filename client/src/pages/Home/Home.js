import './Home.scss';

import isJwtTokenExpired from 'jwt-check-expiry';
import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Feed from '../../components/Home/Feed';
import { getToken, removeToken } from '../../utils/token';

export default function Home() {
    let navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/");
        } else {
            const tokenValido = isJwtTokenExpired(token);
            if (tokenValido) {
                removeToken();
                navigate("/");
            }
        }
    }, []);

    
    return (
        <Grid className="home">
            <Grid.Column className="home__left" width={11}>
                <Feed />
            </Grid.Column>
            <Grid.Column className="home__right" width={5}>
                <h2>Usuarios no seguidos</h2>
            </Grid.Column>
        </Grid>
    )
}
