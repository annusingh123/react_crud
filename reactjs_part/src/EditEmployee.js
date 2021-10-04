import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditEmployee = () => {
  
  let history = useHistory(); 
  const { id } = useParams();  

  const [user ,setUser] = useState({
      fname:"",
      lname:"",
      email:"",
      phone:"",
      salary:""
  })


  const { fname, lname, email, phone, salary } = user;

  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  
  const updateEmployee = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/v1/employee/${id}`, user);
    history.push("/");
  };

  const loadUser =  () => {
    fetch(`http://localhost:5000/api/v1/employee/${id}`,{
			method: "GET",
		  })
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
        setUser({
					id: id,
					update: true,
					fname: result.response[0].first_name,
          lname: result.response[0].last_name,
          email: result.response[0].email,
          phone: result.response[0].phone,
          salary: result.response[0].salary,

				});
			})
			.catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Edit A employee</h4>
      
          <h5 className="text-success">Employee ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="fname"
              value={fname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Price"
              name="lname"
              value={lname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="salary"
              value={salary}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update Employee</button>
      
       </div>
      </div> 
    </div>
  );
};

export default EditEmployee;
