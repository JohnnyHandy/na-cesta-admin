import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Template from './template';
import Dashboard from './container/dashboard/index';
import CreateProductForm from './container/form/newProducts';
import EditProductForm from './container/form/editProduct';
import CreateModelForm from './container/form/newModel';
import EditModelForm from './container/form/editModel';

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
          <EditProductForm />
        </Route>
        <Route path="/models/new">
          <Template>
            <CreateModelForm />
          </Template>
        </Route>
        <Route path="/models/edit/:id">
          <EditModelForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
