import { randomUUID } from "crypto";
import type { Document, CreateDocumentDto, UpdateDocumentDto } from "../models/document.js";

const documents: Map<string, Document> = new Map();

export function getAllDocuments(): Document[] {
  return Array.from(documents.values());
}

export function getDocumentById(id: string): Document | undefined {
  return documents.get(id);
}

export function createDocument(dto: CreateDocumentDto): Document {
  const now = new Date().toISOString();
  const document: Document = {
    id: randomUUID(),
    title: dto.title,
    content: dto.content,
    createdAt: now,
    updatedAt: now,
  };
  documents.set(document.id, document);
  return document;
}

export function updateDocument(id: string, dto: UpdateDocumentDto): Document | undefined {
  const existing = documents.get(id);
  if (!existing) return undefined;

  const updated: Document = {
    ...existing,
    ...(dto.title !== undefined && { title: dto.title }),
    ...(dto.content !== undefined && { content: dto.content }),
    updatedAt: new Date().toISOString(),
  };
  documents.set(id, updated);
  return updated;
}

export function deleteDocument(id: string): boolean {
  return documents.delete(id);
}

export function clearDocuments(): void {
  documents.clear();
}
