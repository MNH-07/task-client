import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword.jsx";
import Main from "./Pages/Layout/Main.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import ResetPassword from "./Pages/ResetPssword/ResetPassword.jsx";
import CreateProject from "./Pages/CreatProject/CreateProject.jsx";
import EditProject from "./Pages/EditProject/EditProject.jsx";
import ProjectView from "./Pages/ProjectView/ProjectView.jsx";
import Tasks from "./Pages/Tasks/Tasks.jsx";
import CreateTask from "./Pages/CreateTask/CreateTask.jsx";
import EditTask from "./Pages/EditTask/EditTask.jsx";
import Overview from "./Pages/Overview/Overview.jsx";
import CreateDepartment from "./Pages/CreateDepartment/CreateDepartment.jsx";
import Departments from "./Pages/Departments/Departments.jsx";
import EditDepartment from "./Pages/EditDepartment/EditDepartment.jsx";
import CreateDesignation from "./Pages/CreateDesignation/CreateDesignation.jsx";
import Designations from "./Pages/Designations/Designations.jsx";
import EditDesignation from "./Pages/EditDesignation/EditDesignation.jsx";
import PrivateRoute from "./Provider/PrivateRoute.jsx";
import Attendances from "./Pages/Attendances/Attendances.jsx";
import CreateLeave from "./Pages/CreateLeave/CreateLeave.jsx";
import EditAttendance from "./Pages/EditAttendance/EditAttendance.jsx";
import Leaves from "./Pages/Leaves/Leaves.jsx";
import EditLeave from "./Pages/EditLeave/EditLeave.jsx";
import CreateAnnouncement from "./Pages/CreateAnnouncement/CreateAnnouncement.jsx";
import EditAnnouncement from "./Pages/EditAnnouncement/EditAnnouncement.jsx";
import Announcements from "./Pages/Announcements/Announcements.jsx";
import DepartmentView from "./Pages/DepartmentView/DepartmentView.jsx";
import AllProjects from "./Pages/AllProjects/AllProjects.jsx";
import AllTasks from "./Pages/AllTasks/AllTasks.jsx";
import EditStatus from "./Pages/EditStatus/EditStatus.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main></Main>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/overview",
        element: <Overview></Overview>,
      },
      {
        path: "/projects",
        element: <Projects></Projects>,
      },
      {
        path: "/all-projects",
        element: <AllProjects></AllProjects>,
      },
      {
        // Create Project
        path: "/create-project",
        element: <CreateProject></CreateProject>,
      },

      {
        // Edit Project
        path: "/edit-project/:id",
        element: <EditProject></EditProject>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/projects/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        path: "/project-view/:id",
        element: <ProjectView></ProjectView>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/project/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        path: "/tasks",
        element: <Tasks></Tasks>,
      },
      {
        path: "/all-tasks",
        element: <AllTasks></AllTasks>,
      },
      {
        // Create Task
        path: "/create-tasks",
        element: <CreateTask></CreateTask>,
      },
      {
        // Edit Task
        path: "/edit-task/:id",
        element: <EditTask></EditTask>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        // Edit Task Status
        path: "/edit-task-status/:id",
        element: <EditStatus></EditStatus>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        // Create Department
        path: "/create-department",
        element: <CreateDepartment></CreateDepartment>,
      },
      {
        path: "/departments",
        element: <Departments></Departments>,
      },
      {
        // Edit Department
        path: "/edit-department/:id",
        element: <EditDepartment></EditDepartment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/departments/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        // Create Designation
        path: "/create-designation",
        element: <CreateDesignation></CreateDesignation>,
      },
      {
        path: "/designations",
        element: <Designations></Designations>,
      },
      {
        path: "/designation-view/:id",
        element: <DepartmentView></DepartmentView>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/designations/department/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },

      {
        // Edit Designation
        path: "/edit-designation/:id",
        element: <EditDesignation></EditDesignation>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/designations/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        path: "/attendances",
        element: <Attendances></Attendances>,
      },
      {
        // Edit Designation
        path: "/edit-attendance/:id",
        element: <EditAttendance></EditAttendance>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/attendance/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        path: "/create-leave",
        element: <CreateLeave></CreateLeave>,
      },
      {
        path: "/leaves",
        element: <Leaves></Leaves>,
      },
      {
        // Edit leave
        path: "/edit-leave/:id",
        element: <EditLeave></EditLeave>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/leave/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      {
        path: "/create-announcement",
        element: <CreateAnnouncement></CreateAnnouncement>,
      },
      // Add route for EditAnnouncement component
      {
        path: "/edit-announcement/:id",
        element: <EditAnnouncement></EditAnnouncement>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/announcements/${params.id}`, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }),
      },
      // Add route for Announcements component
      {
        path: "/announcements",
        element: <Announcements></Announcements>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
