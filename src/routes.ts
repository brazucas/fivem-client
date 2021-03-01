import Login from './pages/Login.svelte';
import HUD from './pages/HUD.svelte';
import Home from './pages/Home.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Home,
  '/login': Login,
  '/hud': HUD,
  '*': NotFound,
};
