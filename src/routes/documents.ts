import { Router } from "express";
import {
  listDocuments,
  getDocument,
  createDocumentHandler,
  updateDocumentHandler,
  deleteDocumentHandler,
} from "../controllers/documentsController.js";

const router = Router();

router.get("/", listDocuments);
router.get("/:id", getDocument);
router.post("/", createDocumentHandler);
router.put("/:id", updateDocumentHandler);
router.delete("/:id", deleteDocumentHandler);

export default router;
