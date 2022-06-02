import './Actions.scss';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import { ADD_LIKE, COUNT_LIKES, DELETE_LIKE, IS_LIKE } from '../../../../gql/like';


export default function Actions(props) {
  
    const { publication } = props;
    const [loadingAction, setLoadingAction] = useState(false);

    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);


    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id
                }
            });
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }

    const { data, loading, refetch } = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id,
        },
     });

    
    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {
            await deleteLike({
                variables: {
                    idPublication: publication.id,
                },
            });
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }
    
    const { data: dataCount, loading: loadingCount, refetch: refetchCount } = useQuery(COUNT_LIKES, {
        variables: { idPublication: publication.id },
    });

    if (loading || loadingCount) return null;
    const { isLike } = data;
    const { countLikes } = dataCount;
    

    const onAction = () => {
        if (!loadingAction) {
            if (isLike) {
                onDeleteLike();
            } else {
                onAddLike();
            }
        }
    }

    return (
        <div className="actions">
            <Icon
                className={isLike ? "like active" : "like"}
                name={isLike ? "heart" : "heart outline"}
                onClick={onAction}
            />
            {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
    );
}
