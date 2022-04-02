import React from 'react';
import {
  BrowserRouter,
  Redirect, 
  Route,
  Switch
} from 'react-router-dom';

export enum ERouterUrl {
  default = '/home',
  home = '/home',
}


const PagesRouter = () => {
   return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ERouterUrl.home}
        >
          <>Home</>
        </Route>
        <Redirect from="*" to={ERouterUrl.default}/>
      </Switch>
    </BrowserRouter>
  );
}

export default PagesRouter;
