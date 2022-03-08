import './ListUsers.scss';

import { map, size } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import AvatarNotFound from '../../../assets/png/avatar.png';

export default function ListUsers(props) {
    const { users, setShowModal } = props;
    let navigate = useNavigate();

    const goToUser = (username) => {
        setShowModal(false);
        navigate(`/${username}`);
    };

    return (
        <div className="list-users">
            {size(users) === 0 ? (
                <p className="list-users__not-users">
                    No se han encontrado usuarios
                </p>
            ) : (
                map(users, (user, index) => (
                    <div
                        key={index}
                        className="list-users__user"
                        onClick={() => goToUser(user.username)}
                    >
                        <Image
                            src={user.avatar || AvatarNotFound}
                            avatar
                        ></Image>
                        <div>
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
