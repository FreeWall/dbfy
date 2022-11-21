import fs from 'fs';
import { nanoid } from 'nanoid';

const envFile = '.env';

if (!fs.existsSync(envFile)) {
  let content = fs.readFileSync('.env.example');

  content = content.toString().replace(/IRONSESSION_SECRET=.*/, 'IRONSESSION_SECRET=' + nanoid(32));

  fs.writeFileSync(envFile, content);

  process.exit();
}
