import { NextFunction, Request, RequestHandler, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";
function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return res.status(422).send("Invalid request body");
    }
    for (let key of keys) {
      if (!req.body[key])
        return res.status(422).send(`Missing property ${key}`);
    }
    next();
  };
}
function controller(routePrefix: string) {
  return (target: Function) => {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          bodyValidators(requiredBodyProps),
          routeHandler
        );
      }
      //TODO: we need to associate all of these routes to router
    }
  };
}

export { controller };
