import Reactotron, { trackGlobalErrors } from 'reactotron-react-js';
import config from 'config';

if (config.startReactotron) {
  Reactotron
    .configure()
    .use(trackGlobalErrors())
    .connect();
}
