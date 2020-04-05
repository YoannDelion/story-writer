import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Navbar from './Components/Navbar'
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom'
import HomePage from './Components/HomePage'
import StoryListPage from './Components/StoryListPage'

import '../css/app.scss'
import 'bulma'
import store from './store'
import LoginPage from './Components/LoginPage'
import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'

const App = () => {
    // Allow access to the history object
    const NavbarWithRouter = withRouter(Navbar)

    return (
      <Provider store={store}>
          <HashRouter>
              <NavbarWithRouter/>
              <Switch>
                  <PrivateRoute path="/stories" component={StoryListPage}/>
                  <PublicRoute path="/login" component={LoginPage}/>
                  <Route path="/" component={HomePage}/>
              </Switch>
          </HashRouter>
      </Provider>)
}

ReactDOM.render(<App/>, document.getElementById('app'))


