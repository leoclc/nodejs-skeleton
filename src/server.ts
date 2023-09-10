import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import TargetRoute from '@/routes/event.route';

validateEnv();

const app = new App([new IndexRoute(), new TargetRoute(), new AuthRoute()]);

app.listen();
