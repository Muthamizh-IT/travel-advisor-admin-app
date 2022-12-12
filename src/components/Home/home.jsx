import React from "react";
import NavBar from "../nav-Bar/nav-bar";
import { Box, TextField, Button } from "@mui/material";
import "./home.css";
import { maxWidth } from "@mui/system";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
const AdminHome = () => {
  let navigate = useNavigate()
  const [admin, setAdmin] = useState({ userName: "", password: "" })
  const [err, setError] = useState("")

  const OnChangeAdmin = async (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
  }

  const OnSubmit = async (values) => {
    if (values.userName != "Admin") {
      setError("User Name Is Incorrect")
    } else if (values.userName === null) {
      setError("UserName is Required")
    } else if (values.password !== "Admin@123") {
      setError("Password is Incorrect")
    } else if (values.password === "") {
      setError("Password is Required")
    } else {
      navigate('/Options')
    }
  }


  return (
    <div className="container">
      <NavBar />
      <div className="Login">
        <div className="forms">
          <Box
            sx={{
              boxShadow: 3,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              //   maxWidth: "600px",
              //   maxHeight: "300px",
            }}
          >
            <h1 style={{ color: "green" }}>Admin Login</h1>
            <p style={{ color: "red" }}>{err}</p>
            <TextField
              id="demo-helper-text-misaligned"
              label="User Name"
              style={{ width: "100%" }}
              name="userName"
              size="sm"
              onChange={(e) => OnChangeAdmin(e)}
            />
            <TextField
              id="demo-helper-text-misaligned"
              label="password"
              type="password"
              name="password"
              onChange={(e) => OnChangeAdmin(e)}
              style={{ width: "100%", marginTop: "2%" }}
              size="sm"
            />
            <br />
            <Button
              variant="contained"
              size="large"
              style={{ marginTop: "3%", width: "80%" }}
              onClick={() => {
                OnSubmit(admin)
              }}
            >
              Login
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
