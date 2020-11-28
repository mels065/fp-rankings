const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        email: String!
        username: String!
        password: String!
        repeatPassword: String!
    }

    input LoginInput {
        username: String!
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
        amount: Int!
        reason: String
        createdAt: String!
        recipient: User!
        creator: User!
    }

    type Query {
        getUsers: [User]!
        getUser(id: ID!): User!
        getFpRewards: [FpReward]!
        getFpReward(id: ID!): FpReward!
    }

    type Mutation {
        login(loginInput: LoginInput!): Token!
        register(registerInput: RegisterInput!): Token!
        createFpReward: FpReward!
        deleteFpReward: String!
    }
`;
