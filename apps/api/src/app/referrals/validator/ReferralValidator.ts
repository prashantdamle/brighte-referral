import { ValidationSchema } from 'express-validator';
import { isLengthBetween, isValidEmail, isEmailExists, isValidPhone } from './ValidationUtils'


export const createSchema: ValidationSchema = {
    givenName: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.reject('Given name is required');
                }
                if(isLengthBetween(value, 2, 200)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Given name should be between 2 and 200 characters');
                }
            },
        }
    },
    surName: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.reject('Surname is required');
                }
                if(isLengthBetween(value, 2, 200)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Surname should be between 2 and 200 characters');
                }
            },
        }
    },
    email: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.reject('Email address is required');
                }
                if (!isValidEmail(value)) {
                    return Promise.reject('Invalid email address');
                }
                return isEmailExists(req.params.id, value).catch(error => {
                   return Promise.reject('Email address already exists');
                });
            },
        }
    },
    phone: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.reject('Phone number is required');
                }
                if (!isValidPhone(value)) {
                    return Promise.reject('Invalid Australian phone or mobile number');
                }
                return Promise.resolve();
            },
        }
    }
}

export const patchSchema: ValidationSchema = {
    givenName: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.resolve();
                }
                if(isLengthBetween(value, 2, 200)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Given name should be between 2 and 200 characters');
                }
            },
        }
    },
    surName: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.resolve();
                }
                if(isLengthBetween(value, 2, 200)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Surname should be between 2 and 200 characters');
                }
            },
        }
    },
    email: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (!value) {
                    return Promise.resolve();
                }
                if (!isValidEmail(value)) {
                    return Promise.reject('Invalid email address');
                }
                return isEmailExists(req.params.id, value).catch(error => {
                   return Promise.reject('Email address already exists');
                });
            },
        }
    },
    phone: {
        in: ['body'],
        custom: {
            options: (value, { req, location, path }) => {
                if (value && !isValidPhone(value)) {
                    return Promise.reject('Invalid Australian phone or mobile number');
                }
                return Promise.resolve();
            },
        }
    }
}
