const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const updateResult = await prisma.task.updateMany({
      data: {
        title: 'ธนพัทร บุญผัด รหัส 6604101330',
      },
    });
    console.log(`Updated ${updateResult.count} tasks successfully.`);
    
    const tasks = await prisma.task.findMany();
    console.log('--- Current Tasks ---');
    console.log(JSON.stringify(tasks, null, 2));
  } catch (e) {
    console.error('Error updating tasks:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
