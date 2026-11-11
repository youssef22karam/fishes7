// Reassemble fishtest_final_mouth.html from its split parts.
// Every part in parts/ is <= 30,000 bytes; concatenating them in
// filename order reproduces the original file byte-for-byte.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const partsDir = join(root, 'parts');
const EXPECTED_SIZE = 1538800;
const EXPECTED_SHA256 = 'a71da7c5876b1d9d0c05142616473b0c45d78b3d21fd0de8a7da726a1f0c3d97';
const MAX_PART = 30000;

const names = readdirSync(partsDir)
  .filter((n) => n.startsWith('fishtest_final_mouth.html.part'))
  .sort();
if (names.length === 0) throw new Error('no parts found in parts/');
const chunks = names.map((n) => {
  const buf = readFileSync(join(partsDir, n));
  if (buf.length > MAX_PART) throw new Error(`${n} is ${buf.length} bytes, over the ${MAX_PART}-byte limit`);
  return buf;
});
const out = Buffer.concat(chunks);
const sha = createHash('sha256').update(out).digest('hex');
if (out.length !== EXPECTED_SIZE) throw new Error(`size mismatch: got ${out.length}, expected ${EXPECTED_SIZE}`);
if (sha !== EXPECTED_SHA256) throw new Error(`sha256 mismatch: got ${sha}, expected ${EXPECTED_SHA256}`);
writeFileSync(join(root, 'fishtest_final_mouth.html'), out);
console.log(`reassembled fishtest_final_mouth.html: ${out.length} bytes, sha256 ${sha}`);
