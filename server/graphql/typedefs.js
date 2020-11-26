const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        email: String!
        username: String!
        password: String!
        repeatPassword: String!
    }

    input LoginInput {
        email: String
        username: String
        password: String!
    }

    type Token {
        user: User!
        token: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        createdOn: String!
        fp: Int!
        fpRewards: [FpReward]!
        ranking: Int!
    }

    type FpReward {
        id: ID!
        fp: Int!
        reason: String
        createdAt: String!
    }

    type Query {
        getUsers: [User]!
        getUser(id: ID!): User
        getFpRewards: [FpReward]
        getFpReward: FpReward
    }

    type Mutation {
        login: Token!
        register(registerInput: RegisterInput!): Token!
        createFpReward: FpReward!
        deleteFpReward: String!
    }
`;
