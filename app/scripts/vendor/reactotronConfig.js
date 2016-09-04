import Reactotron, { trackGlobalErrors } from 'reactotron-react-js';
import config from 'config';

/* istanbul ignore if */
if (config.startReactotron) {
  /* istanbul ignore next */
  Reactotron
    .configure()
    .use(trackGlobalErrors())
    .connect();
}
