import './UsersNotFolloweds.scss';

import { useQuery } from '@apollo/client';
import { map } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import ImageNotFound from '../../../assets/png/avatar.png';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';

export default function UsersNotFolloweds() {
    let navigate = useNavigate();
    const goToUser = (url) => {
        navigate(`/${url}`);
    };

    
    const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);
    if (loading) return null;
    const { getNotFolloweds } = data;
    
    
    




  return (
      <div className="users-not-followeds">
          <h3>Usuarios que no sigues</h3>
          {map(getNotFolloweds, (user, index) => (
              <div
                  key={index}
                  onClick={() => goToUser(user.username)}
                  className="users-not-followeds__user"
              >
                  <Image src={user.avatar || ImageNotFound} avatar />
                  <span>{user.name}</span>
              </div>
          ))}
      </div>
  );
}
