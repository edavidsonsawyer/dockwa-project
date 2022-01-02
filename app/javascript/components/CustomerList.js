import React, { useState, useEffect } from "react";
import CustomerTable from "./CustomerTable";

function CustomerList() {
  // No reason the state should change here, but it's the kind of data that might be updated on the fly
  // so it makes sense to start off stateful.
  let [customers, setCustomers] = useState([]);

  // Simple api call for the customer data. This should be fleshed out into a generic loading component 
  // that would wrap this function and display a loading screen until the promise is fullfilled
  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
    .then(response => {
      if (response.ok) {return response.json()}
      throw new Error("Invalid Response");
    })
    .then(json => {
      setCustomers(json);
    })
  }, []);
  return(
    <>
    {customers.length
      ? <CustomerTable customers={customers} />
      : <span>Getting Customer Data</span>}
    </>
  )
}

export default CustomerList;