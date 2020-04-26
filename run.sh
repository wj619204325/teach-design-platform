npm install
npm run build
cd ./
npm install
# 下面几步是把原来koa的server/public文件替换成新打包的dist中的文件
# 并且把dist文件假删掉
cd ..
rm -rf ./server/public
mkdir ./server/public
mv ./dist/index.html ./server/public/index.html
mv ./dist/statis/ ./server/public/static/
rm -rf ./dist