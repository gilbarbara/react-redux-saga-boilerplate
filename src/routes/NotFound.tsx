import { Link } from 'react-router-dom';
import { H2, NonIdealState, Page } from '@gilbarbara/components';

import Background from '~/components/Background';

function NotFound() {
  return (
    <Background key="404" data-component-name="NotFound">
      <Page>
        <NonIdealState />
        <Link to="/">
          <H2>go home</H2>
        </Link>
      </Page>
    </Background>
  );
}

export default NotFound;
