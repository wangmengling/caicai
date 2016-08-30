// import Home from './Components/Home';
// import HomeRoute from './Routes/HomeRoute';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Relay from 'react-relay';
//
// ReactDOM.render(
//   <Relay.RootContainer
//     Component={Home}
//     route={new HomeRoute()}
//   />,
//   document.getElementById('root')
// );

import 'babel-polyfill';
import Home from './components/Home';
import HomeRoute from './routes/HomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
let userId =  "57c3e8be5d2d1ba041fc1a22";
ReactDOM.render(
  <Relay.RootContainer
    Component={Home}
    route={new HomeRoute({userId: userId})}
  />,
  document.getElementById('root')
);
