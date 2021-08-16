import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import React from 'react';
import Header from "../organisms/Header";


export default function MainPage(){

  return (
    <>
    {/* <Link to="/page/tasks">Header</Link>
    <Link to="/page/dashboards">Sidebar</Link> */}
    <Header />
    <Switch>
      <Route path="/page/tasks">
        <p>Tasks!</p>
      </Route>
      <Route path="/page/dashboards">
        <p>Dashboards</p>
      </Route>
      <Route path="/page/infos">
        <p>Infos</p>
      </Route>
    </Switch>
    </>
  )
}