import { Referral } from '@prisma/client';

export default class ReferralOutDto {
    id: number;
    createdAt: string;
    updatedAt: string;
    givenName: string;
    surName: string;
    email: string;
    phone: string;
    addressLine?: string;
    suburb?: string;
    state?: string;
    postCode?: string;
    country?: string;

    static fromModel(referral: Referral) {
        const referralOutDto = new ReferralOutDto();
        referralOutDto.id = referral.id;
        referralOutDto.createdAt = referral.createdAt.toString();
        referralOutDto.updatedAt = referral.updatedAt.toString();
        referralOutDto.givenName = referral.givenName;
        referralOutDto.surName = referral.surName;
        referralOutDto.email = referral.email;
        referralOutDto.phone = referral.phone;
        referralOutDto.addressLine = referral.addressLine;
        referralOutDto.suburb = referral.suburb;
        referralOutDto.state = referral.state;
        referralOutDto.postCode = referral.postCode;
        referralOutDto.country = referral.country;

        return referralOutDto;
    }
}
