import './HeaderProfile.scss';

import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Button } from 'semantic-ui-react';

import { FOLLOW, IS_FOLLOW, UN_FOLLOW } from '../../../../gql/follow';

export default function HeaderProfile(props) {
    const { getUser, auth, handlerModal } = props;
    // En destruturin colocamos lo que devuelve FOLLOW que seria el mismo nombre "follow"
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW);
    const { data, loading, refetch } = useQuery(IS_FOLLOW, {
        variables: {
            username: getUser.username
        }
    });

    

    const buttonFollow = () => {
        if (data.isFollow) {
            return (
                <Button className="btn-danger" onClick={onUnFollow}>
                    Dejar de seguir
                </Button>
            );
        } else {
            return (
                <Button className='btn-action' onClick={onFollow}>Seguir</Button>
            )
        }
    }

    const onFollow = async() => {
        try {
            await follow({
                variables: {
                    username: getUser.username,
                },
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    
    const onUnFollow = async () => {
        try {
            await unFollow({
                variables: {
                    username: getUser.username,
                },
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="header-profile">
            <h2>{getUser.username}</h2>
            {getUser.username === auth.username ? (
                <Button onClick={() => handlerModal("settings")}>
                    Ajustes
                </Button>
            ) : (
                !loading && buttonFollow()
            )}
        </div>
    );
}
