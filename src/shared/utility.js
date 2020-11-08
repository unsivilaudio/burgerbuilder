export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps,
    };
};

export const checkValidity = (value, rules) => {
    if (!rules) return true;
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
        const rgxEmail = /\S+@\S+\.\S+/;
        isValid = rgxEmail.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
};
