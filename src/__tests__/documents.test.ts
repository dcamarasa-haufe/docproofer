import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { clearDocuments } from "../store/documentStore.js";

beforeEach(() => {
  clearDocuments();
});

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /documents", () => {
  it("returns an empty array when no documents exist", async () => {
    const res = await request(app).get("/documents");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns all created documents", async () => {
    await request(app).post("/documents").send({ title: "Doc 1", content: "Content 1" });
    await request(app).post("/documents").send({ title: "Doc 2", content: "Content 2" });

    const res = await request(app).get("/documents");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe("POST /documents", () => {
  it("creates a new document and returns 201", async () => {
    const res = await request(app)
      .post("/documents")
      .send({ title: "My Document", content: "Hello world" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: "My Document",
      content: "Hello world",
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });

  it("returns 400 when title is missing", async () => {
    const res = await request(app).post("/documents").send({ content: "Hello" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/i);
  });

  it("returns 400 when title is empty", async () => {
    const res = await request(app).post("/documents").send({ title: "  ", content: "Hello" });
    expect(res.status).toBe(400);
  });

  it("returns 400 when content is missing", async () => {
    const res = await request(app).post("/documents").send({ title: "Doc" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/content/i);
  });
});

describe("GET /documents/:id", () => {
  it("returns a document by id", async () => {
    const created = await request(app)
      .post("/documents")
      .send({ title: "Find me", content: "Here I am" });

    const res = await request(app).get(`/documents/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: "Find me", content: "Here I am" });
  });

  it("returns 404 for a non-existent document", async () => {
    const res = await request(app).get("/documents/non-existent-id");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("PUT /documents/:id", () => {
  it("updates an existing document", async () => {
    const created = await request(app)
      .post("/documents")
      .send({ title: "Original", content: "Original content" });

    const res = await request(app)
      .put(`/documents/${created.body.id}`)
      .send({ title: "Updated" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated");
    expect(res.body.content).toBe("Original content");
    expect(res.body.updatedAt).not.toBe(created.body.updatedAt);
  });

  it("can update only content", async () => {
    const created = await request(app)
      .post("/documents")
      .send({ title: "Title", content: "Old content" });

    const res = await request(app)
      .put(`/documents/${created.body.id}`)
      .send({ content: "New content" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Title");
    expect(res.body.content).toBe("New content");
  });

  it("returns 404 for a non-existent document", async () => {
    const res = await request(app).put("/documents/non-existent-id").send({ title: "X" });
    expect(res.status).toBe(404);
  });

  it("returns 400 when title is an empty string", async () => {
    const created = await request(app)
      .post("/documents")
      .send({ title: "Title", content: "Content" });

    const res = await request(app)
      .put(`/documents/${created.body.id}`)
      .send({ title: "" });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /documents/:id", () => {
  it("deletes an existing document and returns 204", async () => {
    const created = await request(app)
      .post("/documents")
      .send({ title: "To delete", content: "Bye" });

    const res = await request(app).delete(`/documents/${created.body.id}`);
    expect(res.status).toBe(204);

    const getRes = await request(app).get(`/documents/${created.body.id}`);
    expect(getRes.status).toBe(404);
  });

  it("returns 404 for a non-existent document", async () => {
    const res = await request(app).delete("/documents/non-existent-id");
    expect(res.status).toBe(404);
  });
});
