import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import Team from './pages/Team/Team';

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/auth" component={AuthScreen} />
        <Route path="/team/:teamId" component={Team} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;