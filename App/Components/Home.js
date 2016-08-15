import React from 'react';
import Relay from 'react-relay';

class Home extends React.Component {
  render() {
    // Relay will materialize this prop based on the
    // result of the query in the next component.
    const {hello} = this.props.greetings;
    return <h1>{hello}</h1>;
  }
}

/**
 * #2 - Relay containers
 * Compose your React components with a declaration of
 * the GraphQL query fragments that fetch their data.
 *
 * To learn more about Relay containers, visit:
 *   https://facebook.github.io/relay/docs/guides-containers.html
 */
export default Relay.createContainer(Home, {
  fragments: {
    // This GraphQL query executes against
    // the schema in the 'schema' tab above.
    //
    // To learn more about Relay.QL, visit:
    //   https://facebook.github.io/relay/docs/api-reference-relay-ql.html
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello,
      }
    `,
  }
});
