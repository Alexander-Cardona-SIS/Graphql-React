const {gql} = require("apollo-server-express");

module.exports = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        password: String
        avatar: String
        createAt: String
        updateAt: String
    }
    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean
        urlAvatar: String
    }

    type Publish {
        status: Boolean
        urlFile: String
    }

    type Publication {
        id: ID
        idUser: ID
        file: String
        typeFile: String
        createAt: String
    }

    type Comment {
        idPublication: ID
        idUser: User
        comment: String
        createAt: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }

    input CommentInput {
        idPublication: ID
        comment: String
    }

    extend type Query {
        #Saludo Inicial En La Raiz
        greetings: String

        # User
        getUser(id: ID, username: String): User
        search(search: String): [User]

        # Follow
        isFollow(username: String!): Boolean
        getFollowers(username: String!): [User]
        getFollowersByMe(username: String!): [User]

        # Publications
        getPublications(username: String!): [Publication]

        # Comments
        getComments(idPublication: ID!): [Comment]

        # Like
        isLike(idPublication: ID!): Boolean
        countLikes(idPublication: ID!): Int
    }
    extend type Mutation {
        # User
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload!): UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput): Boolean

        # Follow
        follow(username: String!): Boolean
        unFollow(username: String): Boolean

        # Publication
        publish(file: Upload!): Publish

        # Upload Files
        singleUpload(file: Upload!): SuccessMessage
        multipleUpload(file: [Upload]!): SuccessMessage

        # Comment
        addComment(input: CommentInput): Comment

        # Like
        addLike(idPublication: ID!): Boolean
        deleteLike(idPublication: ID!): Boolean
    }
    type SuccessMessage {
        message: String
    }
`; 