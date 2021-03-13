import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

MetadataKeys.middleware;
export function use(middleware: RequestHandler) {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
