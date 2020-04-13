//mongodb的配置文件
export default {
  //dbs是数据库名称
  dbs: 'mongodb://127.0.0.1:27017/dbs',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get port() {
      return 465
    },
    get user() {
      return '1120681908@qq.com'
    },
    get pass() {
      return 'rcfhpzzczzbubabi'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 10 * 60 * 1000
      }
    }
  },

}