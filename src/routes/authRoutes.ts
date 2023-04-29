import express, { Router } from "express";
import { signUp, login } from "../controllers/authController";

const router: Router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", login);

export = router;
