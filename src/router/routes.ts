import { RouteConfig } from 'vue-router'
const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/mainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/packages.vue') },
      { path: 'packages', component: () => import('pages/packages.vue') },
    ]
  },
  {
    path: '/packages/:id',
    component: () => import('pages/package-id.vue'),
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
