# Quick Setup Script for PostgreSQL Database

# Set environment variable for this session
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/school_management?schema=public"

Write-Host "Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "`nStep 2: Creating database schema..." -ForegroundColor Yellow  
npx prisma db push --accept-data-loss

Write-Host "`nStep 3: Testing connection..." -ForegroundColor Yellow
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('Database connected!'); process.exit(0); }).catch(e => { console.error(e); process.exit(1); });"

Write-Host "`n✅ Database setup complete!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
