import axios from "axios";
import React, { useEffect, useState } from "react";

const ListEmployees = () => {
  const [Employees, setEmployees] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contentError, setContentError] = useState("");
  const [serverError, setServerError] = useState("");
  const [newEmployee, setNewEmployee] = useState("");
  const [updateEmployee, setUpdateEmployee] = useState(false);
  const [date, setDate] = useState("");
  const [DateError, setDateError] = useState("");
  const [empId, setEmpId] = useState("");
  const [datecreate, setdatecreate] = useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/user",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(function (res) {
        setEmployees(res.data);
        console.log(res.data);
        setNewEmployee(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [newEmployee]);

  // posting new Employee

  async function handelSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      return setContentError("Add User Name for Employee!");
    }
    if (!email.trim()) {
      return setContentError("Add Email for Employee!");
    }
  
    // proceed with form submission
  
    let form_data = new FormData();
    form_data.append("username", username);
    form_data.append("email", email);
    
    try {
      console.log(form_data);
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/user",
        form_data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      setEmail("");
      setUsername("");
      setNewEmployee(true);
    } catch (error) {
      console.log(error.response.data.email[0]);
      setServerError(error.response.data.email[0])
      
    }
  }
  
  async function handelSubmitForEmployeeUpdate(e) {
    e.preventDefault();
    if (!username.trim()) {
      return setContentError("Add User Name for Employee!");
    }
    if (!email.trim()) {
      return setContentError("Add Email for Employee!");
    }
  
    // Proceed with form submission
  
    let form_data = new FormData();
    form_data.append("username", username);
    form_data.append("email", email);
  
    try {
      console.log(form_data);
      const response = await axios.put(
        `http://127.0.0.1:8000/auth/user/${updateEmployee.id}`,
        form_data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      setUpdateEmployee(false);
      setEmail("");
      setUsername("");
      setNewEmployee(true);
    } catch (error) {
      console.error(error);
      setServerError(error.response.data.email[0])

    }
  }
  

  // posting new  attendance

  // posting new Employee

  async function handelSubmitAttendance(e) {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (!date.trim()) {
      return setDateError("Add date attendance for Employee!");
    } else if (selectedDate <= currentDate) {
      return setDateError(
        "Selected date must be greater than the current date!"
      );
    }

    // proceed with form submission

    let form_data = new FormData();
    form_data.append("attend_at", date);
    form_data.append("employee", empId);
    try {
      console.log(form_data);
      const response = await axios.post(
        "http://127.0.0.1:8000/attendance/",
        
        form_data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        }
      );
      console.log(response);
      setDate("");
      setDateError("");
      setEmpId("");
      setNewEmployee(true);
      if (response.status===201) {
        setdatecreate(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if(!localStorage.getItem("access_token")){
    return window.location.href = "/Login"
  }
  return (
    <div className="container justify-content-center">
      {/* Add employees */}
      <div className="my-5" style={{boxShadow: "-1px 1px 33px 6px #ccc" , padding: "53px"}}>
        <h2 className="text-center" > Normal Employees Management</h2>
        <form
          onSubmit={
            updateEmployee ? handelSubmitForEmployeeUpdate : handelSubmit
          }
        >
          <div className="mb-3">
            <label htmlFor="Emailaddress" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Emailaddress"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setContentError("");
                setServerError("")
                setEmail(e.target.value);
              }}
            />
            {contentError && (
              <p className="text-danger font-xssss">{contentError}</p>
            )}
              {serverError && (
              <p className="text-danger font-xssss">{serverError}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="Username"
              value={username}
              onChange={(e) => {
                setContentError("");
                setServerError("")
                setUsername(e.target.value);
              }}
            />
            {contentError && (
              <p className="text-danger font-xssss">{contentError}</p>
            )}
            {serverError && (
              <p className="text-danger font-xssss">{serverError}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="justify-content-center w-100">
        {Employees &&
          Employees.map((emp) => {
            return (
              <div className=" w-75 mb-5" key={emp.id}>
                <div className="card">
                  <div className="card-header">{emp.role}</div>
                  <div className="card-body">
                    <h5 className="card-title"> Name: {emp.username}</h5>
                    <p className="card-text"> Email: {emp.email}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() => {
                          setEmail(emp.email);
                          setUsername(emp.username);
                          setUpdateEmployee(emp);
                          scrollToTop();
                        }}
                        className="btn btn-primary"
                      >
                        Edit Employee
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setEmpId(emp.id)}
                      >
                        Add Attendance
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Add Date
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handelSubmitAttendance}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="Emailaddress"
                                    className="form-label"
                                  >
                                    Email address
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    aria-describedby="dateHelp"
                                    value={date}
                                    onChange={(e) => {
                                      setDateError("");
                                      setDate(e.target.value);
                                    }}
                                  />
                                  {DateError && (
                                    <p className="text-danger font-xssss">
                                      {DateError}
                                    </p>
                                  )}
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    
                                    data-bs-dismiss={datecreate ? "modal":""}
                                  >
                                    Save Date
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListEmployees;
