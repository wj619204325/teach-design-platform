npm install
npm run build
cd ./server
npm install
# 下面几步是把原来koa的server/public文件替换成新打包的dist中的文件
# 并且把dist文件假删掉
cd ..
mv ./dist/* ./server/public/
rm -rf ./dist
