#!/bin/bash

# walk solution subdirectories
for d in ../code/src/solution-enc/*/ ; do
  # recreate
  rm -rf ../code/src/solution-target/$(basename $d)
  mkdir -p ../code/src/solution-target/$(basename $d)

  # walk files
  for f in $d/* ; do
    openssl aes-256-cbc -nosalt -iv '5a04ec902686fb05a6b7a338b6e07760' -pbkdf2 -iter 100000 -in "$f" -out "../code/src/solution-target/$(basename $d)/$(basename $f)" -pass "file:$HOME/.ssh/secret.bin" -d
  done
done
