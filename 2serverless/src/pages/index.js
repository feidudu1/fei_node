import {Redirect} from 'react-router';
import Link from 'umi/link';

const page1 = '/page1'

export default () => (
  <div>
    {/* <Redirect to="/s1" /> */ }
    <ol>
      <li>
        <Link to={page1}>初次引入cesium</Link>
      </li>
    </ol>


  </div>
);
