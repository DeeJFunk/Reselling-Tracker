import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  //route("home", "routes/home.tsx"), removed due to duplication error
  route("inventory", "routes/inventory.tsx"),
  route("itemcreate", "routes/itemcreate.tsx"),
] satisfies RouteConfig;
