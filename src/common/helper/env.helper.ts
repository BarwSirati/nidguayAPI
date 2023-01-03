import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`.env`);
  const filename: string = env ? `.env` : 'development.env';
  let filePath: string = resolve(`${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
