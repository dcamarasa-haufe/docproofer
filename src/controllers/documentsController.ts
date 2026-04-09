import type { Request, Response } from "express";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../store/documentStore.js";

export function listDocuments(_req: Request, res: Response): void {
  res.json(getAllDocuments());
}

export function getDocument(req: Request, res: Response): void {
  const document = getDocumentById(req.params.id);
  if (!document) {
    res.status(404).json({ error: "Document not found" });
    return;
  }
  res.json(document);
}

export function createDocumentHandler(req: Request, res: Response): void {
  const { title, content } = req.body as { title?: unknown; content?: unknown };

  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "title is required and must be a non-empty string" });
    return;
  }
  if (typeof content !== "string") {
    res.status(400).json({ error: "content is required and must be a string" });
    return;
  }

  const document = createDocument({ title: title.trim(), content });
  res.status(201).json(document);
}

export function updateDocumentHandler(req: Request, res: Response): void {
  const { title, content } = req.body as { title?: unknown; content?: unknown };

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ error: "title must be a non-empty string" });
    return;
  }
  if (content !== undefined && typeof content !== "string") {
    res.status(400).json({ error: "content must be a string" });
    return;
  }

  const updated = updateDocument(req.params.id, {
    ...(title !== undefined && { title: (title as string).trim() }),
    ...(content !== undefined && { content: content as string }),
  });

  if (!updated) {
    res.status(404).json({ error: "Document not found" });
    return;
  }
  res.json(updated);
}

export function deleteDocumentHandler(req: Request, res: Response): void {
  const deleted = deleteDocument(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Document not found" });
    return;
  }
  res.status(204).send();
}
