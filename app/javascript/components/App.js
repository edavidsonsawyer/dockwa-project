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

function CandidatesList() {
  // No reason the state should change here, but it's the kind of data that might be updated on the fly
  // so it makes sense to start off stateful.
  const [customers, setCustomers] = useState(null);

  // Simple api call for the customer data. This should be fleshed out into a generic loading component 
  // that would wrap this function and display a loading screen until the promise is fullfilled
  useEffect(() => {
    fetch.("api/v1/customers")
    .then( res => {
      if res.ok {return res.json()}
      throw new Error("Invalid Response");
    })
    .then( json => {
      setCustomers(json);
    })
  }, []);
  const customerRows = customers.map( customer => {
    const {first_name: firstName, last_name: lastName, email, vehicles} = customer;
    //Nothing prevents a customer from having multple vehicles, but for this we're just going to return the first one 
    const {vehicle_type: vehicleType, name: vehicleName, length} = vehicles[0];
    return {
      name: `${lastName}, ${firstName}`,
      email: email,
      vehicleName: vehicleName,
      vehicleType: vehicleType,
      vehicleLength: length
    }
  });
  return(
    <CustomerTable rows={customerRows} />
  );
}
