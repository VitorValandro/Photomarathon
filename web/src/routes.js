import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed/Feed';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Team from './pages/Team/Team';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/auth" component={AuthScreen} />
        <Route path="/team/:teamId" component={Team} />
        <Route path="/admin" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;