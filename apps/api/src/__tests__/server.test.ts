import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createApp } from "../app";

describe("server", () => {
  it("status check returns 200", async () => {
    await supertest(createApp())
      .get("/status")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    await supertest(createApp())
      .get("/message/jared")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("hello jared");
      });
  });
});
