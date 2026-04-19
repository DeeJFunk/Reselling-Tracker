import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("home", "routes/home.tsx"),
  route("inventory", "routes/inventory.tsx"),
  route("itemcreate", "routes/itemcreate.tsx"),
] satisfies RouteConfig;
