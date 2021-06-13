import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Template from './template';
import Dashboard from './container/dashboard/index';
import CreateProductForm from './container/form/newProducts';
import EditProductForm from './container/form/editProduct';
import CreateModelForm from './container/form/newModel';
import EditModelForm from './container/form/editModel';
import LoginForm from './container/form/login';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Switch>
        {!isLoggedIn ? (
          <Route path="/">
            <Template>
              <LoginForm />
            </Template>
          </Route>
        )
          : (
            <>
              <Route exact path="/">
                <Template>
                  <Dashboard />
                </Template>
              </Route>
              <Route path="/products/new">
                <Template>
                  <CreateProductForm />
                </Template>
              </Route>
              <Route path="/products/edit/:id">
                <Template>
                  <EditProductForm />
                </Template>
              </Route>
              <Route path="/models/new">
                <Template>
                  <CreateModelForm />
                </Template>
              </Route>
              <Route path="/models/edit/:id">
                <Template>
                  <EditModelForm />
                </Template>
              </Route>
            </>
          )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
