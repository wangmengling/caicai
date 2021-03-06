
import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    user: (Component) => Relay.QL `
      query {
        user (id: $userId) {
          ${Component.getFragment('user')}
        }
      }
    `
  };
  static paramDefinitions = {userId: {required: true}};
  static routeName = 'HomeRoute';
}
