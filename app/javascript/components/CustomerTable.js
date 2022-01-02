import React, { useState } from "react";
import TableRows from "./TableRows";

function CustomerTable(props) {
  let [sortByName, setSortByName] = useState(true);
  let [sortDesc, setSortDesc] = useState(true);

  function sortColumn(isNameColumn) {
    return () => {
      if (isNameColumn === sortByName) setSortDesc(!sortDesc)
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
          <th onClick={sortColumn(true)}>Customer Name</th>
          <th>Customer Email</th>
          <th>Vehicle Type</th>
          <th>Vehicle Name</th>
          <th onClick={sortColumn(false)}>Vehicle Length</th>
        </tr>
      </thead>
      <tbody>
        <TableRows rows={customerRows} sortByName={sortByName} sortDesc={sortDesc} />
      </tbody>
    </table>
  )
}

export default CustomerTable;