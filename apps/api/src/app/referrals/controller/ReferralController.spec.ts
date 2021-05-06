import * as request from 'supertest';
import app from '../../';
import prisma from '../config/DbClient';
import { Referral } from '@prisma/client';
import { _ } from 'lodash';

describe('Referrals API', () => {

    var existingRecords;
    var record1;
    var record2;
    var record3;

    beforeEach(async function() {
        existingRecords = await prisma.referral.findMany();

        await prisma.referral.deleteMany({});

        record1 = await prisma.referral.create({
            data: { givenName: "givenName1", surName: "surName1", email: "givenName1@surName1.com", phone: "+61444444441" }
        });
        record2 = await prisma.referral.create({
            data: { givenName: "givenName2", surName: "surName2", email: "givenName2@surName2.com", phone: "0444444442" }
        });
        record3 = await prisma.referral.create({
            data: { givenName: "givenName3", surName: "surName3", email: "givenName3@surName3.com", phone: "+61444444443" }
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

    it('should return all referrals as array', async () => {
        const result = await request(app).get('/referrals');
        expect(result.status).toEqual(200);
        expect(Array.isArray(result.body)).toBe(true);
        expect(result.body.length).toBe(3);
    });

    it('should return referral by id', async () => {
        const result = await request(app).get(`/referrals/${record1.id}`);

        expect(result.status).toEqual(200);
        expect(result.body.givenName).toBe('givenName1');
        expect(result.body.surName).toBe('surName1');
    });

    it('should return error on get referral by id when referral does not exist', async () => {
        const result = await request(app).get(`/referrals/${_.random(10, 100, false)}`);

        expect(result.status).toEqual(404);
        expect(result.body.errors[0].msg).toBe('Referral not found');
    });

    it('should update referral by id', async () => {
        const result = await request(app).get(`/referrals/${record1.id}`);
        expect(result.body.givenName).toBe('givenName1');
        expect(result.body.surName).toBe('surName1');

        const updatedResult = await request(app).patch(`/referrals/${record1.id}`).send({
            givenName: 'John1',
            surName: 'Doe1'
        });

        expect(updatedResult.status).toEqual(200);
        expect(updatedResult.body.givenName).toBe('John1');
        expect(updatedResult.body.surName).toBe('Doe1');
    });

    it('should return error on update by referral by id when referral does not exist', async () => {
        const result = await request(app).patch(`/referrals/${_.random(10, 100, false)}`).send({
            givenName: 'John1',
            surName: 'Doe1'
        });

        expect(result.status).toEqual(404);
        expect(result.body.errors[0].msg).toBe('Referral does not exist');
    });

    it('should delete referral by id', async () => {
        const result = await request(app).delete(`/referrals/${record3.id}`);

        expect(result.status).toEqual(200);
        expect(result.body.givenName).toBe('givenName3');
        expect(result.body.surName).toBe('surName3');
    });

    it('should return error on delete by referral by id when referral does not exist', async () => {
        const result = await request(app).delete(`/referrals/${_.random(10, 100, false)}`);

        expect(result.status).toEqual(404);
        expect(result.body.errors[0].msg).toBe('Referral does not exist');
    });

    it('should create referral', async () => {
        await request(app).post('/referrals').send({
            "givenName": "Another",
            "surName": "Referral",
            "email": "another@referral.com",
            "phone": "+61444444444",
            "addressLine": null,
            "suburb": null,
            "state": null,
            "postCode": null,
            "country": null
        });

        const result = await request(app).get('/referrals');

        expect(result.status).toEqual(200);
        expect(Array.isArray(result.body)).toBe(true);
        expect(result.body.length).toBe(4);
    });

});
