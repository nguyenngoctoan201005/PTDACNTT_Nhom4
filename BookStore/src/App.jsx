import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { GlobalProvider } from "./GlobalContext";
import { App as AntdApp } from "antd";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <AntdApp>
      <GlobalProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((child, childIndex) => (
                    <Route
                      key={childIndex}
                      index={child.index}
                      path={child.path}
                      element={child.element}
                    >
                      {child.children &&
                        child.children.map((childI, childIndexI) => (
                          <Route
                            key={childIndexI}
                            index={childI.index}
                            path={childI.path}
                            element={childI.element}
                          />
                        ))}
                    </Route>
                  ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </GlobalProvider>
    </AntdApp>
  );
}

export default App;
