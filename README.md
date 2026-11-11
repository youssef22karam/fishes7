# fishes7 — fishtest final mouth edition (split)

This repo holds the single-file build `fishtest_final_mouth.html`
(IchthyoGen — Hyperreal Procedural Fish Generator, final mouth edition)
split into parts of at most 30,000 bytes each, so the whole project
can be stored and pulled file-by-file.

## Original file

- Name: `fishtest_final_mouth.html`
- Size: 1,538,800 bytes
- SHA-256: `a71da7c5876b1d9d0c05142616473b0c45d78b3d21fd0de8a7da726a1f0c3d97`

## Layout

- `parts/fishtest_final_mouth.html.part001` … `part055` — the original
  file split in order at 28,000-byte boundaries (55 parts, largest
  part 28,000 bytes). Concatenating them in filename order reproduces
  the original file byte-for-byte.
- `MANIFEST.txt` — per-part sizes and SHA-256 hashes.
- `tools/reassemble.mjs` — reassembly script (see below).
- The reassembled `fishtest_final_mouth.html` is git-ignored; it is
  generated from the parts, not committed.

## Reassemble

```sh
node tools/reassemble.mjs
```

This writes `fishtest_final_mouth.html` at the repo root and verifies
its size and SHA-256 against the values above before finishing.
Open that file in a browser to run the app — no server or
dependencies are needed.

## Note

This edition was split and committed as-is, untested — no build,
render, or verification gates were run on the app itself beyond the
byte-exact split/reassembly check of the HTML file.
