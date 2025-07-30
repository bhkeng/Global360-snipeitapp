import fs from 'fs';
import path from 'path';

type EnvConfig = {
  baseUrl: string;
};

const ENV = process.env.TEST_ENV || 'test'; // defaults to test environment

const configPath = path.resolve(__dirname, `../config/env.${ENV}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Missing config: ${configPath}`);
}

export const env: EnvConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));