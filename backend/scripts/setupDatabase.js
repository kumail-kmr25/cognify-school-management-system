const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'postgresql://postgres:postgres@localhost:5432/school_management?schema=public',
        },
    },
});

async function testConnection() {
    try {
        console.log('Testing PostgreSQL connection...');
        await prisma.$connect();
        console.log('✅ Successfully connected to PostgreSQL!');

        // Try to create tables
        console.log('\nCreating database schema...');
        const { execSync } = require('child_process');

        // Using db push instead of migrate to avoid env var issues
        execSync('npx prisma db push --accept-data-loss', {
            stdio: 'inherit',
            env: {
                ...process.env,
                DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/school_management?schema=public'
            }
        });

        console.log('\n✅ Database schema created successfully!');

    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.log('\nPlease ensure:');
        console.log('1. PostgreSQL is installed and running');
        console.log('2. Database "school_management" exists');
        console.log('3. Credentials are correct (postgres:postgres)');
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
