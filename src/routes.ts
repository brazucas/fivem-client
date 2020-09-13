import Login from './Login.svelte';
import Index from './Index.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Index,
  '/login': Login,
  '*': NotFound,
};
