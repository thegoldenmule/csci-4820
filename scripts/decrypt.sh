#!/bin/bash

# walk solution subdirectories
for d in ../code/src/solution-enc/*/ ; do
  mkdir -p ../code/src/solution-target/$(basename $d)
  openssl aes-256-cbc -nosalt -iv '5a04ec902686fb05a6b7a338b6e07760' -pbkdf2 -iter 100000 -in "$d/index.js.enc" -out "../code/src/solution-target/$(basename $d)/index.js" -pass "file:$HOME/.ssh/secret.bin" -d
done
