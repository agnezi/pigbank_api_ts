module.exports = {
  type: "postgres",
  host:
    process.env["NODE_ENV"] === "development"
      ? process.env.DEV_DATABASE_URL
      : process.env.PROD_DATABASE_URL,
  port:
    process.env["NODE_ENV"] === "development"
      ? process.env.DEV_DATABASE_PORT
      : process.env.PROD_DATABASE_PORT,
  username:
    process.env["NODE_ENV"] === "development"
      ? process.env.DEV_DATABASE_USERNAME
      : process.env.PROD_DATABASE_USERNAME,
  password:
    process.env["NODE_ENV"] === "development"
      ? process.env.DEV_DATABASE_PASSWORD
      : process.env.PROD_DATABASE_PASSWORD,
  database: "pigbank",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"]
};
