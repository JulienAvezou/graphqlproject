const validateRegister = (options) => {
    if (!options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.username.includes('@')) {
        return [
            {
                field: "username",
                message: "cannot include @ sign",
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "password must be greater than 2",
            },
        ];
    }
};
//# sourceMappingURL=validateRegister.js.map