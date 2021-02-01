import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Team from './pages/Team/Team';
import Dashboard from './pages/Dashboard/Dashboard';

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/auth" component={AuthScreen} />
        <Route path="/team/:teamId" component={Team} />
        <Route path="/admin" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;