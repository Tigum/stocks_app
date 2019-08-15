import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PortifolioScreen from './screens/PortifolioScreen';
import StockScreen from './screens/StockScreen'

//App routes
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LoginScreen} />
      <Route exact path='/register' component={RegisterScreen} />
      <Route exact path='/forgot-password' component={LoginScreen} />
      <Route exact path='/home' component={HomeScreen} />
      <Route exact path='/search' component={SearchScreen} />
      <Route exact path='/my_portifolio' component={PortifolioScreen} />
      <Route exact path='/stock_selected' component={StockScreen} />
    </Switch>
  </main>
)

export default Main