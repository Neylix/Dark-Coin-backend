const config = {
  dbHost : process.env.DB_HOST,
  dbPassword : process.env.DB_PWD,
  dbUser : process.env.DB_USER,
  dbName : process.env.DB_DB,
  jwt: {
    secret: process.env.JWTTOKEN,
    expireIn: 86400000,
    secureCookie: true
  },
  cors: ['http://localhost']
};

export default config;