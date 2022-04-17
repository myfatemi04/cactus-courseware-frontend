import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseContextProvider } from "./components/CourseContext";
import PersistentDrawerLeft from "./components/Drawer";
import { DrawerContextProvider } from "./components/DrawerContext";
import { Container } from "./Container";
import CoursePage from "./pages/CoursePage";
import MainPage from "./pages/MainPage";
import UploadCoursePage from "./pages/UploadCoursePage";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <CourseContextProvider>
        <DrawerContextProvider>
          <PersistentDrawerLeft name={"Cacti Courseware"} />
          <Container>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Search" element={<MainPage />} />
              <Route path="/Upload" element={<UploadCoursePage />} />
              <Route path="/courses/:id" element={<CoursePage />} />
              <Route path="/courses/:id/:path" element={<CoursePage />} />
            </Routes>
          </Container>
        </DrawerContextProvider>
      </CourseContextProvider>
    </BrowserRouter>
  );
}

export default App;
