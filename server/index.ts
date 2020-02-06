import micro from "micro";
import { get, post, router, withNamespace } from "microrouter";
import next from "next";
import mongoose from "mongoose";
import postsApi from "./apis/posts";
import slugsApi from "./apis/slugs";

const configs = {
  PORT: 3000,
  NODE_ENV: process.env.NODE_ENV
};

export const nextApplication = next({
  dev: configs.NODE_ENV !== "production"
});

export const httpServer = micro(
  router(
    withNamespace("/api/posts")(
      get("/", postsApi.getAll),
      get("/:id", postsApi.getById),
      post("/", postsApi.create)
    ),
    withNamespace("/api/slugs")(
      get("/", slugsApi.getAll),
      post("/", slugsApi.create)
    ),
    get("/*", nextApplication.getRequestHandler())
  )
);

async function initMongo() {
  console.log("Initialising MongoDB...");
  let success = false;
  let client;
  while (!success) {
    try {
      client = await mongoose.connect("mongodb://localhost:27017/cms", {
        useNewUrlParser: true
      });
      success = true;
    } catch {
      console.log("Error connecting to MongoDB, retrying in 1 second");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log("MongoDB initialised");
  return client;
}

async function init() {
  try {
    await initMongo();
    await nextApplication.prepare();
    await httpServer.listen(configs.PORT, () => {
      console.log(`> Ready on http://localhost:${configs.PORT}`);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

init();
