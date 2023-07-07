import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App";
import Applications, {
  withCandidateApplications,
  withPositionApplications,
} from "./components/Applications";
import { Candidates, withPositionCandidate } from "./components/Candidates";
import { DetailsCard } from "./components/DetailsCard";
import { withId } from "./HOC";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Positions from "./components/Positions";

const MyRoutes = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" Component={App} />
        <Route
          path="/position"
          Component={Positions}
        />
        <Route
          path="/position/:position/applications"
          Component={withPositionApplications}
        />
        <Route
          path="/position/:position/candidates"
          Component={withPositionCandidate}
        />
        <Route
          path="/candidate/:candidate/applications"
          Component={withCandidateApplications}
        />{" "}
        X
        <Route path="/candidate/:id" Component={withId(DetailsCard)} />
        <Route path="/candidate" Component={Candidates} />
        <Route path="/application" Component={Applications} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
