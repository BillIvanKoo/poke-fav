import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'

import store from './store';
import SideNav from './components/SideNav'
import PokeList from './components/PokeList'
import BottomBar from './components/BottomBar'
import Home from './components/Home'
import PokeFav from './components/PokeFav'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
            <div>
              <SideNav/>
              <Route exact path="/" component={Home}/>
              <Route path="/pokelist" component={PokeList}/>
              <Route path="/myfavorites" component={PokeFav}/>
              <BottomBar/>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
