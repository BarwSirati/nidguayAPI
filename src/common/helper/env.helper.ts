import { resolve } from 'path';

export function getEnvPath(): string {
  const filePath: string = resolve('.env');
  return filePath;
}
