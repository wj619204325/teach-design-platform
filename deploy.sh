#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

npm run build
 
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:BNK-ALONG/teach-design-platform.git master:gh-pages
git push -f git@gitee.com:BNK_ALONG/teach-design-platform.git master:gh-pages
cd -