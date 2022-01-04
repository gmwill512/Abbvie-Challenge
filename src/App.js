import './App.css';
import data, { header } from './data';
import {
  Dropdown,
  Row,
  Container,
  Col,
  Form,
  Button,
  Table,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Graph from './graph';

function App() {
  const [people, setPeople] = useState(data);
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState({
    trt01p: 'All',
    avisitn: 'All',
    Ychecked: false,
    Nchecked: false,
  });

  //Remove duplicate AVISITN values for filter
  let nums = data.map((person) => person.AVISITN);
  nums = [...new Set(nums)];

  //Handle filter changes from dropdowns
  function handleTrt01pFilter(eventKey) {
    setFilters({ ...filters, trt01p: eventKey });
  }
  function handleAvistnFilter(eventKey) {
    setFilters({ ...filters, avisitn: eventKey });
  }

  //Executes filters on the data, dynamcially changing the table
  function handleFilters() {
    let temp = data;
    if (filters.trt01p !== 'All') {
      temp = temp.filter((person) => person.TRT01P === filters.trt01p);
    }
    if (filters.avisitn !== 'All') {
      temp = temp.filter((person) => person.AVISITN === +filters.avisitn);
    }

    if (filters.Ychecked) {
      temp = temp.filter((person) => person.CRIT5FL === 'Y');
    }
    if (filters.Nchecked) {
      temp = temp.filter((person) => person.CRIT5FL === 'N');
    }

    setPeople(temp);
    //Handles console logged averages using dynamic data
    filteredData(temp);
  }

  //Resets the data filters
  function handleReset() {
    setFilters({
      trt01p: 'All',
      avisitn: 'All',
      Ychecked: false,
      Nchecked: false,
    });
  }

  //Handles the averages
  function filteredData(people) {
    let avalAvg = people.map((person) => person.AVAL);
    let chgAvg = people.map((person) => person.CHG);

    avalAvg = avalAvg.reduce((a, b) => a + b, 0) / avalAvg.length;
    chgAvg = chgAvg.reduce((a, b) => a + b, 0) / chgAvg.length;

    console.log('AVAL average is: ' + avalAvg);
    console.log('CHG average is: ' + chgAvg);
  }

  //Rerenders on pageload and when filters change
  useEffect(() => {
    handleFilters();
  }, [filters]);

  return (
    <div className="App">
      <Container className="fixed-top">
        <Row className="filters">
          <Col>
            <Button onClick={() => handleReset()} variant="success">
              Reset
            </Button>
          </Col>
          <Col className="filter-elements">
            <h6>TRT01P Filter:</h6>
            <Dropdown onSelect={(eventKey) => handleTrt01pFilter(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filters.trt01p === 'All' ? 'All' : filters.trt01p}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" eventKey="All">
                  ALL
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="ABC Y MG">
                  ABC Y MG
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="ABC X MG">
                  ABC X MG
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="Placebo">
                  Placebo
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="filter-elements">
            <h6>AVISITN Filter:</h6>
            <Dropdown onSelect={(eventKey) => handleAvistnFilter(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filters.avisitn === 'All' ? 'All' : filters.avisitn}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#" eventKey="All">
                  ALL
                </Dropdown.Item>
                {nums &&
                  nums.map((selection) => (
                    <Dropdown.Item
                      href="#"
                      eventKey={selection}
                      key={Math.random()}
                    >
                      {selection}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="checkbox col-auto">
            <h6>AVISITN Filter:</h6>
            <Form.Group className="check-filter">
              <Form.Check
                label="Yes"
                inline
                onChange={() =>
                  setFilters({ ...filters, Ychecked: !filters.Ychecked })
                }
              />
              <Form.Check
                label="No"
                inline
                onChange={() =>
                  setFilters({ ...filters, Nchecked: !filters.Nchecked })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => setModal(true)}>
              Graph
            </Button>
            <Graph
              show={modal}
              onHide={() => setModal(false)}
              people={people}
            />
          </Col>
        </Row>
      </Container>
      <Container className="body">
        <Table striped bordered hover>
          <thead>
            <tr>
              {header.map((titles, index) => (
                <th key={index}>{titles}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>{mapPeople(person)}</tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

// Gets values from People object to be displayed in table
function mapPeople(people) {
  let res = [];
  for (const [key, value] of Object.entries(people)) {
    res.push(
      <td className="data" key={Math.random()}>
        {value}
      </td>
    );
  }
  return res;
}

export default App;
