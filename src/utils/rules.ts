export const emailValidator = (rule: any, value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || emailRegex.test(value)) {
        return Promise.resolve();
    }

    return Promise.reject('Please enter a valid email address!');
};

export const validatePassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
});
export const validateStrongPassword = () => ({
    validator(_: any, value: any) {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasDigit = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

        if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
            return Promise.resolve();
        }

        return Promise.reject(
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!',
        );
    },
});

export const validateName = (_: any, value: any) => {
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(value)) {
        return Promise.reject('Only letters are allowed');
    }

    return Promise.resolve();
};

export const validateButRequired = (_: any, value: any) => {
    if (!value) {
        return Promise.resolve();
    }

    const regex = /^[A-Za-z\s]*$/;

    if (!regex.test(value)) {
        return Promise.reject('Only letters and spaces are allowed');
    }

    return Promise.resolve();
};

export const validatePhoneNumber = (_: any, value: any) => {
    const regex = /^\d{10}$/;

    if (!regex.test(value)) {
        return Promise.reject('Please enter a valid 10-digit phone number');
    }

    return Promise.resolve();
};
