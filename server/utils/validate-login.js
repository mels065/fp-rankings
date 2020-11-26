const EMAIL_REGEX = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]{2,3}/

module.exports = (loginInput) => {
    const { username, password } = loginInput;

    const errors = {};
    if (!username) {
        errors.username = "Cannot leave username blank";
    }

    if (!password) {
        errors.password = "Cannot leave password blank";
    }

    return { errors, valid: Object.keys(errors).length === 0 };
}
