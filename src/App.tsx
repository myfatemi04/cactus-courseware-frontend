import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import MainPage from "./pages/MainPage";
import Module, { exampleModule } from "./components/Module";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route
          path="/m"
          element={
            <Module
              data={exampleModule}
              path=""
              tree={{
                name: "Machine Learning Course",
                children: [
                  {
                    name: "Introduction",
                  },
                ],
              }}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;