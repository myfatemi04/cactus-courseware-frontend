import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseContextProvider } from "./components/CourseContext";
import { DrawerContextProvider } from "./components/DrawerContext";
import { Container } from "./Container";
import { Footer } from "./Footer";
import CoursePage from "./pages/CoursePage";
import MainPage from "./pages/MainPage";
import UploadCoursePage from "./pages/UploadCoursePage";
import "./styles/App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <CourseContextProvider>
          <DrawerContextProvider>
            {/* <PersistentDrawerLeft name={"Cacti Courseware"} /> */}
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/search" element={<MainPage />} />
                <Route path="/upload" element={<UploadCoursePage />} />
                <Route path="/courses/:id" element={<CoursePage />} />
                <Route path="/courses/:id/:path" element={<CoursePage />} />
              </Routes>
            </Container>
          </DrawerContextProvider>
        </CourseContextProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
