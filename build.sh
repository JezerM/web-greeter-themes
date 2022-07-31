#!/usr/bin/env bash

mv themes/_vendor themes/vendor

files=$(find themes/ -name "*.html")

replace() {
  sed -i "s/_vendor/vendor/g" $1
}

for item in $files; do
  replace $item
done

tsc --build themes/gruvbox
tsc --build themes/dracula

rsync -r . build/ --exclude .gitignore --exclude .gitmodules --exclude .git --exclude .github
