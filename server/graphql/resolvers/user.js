const { ApolloError, UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../../models/user");
const { JWT_SECRET } = require("../../config");

const validateRegistration = require("../../utils/validate_registration");
const validateLogin = require("../../utils/validate-login");

const Query = {
    getUsers: async () => {
        try {
            return await User.find({});
        } catch (err) {
            throw new Error(err);
        }
    },
    getUser: async (_, { id }) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
};

const Mutation = {
    register: async (_, { registerInput }) => {
        try {
            const { valid, errors } = validateRegistration(registerInput);
            if (!valid) {
                throw new UserInputError('Input data invalid', { errors });
            }
            const { username, email, password } = registerInput;
            
            const userWithUsername = await User.findOne({ username });
            const userWithEmail = await User.findOne({ email });
            if (userWithUsername || userWithEmail) {
                throw new ApolloError(
                    'User already exists',
                    {
                        errors: {
                            username: userWithUsername ? "User with username already exists" : undefined,
                            email: userWithEmail ? "User with email already exists" : undefined,
                        }
                    }
                );
            }

            const newPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: newPassword,
                createdOn: new Date().toISOString()
            });

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            const token = jwt.sign(
                payload,
                JWT_SECRET
            );
            return {
                user: payload,
                token: `Token ${token}`
            };
        } catch (err) {
            throw err;
        }
    },
    login: async (_, { loginInput }) => {
        try {
            const { errors, valid } = validateLogin(loginInput);
            if (!valid) {
                throw new UserInputError("Input data invalid", { errors });
            }

            const { username, password } = loginInput;

            const user = await User.findOne({ username });
            if (!user) {
                errors.general = "User does not exist"
                throw new UserInputError("User does not exist", { errors });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                errors.general = "Wrong password";
                throw new UserInputError("Wrong password", { errors });
            }

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            const token = jwt.sign(
                payload,
                JWT_SECRET
            );
            return {
                user: payload,
                token: `Token ${token}`
            };
        } catch (err) {
            throw err;
        }
    }
};

module.exports = { Query, Mutation };
