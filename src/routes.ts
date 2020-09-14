import Login from './pages/Login.svelte';
import SignUp from './pages/SignUp.svelte';
import Home from './pages/Home.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Home,
  '/login': Login,
  '/registrar': SignUp,
  '*': NotFound,
};
