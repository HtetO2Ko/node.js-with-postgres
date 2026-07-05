import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { restrictTo, verifyToken } from "../middlewares/auth.middleware";
import { AuthRepository } from "../repositories/auth.repository";

const router = Router();

const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, authRepository);
const userController = new UserController(userService);

router.use(verifyToken, restrictTo("ADMIN"));

router.post("/create-user", userController.createUser);

export default router;
