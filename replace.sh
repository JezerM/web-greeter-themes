#!/usr/bin/env bash

files=$(find themes/ -name index.html)

replace() {
  sed -i "s/_vendor/vendor/g" $1
}

for item in $files; do
  replace $item
done
