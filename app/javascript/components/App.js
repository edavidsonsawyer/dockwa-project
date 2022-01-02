import React, { useState, useEffect } from 'react';
function App() {
return (
    <div className="App">
      <header />
      <div>
        <CustomerList />
      </div>
    </div>
  );
}

export default App

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

function TableRows(props) {
  const {rows, sortByName, sortDesc} = props;

  function sortByCustomerName(customerRows) {
    const sortedRows = customerRows.sort((customerA, customerB) => {
      return customerA.name.localeCompare(customerB.name);
    });
    return sortDesc ? sortedRows : sortedRows.reverse();
  }

  function sortByVehicleType(customerRows) {
    const sortedRows = customerRows.sort((customerA, customerB) => {
      return customerA.length - customerB.length;
    });
    return sortDesc ? sortedRows : sortedRows.reverse();
  }

  const sortedRows = sortByName ? sortByCustomerName(rows) : sortByVehicleType(rows);
;
  return (
    <>
    {sortedRows.map(customer => {
      return <tr key={customer.email}>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.vehicleType}</td>
        <td>{customer.vehicleName}</td>
        <td>{customer.length}</td>
      </tr>
    })}
    </>
  )
}
