import { createRouter, createWebHistory } from 'vue-router'
import CatLogin from '../views/CatLogin.vue'
import CatAdminPanel from "../views/CatAdminPanel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useProfileStore } from "../stores/profile";
import ProfileGalleryControl from "../components/profile/ProfileGalleryControl";
import ProfileNotificationsControl from "../components/profile/ProfileNotificationsControl";
import ProfileTrendsControl from "../components/profile/ProfileTrendsControl";

const routes = [
  {
      path: '/',
      name: 'AdminPanel',
      component: CatAdminPanel,
      children: [
          {
              path: 'gallery',
              component: ProfileGalleryControl
          },
          {
              path: 'notifications',
              component: ProfileNotificationsControl
          },
          {
              path: 'trends',
              component: ProfileTrendsControl
          }
      ]
  },
  {
      path: '/login',
      name: 'Login',
      component: CatLogin
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to,from,next) => {
    const user = await getCurrentUser();

    if (user) {
        useProfileStore().setUserId(user.uid);
    }

    if (!user && to.path !== '/login') {
        router.push({ name: 'Login' });
    }

    next();
});

export default router
