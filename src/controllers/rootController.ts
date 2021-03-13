import { NextFunction, Request, RequestHandler, Response } from "express";
import { controller, get, post, use } from "./decorators";
import { bodyValidator } from "./decorators/bodyValidator";
function logger(req: any, res: any, next: NextFunction) {
  console.log("REQUES WAS MADE !!");
  next();
}

@controller("/")
class LoginController {
  @get("/")
  @use(logger)
  getLogin(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send("LOGGED IN");
    } else {
      res.send(`
        <div>
      You are not logged in 
      <a href="/auth/login">login</a>
        </div>
        `);
    }
  }
}
