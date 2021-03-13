import { NextFunction } from "connect";
import { Router, Request, Response } from "express";

const router = Router();
function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  return res.send("Not Auth");
}
router.get("/protected", isAuth, (req, res) => {
  res.send("protected");
});
router.post("/login", (req, res) => {
  req.session = { loggedIn: true };
  res.redirect("/");
});
router.get("/login", (req, res) => {
  if (req.session && req.session.loggedIn) {
    return res.send(`
      <div>
    You are logged in 
    <a href="/logout">logout</a>
      </div>
      `);
  }
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
});
router.get("/logout", (req, res) => {
  req.session = undefined;
  res.redirect("/login");
});
router.get("/", (req, res) => {});
export { router };
