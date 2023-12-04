import { createWebHistory, createRouter } from "vue-router";

const routes = [
  //   {
  //     path: "/",
  //     alias: "/tutorials",
  //     name: "tutorials",
  //     component: () => import("./components/TutorialsList.vue"),
  //   },
  //   {
  //     path: "/tutorials/:id",
  //     name: "tutorial-details",
  //     component: () => import("./components/Tutorial.vue"),
  //   },
  //   {
  //     path: "/add",
  //     name: "add",
  //     component: () => import("./components/AddTutorial.vue"),
  //   },
  {
    path: "/",
    alias: "/mangas",
    name: "mangas",
    component: () => import("./components/MangasList.vue"),
  },
  {
    path: "/mangas/:id",
    name: "mangas-details",
    component: () => import("./components/Manga.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddManga.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
