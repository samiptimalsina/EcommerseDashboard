import { useAuthStore } from '@/stores/auth';

export function requireAuth(to, from, next) {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    next();
  } else {
    next({ name: 'login' });
  }
}

export function preventAuth(to, from, next) {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    next('/dashboard/overview'); // Redirect if already logged in
  } else {
    next(); // Proceed if not logged in
  }
}
