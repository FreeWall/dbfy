import { filesize as filesize2 } from 'filesize';

export function filesize(size: number): string {
  return filesize2(size, { base: 2, round: 1, standard: 'jedec' }) as string;
}
