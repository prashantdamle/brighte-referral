import * as request from 'supertest';
import app from '../../';
import prisma from '../config/DbClient';
import { Referral } from '@prisma/client';

describe('Referrals API', () => {

    var existingRecords;
    var record1;
    var record2;

    beforeEach(async function() {
        existingRecords = await prisma.referral.findMany();

        await prisma.referral.deleteMany({});

        record1 = await prisma.referral.create({
            data: { givenName: "givenName1", surName: "surName1", email: "givenName1@surName1.com", phone: "+61444444441" }
        });
        record2 = await prisma.referral.create({
            data: { givenName: "givenName2", surName: "surName2", email: "givenName2@surName2.com", phone: "0444444442" }
        });
    });

    afterEach(async function() {
        await prisma.referral.deleteMany({});

        existingRecords.map(async function(referral) {
            await prisma.referral.create({
                data: referral
            });
        });
    });

    it('should return validation errors when required fields are missing from create api call', async () => {
        const result = await request(app).post('/referrals').send({
            givenName: null,
            surName: null,
            email: null,
            phone: null,
            addressLine: null,
            suburb: null,
            state: null,
            postCode: null,
            country: null
        });

        expect(result.status).toEqual(400);
        expect(result.body.errors.length).toBe(4);

        expect(result.body.errors[0].msg).toBe('Given name is required');
        expect(result.body.errors[0].param).toBe('givenName');
        expect(result.body.errors[0].location).toBe('body');

        expect(result.body.errors[1].msg).toBe('Surname is required');
        expect(result.body.errors[1].param).toBe('surName');
        expect(result.body.errors[1].location).toBe('body');

        expect(result.body.errors[2].msg).toBe('Email address is required');
        expect(result.body.errors[2].param).toBe('email');
        expect(result.body.errors[2].location).toBe('body');

        expect(result.body.errors[3].msg).toBe('Phone number is required');
        expect(result.body.errors[3].param).toBe('phone');
        expect(result.body.errors[3].location).toBe('body');
    });

    it('should return validation errors when invalid values are provided for the fields in create api call', async () => {
        const result = await request(app).post('/referrals').send({
            givenName: 'J',
            surName: 'D',
            email: 'invalidEmail',
            phone: '+1839405824',
            addressLine: null,
            suburb: null,
            state: null,
            postCode: null,
            country: null
        });

        expect(result.status).toEqual(400);
        expect(result.body.errors.length).toBe(4);

        expect(result.body.errors[0].msg).toBe('Given name should be between 2 and 200 characters');
        expect(result.body.errors[0].param).toBe('givenName');
        expect(result.body.errors[0].location).toBe('body');

        expect(result.body.errors[1].msg).toBe('Surname should be between 2 and 200 characters');
        expect(result.body.errors[1].param).toBe('surName');
        expect(result.body.errors[1].location).toBe('body');

        expect(result.body.errors[2].msg).toBe('Invalid email address');
        expect(result.body.errors[2].param).toBe('email');
        expect(result.body.errors[2].location).toBe('body');

        expect(result.body.errors[3].msg).toBe('Invalid Australian phone or mobile number');
        expect(result.body.errors[3].param).toBe('phone');
        expect(result.body.errors[3].location).toBe('body');
    });

    it('should return validation error when given email already exists for create api call', async () => {
        const result = await request(app).post('/referrals').send({
            givenName: 'John',
            surName: 'Doe',
            email: 'givenName1@surName1.com',
            phone: '0451234567',
            addressLine: '1 Test Road',
            suburb: 'Test Suburb',
            state: 'Test State',
            postCode: '1234',
            country: 'Test Country'
        });

        expect(result.status).toEqual(400);
        expect(result.body.errors.length).toBe(1);

        expect(result.body.errors[0].msg).toBe('Email address already exists');
        expect(result.body.errors[0].param).toBe('email');
        expect(result.body.errors[0].location).toBe('body');
    });

    it('should NOT return any validation error when all not fields are provided in update api call', async () => {
        const result = await request(app).patch(`/referrals/${record1.id}`).send({
            givenName: 'John',
            phone: '+61451234567',
            state: 'Test State',
        });

        expect(result.status).toEqual(200);
        expect(result.body.errors).toBeUndefined();

        expect(result.body.givenName).toBe('John');
        expect(result.body.surName).toBe('surName1');
        expect(result.body.email).toBe('givenName1@surName1.com');
        expect(result.body.phone).toBe('+61451234567');
        expect(result.body.state).toBe('Test State');
    });

    it('should return validation errors when invalid values are provided for the fields in update api call', async () => {
        const result = await request(app).patch(`/referrals/${record1.id}`).send({
            givenName: 'J',
            surName: 'D',
            email: 'invalidEmail',
            phone: '+1839405824',
            addressLine: null,
            suburb: null,
            state: null,
            postCode: null,
            country: null
        });

        expect(result.status).toEqual(400);
        expect(result.body.errors.length).toBe(4);

        expect(result.body.errors[0].msg).toBe('Given name should be between 2 and 200 characters');
        expect(result.body.errors[0].param).toBe('givenName');
        expect(result.body.errors[0].location).toBe('body');

        expect(result.body.errors[1].msg).toBe('Surname should be between 2 and 200 characters');
        expect(result.body.errors[1].param).toBe('surName');
        expect(result.body.errors[1].location).toBe('body');

        expect(result.body.errors[2].msg).toBe('Invalid email address');
        expect(result.body.errors[2].param).toBe('email');
        expect(result.body.errors[2].location).toBe('body');

        expect(result.body.errors[3].msg).toBe('Invalid Australian phone or mobile number');
        expect(result.body.errors[3].param).toBe('phone');
        expect(result.body.errors[3].location).toBe('body');
    });

    it('should return validation error when given email already exists for update api call', async () => {
        const result = await request(app).patch(`/referrals/${record1.id}`).send({
            givenName: 'John',
            surName: 'Doe',
            email: 'givenName2@surName2.com',
        });

        expect(result.status).toEqual(400);
        expect(result.body.errors.length).toBe(1);

        expect(result.body.errors[0].msg).toBe('Email address already exists');
        expect(result.body.errors[0].param).toBe('email');
        expect(result.body.errors[0].location).toBe('body');
    });

});
