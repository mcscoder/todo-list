import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import { privateRoutes, publicRoutes } from "routes/routes";
import { useMemo } from "react";
import localStorageKey from "config/localStorageKey";

function App() {
  const routes = useMemo(() => {
    const profileName = localStorage.getItem(localStorageKey.profile);
    // console.log(profileName);

    if (profileName === null) {
      // console.log("public");
      return publicRoutes;
    }

    // console.log("private");
    return privateRoutes;
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<DefaultLayout>{route.element}</DefaultLayout>}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
