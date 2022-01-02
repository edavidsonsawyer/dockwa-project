import React from "react";

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

export default TableRows;