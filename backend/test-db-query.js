const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

async function main() {
  try {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    const tasks = await prisma.task.findMany();
    console.log('--- Tasks from Database ---');
    console.log(JSON.stringify(tasks, null, 2));
    console.log('---------------------------');
    await prisma.$disconnect();
  } catch (e) {
    console.error('Error in main:', e);
  }
}

main();
