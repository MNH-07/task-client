import React from 'react';

const GetDepartment = ({ getName, nm }) => {
    const user= getName(nm);
  console.log(user)
  const getEmail= (user)=> {
    try{
      return user[0].departmentName;
    }
    catch{
      return "";
    }
  }
  const email= getEmail(user);
  console.log(email);
  return <div>{email}</div>;
};

export default GetDepartment;