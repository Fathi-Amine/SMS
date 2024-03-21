const request = require('supertest');
const app = require('../../App/app');
const mongoose = require('mongoose');
const AcademicTerm = require('../../Models/Academic/AcademicTerm');
const Admin = require('../../Models/Staff/Admin');
const dotenv = require('dotenv');

dotenv.config();

jest.setTimeout(10000);

describe('Academic Term Controller', () => {
    let cookies;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        const res = await request(app)
            .post('/api/v1/admins/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ email: 'admintier@test.com', password: 'test12' }));

        // Store the cookies to use in subsequent requests
        cookies = res.headers['set-cookie'];
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new academic term', async () => {
        const res = await request(app)
            .post('/api/v1/academic-terms')
            .set('Cookie', cookies)
            .send({
                name: 'Test Term2',
                description: 'This is a test term',
                duration: '2 months'
            });
        console.log(res.body)
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Academic term created successfully');
    });

    it('should not create a new academic term with the same name', async () => {
        const res = await request(app)
            .post('/api/v1/academic-terms')
            .set('Cookie', cookies)
            .send({
                name: 'Test Term1',
                description: 'This is a test term',
                duration: '2 months'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Academic term already exists');
    });
    it('should fetch all academic terms', async () => {
        const res = await request(app)
            .get('/api/v1/academic-terms')
            .set('Cookie', cookies);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic terms fetched successfully');
    });

    it('should fetch a specific academic term', async () => {
        const academicTerm = await AcademicTerm.findOne({ name: 'Test Term1' });
        const res = await request(app)
            .get(`/api/v1/academic-terms/${academicTerm._id}`)
            .set('Cookie', cookies);
        ;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic term fetched successfully');
    });

    it('should update an academic term', async () => {
        const academicTerm = await AcademicTerm.findOne({ name: 'Updated Test Term' });
        const res = await request(app)
            .put(`/api/v1/academic-terms/${academicTerm._id}`)
            .set('Cookie', cookies)
            .send({
                name: 'Updated Test Term',
                description: 'This is an updated test term',
                duration: '3 months'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic term updated successfully');
    });

    it('should not update an academic term with an existing name', async () => {
        const academicTerm = await AcademicTerm.findOne({ name: 'Updated Test Term' });
        const res = await request(app)
            .put(`/api/v1/academic-terms/${academicTerm._id}`)
            .set('Cookie', cookies)
            .send({
                name: 'Test Term1',
                description: 'This is an updated test term',
                duration: '3 months'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Academic term name already exists');
    });

    it('should delete an academic term', async () => {
        const academicTerm = await AcademicTerm.findOne({ name: 'Test Term2' });
        const res = await request(app)
            .delete(`/api/v1/academic-terms/${academicTerm._id}`)
            .set('Cookie', cookies);
        ;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic term deleted successfully');
    });
});