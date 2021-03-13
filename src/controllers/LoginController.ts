import { NextFunction, Request, RequestHandler, Response } from "express";
import { controller, get, post, use } from "./decorators";
import { bodyValidator } from "./decorators/bodyValidator";
function logger(req: any, res: any, next: NextFunction) {
  console.log("REQUES WAS MADE !!");
  next();
}

@controller("/auth")
class LoginController {
  @post("/logout")
  logout(req: Request, res: Response, next: NextFunction): void {
    req.session = undefined;
    res.redirect("/login");
  }

  @post("/login")
  @bodyValidator("email", "password")
  login(req: Request, res: Response) {
    req.session = { loggedIn: true };
    res.redirect("/");
  }
  @get("/login")
  @use(logger)
  getLogin(req: Request, res: Response) {
    res.send(`
        <form method="POST">
          <div>
              <label>Email</label>
              <input name="email"></input>
          </div>
          <div>
          <label>Password</label>
          <input name="password" type="password"></input>
      </div>
      <button>Submit</button>
        </form>
        `);
  }
}
