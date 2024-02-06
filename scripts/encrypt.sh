#!/bin/bash

# walk solution subdirectories
for d in ../code/src/solution/*/ ; do
  # recreate
  rm -rf ../code/src/solution-enc/$(basename $d)
  mkdir -p ../code/src/solution-enc/$(basename $d)

  # walk files
  for f in $d/* ; do
    openssl aes-256-cbc -nosalt -iv '5a04ec902686fb05a6b7a338b6e07760' -pbkdf2 -iter 100000 -in "$f" -out "../code/src/solution-enc/$(basename $d)/$(basename $f)" -pass "file:$HOME/.ssh/secret.bin"
  done
done
