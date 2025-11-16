const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  try {
    // Try different possible paths for the seed file
    const possiblePaths = [
      path.join(__dirname, '..', 'migrations', 'sqls', 'seed_store.sql'),
      path.join(process.cwd(), 'migrations', 'sqls', 'seed_store.sql'),
      '/var/app/current/migrations/sqls/seed_store.sql',
      '/var/app/staging/migrations/sqls/seed_store.sql'
    ];
    
    let seedFile;
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        seedFile = filePath;
        break;
      }
    }
    
    if (!seedFile) {
      console.log('Seed file not found, skipping database seeding');
      await pool.end();
      process.exit(0);
    }
    
    const sql = fs.readFileSync(seedFile, 'utf8');
    
    console.log('Running seed script from:', seedFile);
    await pool.query(sql);
    console.log('Database seeded successfully!');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await pool.end();
    process.exit(1);
  }
}

seedDatabase();
