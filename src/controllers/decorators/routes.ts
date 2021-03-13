import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";
interface RouteHandlerDescriptor extends PropertyDescriptor {
  //B3mlo Replace en lazm el value bta3to tkon RequestHandler
  value?: RequestHandler;
}
function routeBinder(method: string) {
  return function get(path: string) {
    return (target: any, key: any, desc: RouteHandlerDescriptor) => {
      //"path","value","target ==>Prototype",function that will associated with this property , example login
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

// function get(path: string) {
//     return (target: any, key: any, desc: PropertyDescriptor) => {
//       //"path","value","target ==>Prototype",function that will associated with this property , example login
//       Reflect.defineMetadata("path", path, target, key);
//       Reflect.defineMetadata("method", "get", target, key);
//     };
//   };
export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.delete);
