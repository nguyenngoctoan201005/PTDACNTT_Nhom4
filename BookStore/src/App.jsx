import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { GlobalProvider } from "./GlobalContext";
import { Spin, App as AntdApp } from "antd";

function App() {
  return (
    <AntdApp>
      <GlobalProvider>
        <Suspense fallback={<Spin />}>
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
                    />
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
