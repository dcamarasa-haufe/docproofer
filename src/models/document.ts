export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentDto {
  title: string;
  content: string;
}

export interface UpdateDocumentDto {
  title?: string;
  content?: string;
}
