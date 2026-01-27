import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Contact from "../views/Contact.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
