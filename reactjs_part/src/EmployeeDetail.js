import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function EmployeeDetail() {
  const [search, setSearch] = useState('');
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    salary: ""
  });

  //  Object Destructuring 
  const { fname, lname, email, phone, salary } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // On Page load display all records:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  const loadEmployeeDetail = async () => {
    var response = fetch('http://localhost:5000/api/v1/employee')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  }
  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  // Insert Employee Records:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  const submitEmployeeRecord = async (e) => {
    //e.preventDefault();
    //e.target.reset();
    await axios.post("http://localhost:5000/api/v1/employee", user);
    alert('Data Inserted');

    loadEmployeeDetail();
  };

  // Search Records here:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  const searchRecords = (e) => {
    setSearch(e.target.value)
    if (!e.target.value) {
      loadRecordAgain()
    } else
      axios.get(`http://localhost:5000/api/v1/employee/searchRecord/${e.target.value}`)
        .then(response => {
          setRecord(response.data);
        });
  }

  const loadRecordAgain = () => {
    var response = fetch('http://localhost:5000/api/v1/employee')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  }
  
  useEffect(() => {
    loadRecordAgain();
  }, []);


  // Delete Employee Record::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const deleteRecord = (EmployeeId) => {
    axios.delete(`http://localhost:5000/api/v1/employee/${EmployeeId}`)
      .then((result) => {
        loadEmployeeDetail();
      })
      .catch(() => {
        alert('Error in the Code');
      });
  };

  return (

    <section>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        </div>
      </nav>

      <div class="container">
        <div class="row mt-3">
          <div class="col-sm-4">
            <div className="box p-3 mb-3 mt-5" style={{ border: "1px solid #d0d0d0" }}>
              <form onSubmit={submitEmployeeRecord}>
                <h5 className="mb-3 ">Insert Employee Records</h5>
                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="fname" value={fname} onChange={e => onInputChange(e)} placeholder="Enter name" required />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="lname" value={lname} onChange={e => onInputChange(e)} placeholder="Enter Sirname" required />
                </div>

                <div class="form-group">
                  <input type="email" class="form-control mb-4" pattern="^[^ ]+@[^ ]+\.[a-z]{2,6}$" name="email" value={email} onChange={e => onInputChange(e)} placeholder="xyz@gmail.com" required />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-4" pattern="(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?" name="phone" value={phone} onChange={e => onInputChange(e)} placeholder="Enter Phone" required />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control mb-2" name="salary" value={salary} onChange={e => onInputChange(e)} placeholder="Enter Salary" required />
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4">Insert Record</button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <h4 class="text-center  ml-4 mt-4  mb-5">View Records</h4>
            <div class="input-group mb-4 mt-3">
              <div class="form-outline">
                <input type="text" id="form1" onChange={searchRecords} class="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec" }} />
                {/* onKeyDown={loadRecordAgain} onKeyUp={searchRecords}  */}
              </div>
            </div>
            <table class="table table-hover  table-striped table-bordered ml-4 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {record.map((name) => (
                  <tr>
                    <td>{name.first_name}</td>
                    <td>{name.last_name}</td>
                    <td>{name.email}</td>
                    <td>{name.phone}</td>
                    <td>{name.salary}</td>
                    <td>

                      <a className="text-danger mr-2" onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + name.first_name
                        )
                        if (confirmBox === true) {
                          deleteRecord(name.id)
                        }
                      }}><button>Delete</button></a>

                      <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmployeeDetail;

