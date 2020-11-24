const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getUsers: [User]!
        getUser(id: ID!): User
        getFpRewards: [FpReward]
        getFpReward: FpReward
    }

    type Mutation {
        login: User!
        register: User!
        createFpReward: FpReward!
        deleteFpReward: String!
    }

    type RegisterInput {
        email: String!
        username: String!
        password: String!
        repeatPassword: String!
    }

    type LoginInput {
        email: String
        username: String
        password: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        password: String!
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
`;
