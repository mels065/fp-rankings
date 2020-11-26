const EMAIL_REGEX = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]{2,3}/

module.exports = (registerInput) => {
    const { username, email, password, repeatPassword } = registerInput;

    const errors = {};
    if (!username) {
        errors.username = "Username cannot be blank";
    }

    if (!email) {
        errors.email = "Email cannot be blank";
    }
    else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Must use a valid email";
    }

    if (!password) {
        errors.password = "Password cannot be blank";
    }
    else if (password != repeatPassword) {
        errors.password = "Password and repeat password must match";
    }

    return { errors, valid: Object.keys(errors).length == 0 };
}