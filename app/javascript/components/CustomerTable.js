import React, { useState } from "react";
import TableRows from "./TableRows";

function CustomerTable(props) {
  let [sortByName, setSortByName] = useState(true);
  let [sortDesc, setSortDesc] = useState(true);

  // For more than two columns this callback would just set they type of sort (alpha, number, etc.), based on
  // the column header property. But with only two sorts we can be more compact and code interviews are supposed to 
  // have closures somewhere
  function setSort(isNameColumn) {
    return () => {
      if (isNameColumn === sortByName) setSortDesc(!sortDesc) // default to desc sort when column is changed
      setSortByName(isNameColumn);
    }
  }

  const customerRows = props.customers.map(customer => {
    const {first_name: firstName, last_name: lastName, email, vehicles} = customer;

    //Nothing prevents a customer from having multple vehicles, but for this we're just going to return the first one 
    const {vehicle_type: vehicleType, name: vehicleName, length} = vehicles[0];

    return {
      name: `${lastName}, ${firstName}`,
      email: email,
      vehicleType: vehicleType,
      vehicleName: vehicleName,
      length: length
    }
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th onClick={setSort(true)}>Customer Name</th>
          <th>Customer Email</th>
          <th>Vehicle Type</th>
          <th>Vehicle Name</th>
          <th onClick={setSort(false)}>Length (ft)</th>
        </tr>
      </thead>
      <tbody>
        <TableRows rows={customerRows} sortByName={sortByName} sortDesc={sortDesc} />
      </tbody>
    </table>
  )
}

export default CustomerTable;