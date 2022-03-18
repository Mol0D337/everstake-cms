import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

let routes = [
	{
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
    meta: {
      requiresAuth: true,
    },
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/pages',
		name: 'Pages',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
      requiresAuth: true,
		},
		component: () => import('../views/Pages.vue'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
    meta: {
      requiresAuth: true,
    },
		component: () => import('../views/Tables.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
    meta: {
      requiresAuth: true,
    },
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/users',
		name: 'Users',
		layout: "dashboard",
    meta: {
      requiresAuth: true,
    },
		component: () => import('../views/Users.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
      requiresAuth: true,
		},
		component: () => import('../views/Profile.vue'),
	},
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
]

function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;

	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

const routeNamesRestrictedAfterLogin = ['Login'];

router.beforeEach((to, from, next) => {
  const isUserAuth = store.getters['auth/isUserAuth'];

  if (routeNamesRestrictedAfterLogin.includes(to.name)) {
    if (isUserAuth) {
      next('/');
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserAuth) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
