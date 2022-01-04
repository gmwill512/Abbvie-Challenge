import Plot from 'react-plotly.js';
import React from 'react';
import { Modal } from 'react-bootstrap';

function Graph(props) {
  //Get x and y coordinates
  let xPoints = props.people.map((persons) => persons.AVISITN);
  let yPoints = props.people.map((persons) => persons.AVAL);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Plot
          data={[
            {
              x: xPoints,
              y: yPoints,
              type: 'scatter',
              mode: 'markers',
            },
          ]}
          layout={{
            width: 600,
            height: 600,
            title: 'Abbvie Challenge',
            xaxis: { title: 'AVISITN' },
            yaxis: { title: 'AVAL' },
          }}
        />
      </Modal>
    </div>
  );
}

export default Graph;
