import {Redirect} from 'react-router';
import Link from 'umi/link';

const page1 = '/page1',
 page2 = '/page2'

export default () => (
  <div>
    {/* <Redirect to="/s1" /> */ }
    <ol>
      <li>
        <Link to={page1}>调通普通的前后端</Link>
      </li>
      <li>
        <Link to={page2}>初次引入websocket</Link>
      </li>
    </ol>


  </div>
);
