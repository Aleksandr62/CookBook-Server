const { Router } = require("express");
const userController = require("../controllers/userController");
const { body } = require("express-validator");

const apiRouter = new Router();

apiRouter.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 8, max: 16 }),
    userController.registration
);
apiRouter.post("/login", userController.login);
apiRouter.post("/logout", userController.logout);

apiRouter.get("/activation/:link", userController.activation);
apiRouter.get("refresh", userController.refresh);
apiRouter.get("users", userController.getUsers);

module.exports = apiRouter;
