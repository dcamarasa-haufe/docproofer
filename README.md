# docproofer

A REST API for CRUD operations on documents, built with **Express**, **Vite**, and **TypeScript**.

## Getting started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

### Run tests

```bash
npm test
```

## API

The server starts on port `3000` by default (configurable via the `PORT` environment variable).

| Method | Path               | Description            |
|--------|--------------------|------------------------|
| GET    | `/health`          | Health check           |
| GET    | `/documents`       | List all documents     |
| GET    | `/documents/:id`   | Get a document by ID   |
| POST   | `/documents`       | Create a new document  |
| PUT    | `/documents/:id`   | Update a document      |
| DELETE | `/documents/:id`   | Delete a document      |

### Document schema

```json
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

### Create a document – `POST /documents`

```json
{
  "title": "My document",
  "content": "Document content here"
}
```

### Update a document – `PUT /documents/:id`

Both fields are optional; only the supplied fields are updated.

```json
{
  "title": "New title",
  "content": "New content"
}
```
