
import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import autoRoutes from '~pages';

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  };
});

const scrollBehavior = (from: any, to: any, savedPosition: any) => {
  if (savedPosition)
    return savedPosition;
  else
    return { top: 0 };
};

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient }) => {

    // if (isClient) {
    //   router.beforeEach(() => { NProgress.start() })
    //   router.afterEach(() => { NProgress.done() })
    // }
  },
);