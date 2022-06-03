import { gql } from '@apollo/client';


export const IS_FOLLOW = gql`
    query isFollow($username: String!) {
        isFollow(username: $username)
    }
`;


export const FOLLOW = gql`
    mutation follow($username: String!) {
        follow(username: $username)
    }
`;


export const UN_FOLLOW = gql`
    mutation unFollow($username: String!) {
        unFollow(username: $username)
    }
`;

export const GET_FOLLOWERS = gql`
    query getFollowers($username: String!) {
        getFollowers(username: $username) {
            name
            username
            avatar
        }
    }
`;

export const GET_FOLLOWERS_BY_ME = gql`
    query getFollowersByMe($username: String!) {
        getFollowersByMe(username: $username) {
            name
            username
            avatar
        }
    }
`;

export const GET_NOT_FOLLOWEDS = gql`
    query getNotFolloweds {
        getNotFolloweds {
            username
            name
            avatar
        }
    }
`;