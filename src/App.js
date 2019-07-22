// main app, will mount and load routing etc.

import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import { history } from './core/services/history.service';
import { masterStore } from './core/stores/master.store'
//styles
import './styles/App.scss';


//pages
import HomePage from './pages/home.page';

//components


@observer
class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Provider store={masterStore}>
          <main id="main-content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/404" component={() => <div>some 404 compnent</div>} />
              <Route path="*" render={() => (
                <Redirect to="/404" />
              )} />
            </Switch>
          </main>
          </Provider>
        </Router>
    )

  }
}

export default App;
