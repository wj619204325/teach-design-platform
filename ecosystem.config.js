module.exports = {
  apps: [ // First application
    {
      name: 'teach-design-platform',
      script: './server/bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root', //远程服务器登陆用户名
      host: '39.97.255.236', //远程服务ip
      ref: 'origin/master', //git分支
      repo: 'git@github.com:BNK-ALONG/teach-design-platform.git', //远程仓库
      ssh_options: 'StrictHostKeyChecking=no', //SSH 公钥检查
      path: '/home/web/teach-design-platform', //部署的项目在服务器上的路径
      'post-deploy': 'git pull && chmod 777 ./run.sh && ./run.sh && pm2 reload ecosystem.config.js --env production',
    }
  }
};