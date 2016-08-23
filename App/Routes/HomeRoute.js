
import Relay from 'react-relay';

export default class extends Relay.Route {
  static routeName = 'HomeRoute';  // A unique name


  static queries = {
    viewer: () => Relay.QL`
      query {
        users
      }
    `,
  };
}
