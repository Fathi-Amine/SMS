const request = require('supertest');
const app = require('../../App/app');
const mongoose = require('mongoose');
const AcademicYear = require('../../Models/Academic/AcademicYear');
const Admin = require('../../Models/Staff/Admin');
const dotenv = require('dotenv');

dotenv.config();

jest.setTimeout(30000);

describe('Academic Year Controller', () => {
    let cookies;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        const res = await request(app)
            .post('/api/v1/admins/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ email: 'admintier@test.com', password: 'test12' }));


        cookies = res.headers['set-cookie'];
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new academic year', async () => {
        const res = await request(app)
            .post('/api/v1/academic-years')
            .set('Cookie', cookies)
            .send({
                name: 'Test Year',
                fromYear: '2022',
                toYear: '2023'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Academic year created successfully');
    });

    it('should not create a new academic year with the same name', async () => {
        const res = await request(app)
            .post('/api/v1/academic-years')
            .set('Cookie', cookies)
            .send({
                name: 'Test Year',
                fromYear: '2022',
                toYear: '2023'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Academic year already exists');
    });

    it('should fetch all academic years', async () => {
        const res = await request(app)
            .get('/api/v1/academic-years')
            .set('Cookie', cookies);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic years fetched successfully');
    });

    it('should fetch a specific academic year', async () => {
        const academicYear = await AcademicYear.findOne({ name: 'Test Year' });
        const res = await request(app)
            .get(`/api/v1/academic-years/${academicYear._id}`)
            .set('Cookie', cookies);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic years fetched successfully');
    });

    it('should update an academic year', async () => {
        const academicYear = await AcademicYear.findOne({ name: 'Test Year' });
        const res = await request(app)
            .put(`/api/v1/academic-years/${academicYear._id}`)
            .set('Cookie', cookies)
            .send({
                name: 'Updated Test Year',
                fromYear: '2023',
                toYear: '2024'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic years updated successfully');
    });

    it('should not update an academic year with an existing name', async () => {
        const academicYear = await AcademicYear.findOne({ name: 'Updated Test Year' });
        const res = await request(app)
            .put(`/api/v1/academic-years/${academicYear._id}`)
            .set('Cookie', cookies)
            .send({
                name: 'Test Year',
                fromYear: '2023',
                toYear: '2024'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Academic year already exists');
    });

    it('should delete an academic year', async () => {
        const academicYear = await AcademicYear.findOne({ name: 'Test Year' });
        const res = await request(app)
            .delete(`/api/v1/academic-years/${academicYear._id}`)
            .set('Cookie', cookies);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Academic year deleted successfully');
    });
});