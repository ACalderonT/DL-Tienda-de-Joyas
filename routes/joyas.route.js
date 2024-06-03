import { joyasController } from "../controllers/joyas.controller.js";
import { Router } from "express";
import { HandleDatabaseLogs } from "../lib/errors/logsMiddleware.js";

const router = Router();

// GET /joyas
router.get("/", HandleDatabaseLogs, joyasController.read);

// GET /joyas/filtros
router.get("/filtros", HandleDatabaseLogs, joyasController.filters);

// DEFAULT ROUTE
router.get("*", joyasController.undefinedRoute);

export default router;
