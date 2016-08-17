
import Relay from 'react-relay';

export default class extends Relay.Route {
  static routeName = 'HomeRoute';  // A unique name


  static queries = {
    greetings: () => Relay.QL`query { greetings }`,
  };

  // static queries = {
  //   // Here, we compose your Relay container's
  //   // 'greetings' fragment into the 'greetings'
  //   // field at the root of the GraphQL schema.
  //   greetings: (Component) => Relay.QL`
  //     query GreetingsQuery {
  //       greetings {
  //         ${Component.getFragment('greetings')},
  //       },
  //     }
  //   `,
  // };
}
