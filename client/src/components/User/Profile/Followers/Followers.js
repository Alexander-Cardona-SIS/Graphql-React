import './Followers.scss';

import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import React, { useEffect, useState } from 'react';

import { GET_FOLLOWERS, GET_FOLLOWERS_BY_ME } from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';

export default function Followers(props) {
    const { username } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    const {
        // usamos funciones de useQuery pero con alias
        data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers,
    } = useQuery(GET_FOLLOWERS, {
        variables: {
            username: username,
        },
    });

    const {
        // usamos funciones de useQuery pero con alias
        data: dataFollowersByMe,
        loading: loadingFollowersByMe,
        startPolling: startPollingFollowersByMe,
        stopPolling: stopPollingFollowersByMe,
    } = useQuery(GET_FOLLOWERS_BY_ME, {
        variables: {
            username: username,
        },
    });

    // Al usar startPolling y StopPolling activamos el "REALTIME", el cual causa un cambio en el cliente
    // y por ello React debera repintar .
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        };
    }, [startPollingFollowers, stopPollingFollowers]);

    useEffect(() => {
        startPollingFollowersByMe(1000);
        return () => {
            stopPollingFollowersByMe();
        };
    }, [startPollingFollowersByMe, stopPollingFollowersByMe]);

    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildrenModal(
            <ListUsers users={getFollowers} setShowModal={setShowModal} />
        );
        setShowModal(true);
    };
    
    const openFollowersByMe = () => {
        setTitleModal("Usuarios seguidos");
        setChildrenModal(
            <ListUsers users={getFollowersByMe} setShowModal={setShowModal} />
        );
        setShowModal(true);
    };

  // evitamos que haga algo antes de obtener datos
  if (loadingFollowers || loadingFollowersByMe) return null;
  const { getFollowers } = dataFollowers;
  const { getFollowersByMe } = dataFollowersByMe;
  

    return (
        <>
            <div className="followers">
                <p>
                    <span>**</span> publicaciones
                </p>
                <p className="link" onClick={openFollowers}>
                    <span>{size(getFollowers)}</span> seguidores
                </p>
                <p className="link" onClick={openFollowersByMe}>
                    <span>{size(getFollowersByMe)}</span> seguidos
                </p>
            </div>
            <ModalBasic
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
            >
          {childrenModal}
            </ModalBasic>
        </>
    );
}
