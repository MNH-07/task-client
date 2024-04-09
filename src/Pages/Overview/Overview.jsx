import { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart library
import UpdateProfile from "./UpdateProfile/UpdateProfile";

const Overview = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchadmin = async () => {
      try {
        // Retrieve token from local storage
        const response = await fetch(
          `http://localhost:5000/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.isAdmin);
          setAdmin(data.isAdmin);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchadmin();
  }, []);

  if (admin) {
    useEffect(() => {
      fetch(`http://localhost:5000/projects`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
        });
    }, []);
  } else {
    useEffect(() => {
      fetch(
        `http://localhost:5000/projects/user/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
        });
    }, []);
  }
  if (admin) {
    useEffect(() => {
      fetch("http://localhost:5000/tasks", {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
    }, []);
  } else {
    useEffect(() => {
      fetch(
        `http://localhost:5000/tasks/user/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
    }, []);
  }
  // Refs for chart canvases
  const projectsChartRef = useRef(null);
  const tasksChartRef = useRef(null);

  // Function to create and update charts
  const createChart = (chartRef, chartData, chartType) => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartRef.current.chart = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: {
          // Add options as needed
        },
      });
    }
  };

  // Sample data for demonstration

  const projectsData = {
    labels: ["In Progress", "Completed", "On Hold"],
    datasets: [
      {
        label: "Task",
        data: [
          projects.filter((project) => project.priority === "High").length,
          projects.filter((project) => project.priority === "Medium").length,
          projects.filter((project) => project.priority === "Low").length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const tasksData = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          tasks.filter((project) => project.status === "Not Started").length,
          tasks.filter((project) => project.status === "In Progress").length,
          tasks.filter((project) => project.status === "Completed").length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  console.log(projects, tasks);

  // Create and update charts
  createChart(projectsChartRef, projectsData, "pie");
  createChart(tasksChartRef, tasksData, "bar");

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-[2rem] w-full">
      <h1 className="text-4xl text-[#8B5CF6] font-[600]">Overview</h1>
      <hr className="solid mt-[1rem]" />
      <div className="grid grid-cols-2 gap-4 w-full mt-[2rem]">
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
          <div className="py-[.5rem] px-[1rem] bg-[#E8DEFD] font-bold">
            Leave taken vs remaining
          </div>
          <canvas ref={projectsChartRef} />
        </div>
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden mt-8">
          <div className="py-[.5rem] px-[1rem] bg-[#E8DEFD] font-bold">
            Tasks by status
          </div>
          <canvas ref={tasksChartRef} />
        </div>
        <div className="shadow-[0_5px_15px_0px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden"></div>
      </div>
      <div>
        <div className="flex text-xl overflow-hidden md:overflow-hidden my-[1rem]">
          <p className={`text-primary font-bold p-[1rem] mx-[1rem]`}>
            Personal Details
          </p>
        </div>
        <hr className="solid mt-[1rem]" />
        <div>
          <UpdateProfile></UpdateProfile>
        </div>
      </div>
    </div>
  );
};

export default Overview;
