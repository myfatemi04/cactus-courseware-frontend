import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseContextProvider } from "./components/CourseContext";
import PersistentDrawerLeft from "./components/Drawer";
import Module, { exampleModule, exampleTree } from "./components/Module";
import CoursePage from "./pages/CoursePage";
import MainPage from "./pages/MainPage";
import UploadCoursePage from "./pages/UploadCoursePage";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <CourseContextProvider>
        <PersistentDrawerLeft
          name={"Github Opencourseware"}
        ></PersistentDrawerLeft>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/m"
            element={<Module data={exampleModule} path="" tree={exampleTree} />}
          />
          <Route path="/Search" element={<MainPage />} />
          <Route path="/Upload" element={<UploadCoursePage />} />
          <Route path="/courses/:user/:repo" element={<CoursePage />} />
        </Routes>
      </CourseContextProvider>
    </BrowserRouter>
  );
}

export default App;
