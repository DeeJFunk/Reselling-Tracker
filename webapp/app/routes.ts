import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("home","routes/home.tsx"),
  route("itemcreate", "routes/itemcreate.tsx"),
] satisfies RouteConfig;