# 把前端打包好的dist静态资源，复制粘贴到server底下的public
npm install && cd ./server && rm -rf ./public/* && npm install && cd .. && npm run build && mv ./dist/* ./server/public && rm -rf ./dist