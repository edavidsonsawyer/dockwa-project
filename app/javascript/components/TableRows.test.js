import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import TableRows from './TableRows';

configure({ adapter: new Adapter() });

const testCustomers = [
  {
    name: "Zmith, Jill",
    email: "last@email.com",
    vehicleType: "canoe",
    vehicleName: "smallest",
    length: "1"
  },
  {
    name: "Mmith, Jill",
    email: "middle@email.com",
    vehicleType: "canoe",
    vehicleName: "medium",
    length: "5"
  },
  {
    name: "Amith, Jill",
    email: "first@email.com",
    vehicleType: "canoe",
    vehicleName: "biggest",
    length: "10"
  }
];

test('TableRows orders by name descending', () => {

  const table = shallow(<TableRows rows={testCustomers} sortByName={true} sortDesc={true} />);
  const rows = table.find('tr');
  expect(rows.at(0).find('td').at(0).text()).toEqual("Amith, Jill");
  expect(rows.at(2).find('td').at(0).text()).toEqual("Zmith, Jill");
  
});

test('TableRows orders by name ascending', () => {

  const table = shallow(<TableRows rows={testCustomers} sortByName={true} sortDesc={false} />);
  const rows = table.find('tr');
  expect(rows.at(0).find('td').at(0).text()).toEqual("Zmith, Jill");
  expect(rows.at(2).find('td').at(0).text()).toEqual("Amith, Jill");
  
});

test('TableRows orders by length descending', () => {

  const table = shallow(<TableRows rows={testCustomers} sortByName={false} sortDesc={true} />);
  const rows = table.find('tr');
  expect(rows.at(0).find('td').at(0).text()).toEqual("Zmith, Jill");
  expect(rows.at(2).find('td').at(0).text()).toEqual("Amith, Jill");
  
});

test('TableRows orders by length ascending', () => {
  
  const table = shallow(<TableRows rows={testCustomers} sortByName={false} sortDesc={false} />);
  const rows = table.find('tr');
  expect(rows.at(0).find('td').at(0).text()).toEqual("Amith, Jill");
  expect(rows.at(2).find('td').at(0).text()).toEqual("Zmith, Jill");
  
});