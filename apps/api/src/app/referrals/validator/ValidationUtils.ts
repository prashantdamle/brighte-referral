import referralRepository from '../repository/ReferralRepository';
import { isValidPhoneNumber } from 'libphonenumber-js'

export const isLengthBetween = (value:string, min: number, max: number) => {
    return value.length >= min && value.length <= max;
}

export const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export const isEmailExists = async (referralId: number, email: string) => {
    const referral = await referralRepository.getReferralByEmail(email);
    if (referral && referral.id != referralId) {
        throw new Error();
    }
}

export const isValidPhone = (phone: string) => {
    return isValidPhoneNumber(phone, 'AU');
}