import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./components/Drawer";
import Module, { exampleModule, exampleTree } from "./components/Module";
import MainPage from "./pages/MainPage";
import UploadCoursePage from "./pages/UploadCoursePage";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      {PersistentDrawerLeft("Github Opencourseware")}
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route
          path="/m"
          element={<Module data={exampleModule} path="" tree={exampleTree} />}
        ></Route>
        <Route path="/Search" element={<MainPage />}></Route>
        <Route path="/Upload" element={<UploadCoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
