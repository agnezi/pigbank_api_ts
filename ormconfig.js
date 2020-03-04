module.exports = {
  type: "postgres",
  host: process.env.DEV_DATABASE_URL,
  port: process.env.DEV_DATABASE_PORT,
  username: process.env.DEV_DATABASE_USERNAME,
  password: process.env.DEV_DATABASE_PASSWORD,
  database: "pigbank",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"]
};
