import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

async function generateBinaryImagesIfNeeded() {
  const base = path.resolve(import.meta.dirname, '../assets/common');
  const input = path.resolve(base, 'logo.svg');
  const output = path.resolve(base, 'logo.png');

  console.log('===== Generate Binary Images Utility =====');
  console.log('Configuration:');
  console.group();
  console.log(
    'Base path:\t' +
      base +
      '\n' +
      'Input path:\t' +
      input +
      '\n' +
      'Output path:\t' +
      output,
  );
  console.groupEnd();

  console.log('Input/Output File Stats:');
  console.group();
  const inputTime = await fs.stat(input).then(x => x.mtime);
  console.log('Input file mtime:\t' + inputTime);
  const outputTime = await fs
    .stat(output)
    .then(x => x.ctime)
    .catch(() => null);
  console.log('Output file ctime:\t' + outputTime);
  console.groupEnd();

  if (outputTime === null || inputTime > outputTime) {
    console.log('Output file either non-existent or outdated. Regenerating...');
    sharp(path.resolve(base, 'logo.svg'))
      .png()
      .toFile(path.resolve(base, 'logo.png'));
    console.log('Regenerated!');
  } else {
    console.log('Output file is newer than input file. Skipping generation...');
  }

  console.log('===== END Generate Binary Images Utility =====');
}

generateBinaryImagesIfNeeded();
