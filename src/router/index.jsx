import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import LoginLayout from "../layouts/LoginLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import Dashboard from "../pages/dashboard";
import Classes from "../pages/[sid]/classes/Classes";
import Batches from "../pages/[sid]/classes/batches/Batches";
import Student from "../pages/students/Students";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/"
          element={
            <TeacherLayout>
              <Dashboard />
            </TeacherLayout>
          }
        />
        <Route
          path="/classes"
          element={
            <TeacherLayout>
              <Classes />
            </TeacherLayout>
          }
        />
        <Route
          path="/classes/:id/batches"
          element={
            <TeacherLayout>
              <Batches />
            </TeacherLayout>
          }
        />
        <Route
          path="/students"
          element={
            <TeacherLayout>
              <Student />
            </TeacherLayout>
          }
        />
        <Route
          path="/students/:id"
          element={
            <TeacherLayout>
              <Batches />
            </TeacherLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
