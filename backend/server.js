const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env.local if it exists (for local development), otherwise load .env
const envFile = fs.existsSync(path.join(__dirname, '.env.local')) ? '.env.local' : '.env';
dotenv.config({ path: path.join(__dirname, envFile) });

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

