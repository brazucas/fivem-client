import Login from './pages/Login.svelte';
import HUD from './pages/HUD.svelte';
import Home from './pages/Home.svelte';
import Registro from './pages/Registro.svelte';
import RecuperarAcesso from './pages/RecuperarAcesso.svelte';
import Scoreboard from './pages/Scoreboard.svelte';
import Celular from './pages/Celular.svelte';
import Chat from './pages/Celular/Chat.svelte';
import CriarVeiculo from './pages/Admin/CriarVeiculo.svelte';
import NotFound from './NotFound.svelte';

export default {
  '/': Home,
  '/login': Login,
  '/registro': Registro,
  '/recuperar-acesso': RecuperarAcesso,
  '/scoreboard': Scoreboard,
  '/celular': Celular,
  '/celular/chat': Chat,
  '/admin/criar-veiculo': CriarVeiculo,
  '/hud': HUD,
  '*': NotFound,
};
