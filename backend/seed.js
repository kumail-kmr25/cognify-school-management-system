const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Class = require('./src/models/Class');
const Subject = require('./src/models/Subject');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Clear existing data
        await User.deleteMany();
        await Class.deleteMany();
        await Subject.deleteMany();

        console.log('Data cleared...');

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@school.com',
            password: 'password123',
            role: 'admin'
        });

        // Create Teachers
        const teacher1 = await User.create({
            name: 'John Doe',
            email: 'john@teacher.com',
            password: 'password123',
            role: 'teacher'
        });

        // Create Subjects
        const math = await Subject.create({
            name: 'Mathematics',
            code: 'MATH101'
        });

        const science = await Subject.create({
            name: 'Science',
            code: 'SCI101'
        });

        // Create Class
        await Class.create({
            name: 'Grade 10',
            sections: ['A', 'B'],
            subjects: [math._id, science._id],
            teacher: teacher1._id
        });

        console.log('Seed data created successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
