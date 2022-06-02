import './Feed.scss';

import { useQuery } from '@apollo/client';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import ImageNotFound from '../../../assets/png/avatar.png';
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import ModalPublication from '../../Modal/ModalPublication';
import Action from '../../Modal/ModalPublication/Actions';
import CommentForm from '../../Modal/ModalPublication/CommentForm';

export default function Feed() {
    const [showModal, setShowModal] = useState(false);
    const [publicationSelect, setPublicationSelect] = useState(null);
    let navigate = useNavigate();
    const { data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

    
    useEffect(() => {
        startPolling(1000);

        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);
    




    if (loading) return null;
    const { getPublicationsFolloweds } = data;


    const openPublication = (publication) => {
        setPublicationSelect(publication);
        setShowModal(true);
    }

    const goToUser = (url) => {
        navigate(`/${url}`);
    };




    return (
        <>
            <div className="feed">
                {map(getPublicationsFolloweds, (publication, index) => (
                    <div key={index} className="feed__box">
                        <div
                            className="feed__box-user"
                            onClick={() =>
                                goToUser(publication.idUser.username)
                            }
                        >
                            <Image
                                src={publication.idUser.avatar || ImageNotFound}
                                avatar
                            />
                            <span>{publication.idUser.name}</span>
                        </div>
                        <div
                            className="feed__box-photo"
                            style={{ backgroundImage: `url("${publication.file}")` }}
                            onClick={()=>openPublication(publication)}
                        />
                        <div className="feed__box-actions">
                            <Action publication={publication} />
                        </div>

                        <div className="feed__box-form">
                            <CommentForm publication={publication} />
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <ModalPublication
                    show={showModal}
                    setShow={setShowModal}
                    publication={publicationSelect}
                />
            )}
        </>
    );
}
