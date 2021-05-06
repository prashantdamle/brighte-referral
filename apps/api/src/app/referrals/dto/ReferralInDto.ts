import { Referral } from '@prisma/client';

export default class ReferralInDTO {
    givenName: string;
    surName: string;
    email: string;
    phone: string;
    addressLine?: string;
    suburb?: string;
    state?: string;
    postCode?: string;
    country?: string;

    constructor(payload: Partial<ReferralInDTO>) {
        this.givenName = payload.givenName || null;
        this.surName = payload.surName || null;
        this.email = payload.email || null;
        this.phone = payload.phone || null;
        this.addressLine = payload.addressLine || null;
        this.suburb = payload.suburb || null;
        this.state = payload.state || null;
        this.postCode = payload.postCode || null;
        this.country = payload.country || null;
    }

    toModel() {
        return {
            id: null,
            createdAt: null,
            updatedAt: null,
            givenName: this.givenName,
            surName: this.surName,
            email: this.email,
            phone: this.phone,
            addressLine: this.addressLine,
            suburb: this.suburb,
            state: this.state,
            postCode: this.postCode,
            country: this.country
        }
    }
}
