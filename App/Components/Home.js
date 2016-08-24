import React from 'react';
import Relay from 'react-relay';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.props.user.name}
        </ul>
      </div>
    );
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
    user: () => Relay.QL`
      fragment on User {
        name
      }
    `,
  },
});
