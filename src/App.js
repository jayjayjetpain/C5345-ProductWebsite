import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";

import LandingPage from "pages/LandingPage.js";
import WebappDocumentation from "pages/WebappDocumentation";
import TimingAnalysis from "pages/TimingAnalysis.js";

import { Switch, Route } from "react-router-dom";

export default function App() {


  return (
      <Switch>
        <Route path="/doc">
          <WebappDocumentation />
        </Route>
        <Route path="/timing">
          <TimingAnalysis />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
  );
}
