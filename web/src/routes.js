import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import AuthScreen from './pages/AuthScreen/AuthScreen';

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/auth" component={AuthScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;