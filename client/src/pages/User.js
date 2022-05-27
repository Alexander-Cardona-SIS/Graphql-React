import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Publications from '../components/Publications';
import Profile from '../components/User/Profile';
import { GET_PUBLICATIONS } from '../gql/publication';

export default function User() {
    const { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS, {
        variables: { username },
    });
    

    useEffect(() => {
        startPolling(1000);
        return () => {
            startPolling();
        };
    }, [startPolling, stopPolling]);
    


    if (loading) return null;
    const { getPublications } = data;

    const total = (size(getPublications));
    console.log("Publications", getPublications);

    return (
        <>
            <Profile username={username} totalPublications={total}/>
            <Publications getpublications={getPublications} />

        </>
    );
}
