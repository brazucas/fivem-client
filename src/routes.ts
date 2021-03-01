import Login from './pages/Login.svelte';
import GUI from './pages/GUI.svelte';
import Home from './pages/Home.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Home,
  '/login': Login,
  '/gui': GUI,
  '*': NotFound,
};
