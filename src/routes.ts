import Login from './pages/Login.svelte';
import HUD from './pages/HUD.svelte';
import Home from './pages/Home.svelte';
import Registro from './pages/Registro.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Home,
  '/login': Login,
  '/registro': Registro,
  '/hud': HUD,
  '*': NotFound,
};
