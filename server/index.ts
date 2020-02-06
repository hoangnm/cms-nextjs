import micro from "micro";
import { get, post, router, withNamespace } from "microrouter";
import next from "next";
import mongoose from "mongoose";
import postsController from "./controllers/posts";
import slugsController from "./controllers/slugs";

require("dotenv").config();

const configs = {
  PORT: 3000,
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST
};

export const nextApplication = next({
  dev: configs.NODE_ENV !== "production"
});

export const httpServer = micro(
  router(
    withNamespace("/api/posts")(
      get("/", postsController.getAll),
      get("/:id", postsController.getById),
      post("/", postsController.create)
    ),
    withNamespace("/api/slugs")(
      get("/", slugsController.getAll),
      post("/", slugsController.create)
    ),
    get("/*", nextApplication.getRequestHandler())
  )
);

async function initMongo() {
  let success = false;
  let client;
  while (!success) {
    try {
      client = await mongoose.connect(
        `mongodb://${configs.DB_HOST}:27017/cms`,
        {
          useNewUrlParser: true
        }
      );
      success = true;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return client;
}

async function init() {
  try {
    await initMongo();
    await nextApplication.prepare();
    httpServer.listen(configs.PORT, () => {
      console.log(`> Ready on http://localhost:${configs.PORT}`);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

init();
