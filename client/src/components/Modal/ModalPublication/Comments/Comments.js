import './Comments.scss';

import { useQuery } from '@apollo/client';
import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import ImageNotFound from '../../../../assets/png/avatar.png';
import { GET_COMMENTS } from '../../../../gql/comment';

export default function Comments(props) {
    const { publication } = props;
    let navigate = useNavigate();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
        variables: {
            idPublication: publication.id,
        }
    });

    useEffect(() => {
        startPolling(1000);
    
      return () => {
          stopPolling();
      }
    }, [startPolling, stopPolling])
    


    if (loading) return null;
    const {getComments} = data;

    const goToUser = (url) => {
        navigate(`/${url}`);
    };


  return (
      <div className="comments">
          {map(getComments, (comment, index) => (
              <div
                  key={index}
                  onClick={() => goToUser(comment.idUser.username)}
                  className="comment"
              >
                  <Image src={comment.idUser.avatar || ImageNotFound} avatar />
                  <div>
                      <p>{comment.idUser.username}</p>
                      <p>{comment.comment}</p>
                  </div>
              </div>
          ))}
      </div>
  );
}
