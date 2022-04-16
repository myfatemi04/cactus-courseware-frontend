import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./Drawer";
import MainPage from "./MainPage";
import Module, { exampleModule } from "./Module";

function App() {
  return (
    <BrowserRouter>
      {PersistentDrawerLeft("Github Opencourseware")}
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
        <Route path="/Search" element={<MainPage />}></Route>
        <Route path="/Upload"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;