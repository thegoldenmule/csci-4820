#!/bin/bash

# walk solution subdirectories
for d in ../code/src/solution/*/ ; do
  mkdir -p ../code/src/solution-enc/$(basename $d)
  openssl aes-256-cbc -nosalt -iv '5a04ec902686fb05a6b7a338b6e07760' -pbkdf2 -iter 100000 -in "$d/index.js" -out "../code/src/solution-enc/$(basename $d)/index.js.enc" -pass "file:$HOME/.ssh/secret.bin"
done
