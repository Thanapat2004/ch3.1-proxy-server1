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
    // Define translations
    const translations = [
      {
        english: "Initial project structure with Express and Quasar",
        thai: "โครงสร้างโปรเจกต์เริ่มต้นด้วย Express และ Quasar"
      },
      {
        english: "Connect to Supabase and push Prisma schema",
        thai: "เชื่อมต่อกับ Supabase และ push Prisma schema"
      },
      {
        english: "Deploy Backend to Render and Frontend to Netlify",
        thai: "Deploy Backend ไปยัง Render และ Frontend ไปยัง Netlify"
      }
    ];

    console.log("Starting translation of task descriptions...");

    for (const item of translations) {
      const result = await prisma.task.updateMany({
        where: {
          description: item.english
        },
        data: {
          description: item.thai
        }
      });
      console.log(`Updated '${item.english}' -> '${item.thai}': ${result.count} record(s)`);
    }

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
