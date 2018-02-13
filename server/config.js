const config = {
  database: "mongodb://admin:vy7Cwe3@ds119268.mlab.com:19268/calendar",
  secret: "vhv8SmzQ",
  jwtSession: {
    session: false
  },
  port: process.env.PORT || 3000
};

export default config;
