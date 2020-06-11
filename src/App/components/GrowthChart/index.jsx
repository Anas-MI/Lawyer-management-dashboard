import React, { useState } from "react";
import { Line } from "@ant-design/charts";
import { Dropdown, Row, Col } from "react-bootstrap";

const GrowthChart = (props) => {
  const [type,setType] = useState('user')

  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];
  const config = {
    data,
    title: {
      visible: true,
      text: "User Growth Chart",
    },
    xField: "year",
    yField: "value",
  };

  const subdata = [
    { year: "1991", value: 80 },
    { year: "1992", value: 100 },
    { year: "1993", value: 500 },
    { year: "1994", value: 120 },
    { year: "1995", value: 49 },
    { year: "1996", value: 652 },
    { year: "1997", value: 741 },
    { year: "1998", value: 90 },
    { year: "1999", value: 134 },
  ];
  const subconfig = {
    data:subdata,
    title: {
      visible: true,
      text: "Subscription Growth Chart",
    },
    xField: "year",
    yField: "value",
  };


  return (
    <div style={{display:'flex'}}>

          <Line {...config} style={{width:'auto'}} />
      
          <Line {...subconfig}  style={{width:'auto'}} />


      {/* <Dropdown >
        <Dropdown.Toggle variant={"link"} id="dropdown-basic">
          Growth Chart
        </Dropdown.Toggle>
        <ul>
          <Dropdown.Menu>
            <li>
              <span
                onClick={()=>setType('user')}
                className="dropdown-item"
              >
                User Growth Chart
              </span>
            </li>
            <li>
              <span
                onClick={()=>setType('sub')}
                className="dropdown-item"
              >
                Subscription Growth Chart
              </span>
            </li>
          </Dropdown.Menu>
        </ul>
      </Dropdown>

      {
        type==='user'
      } */}
      
    </div>
  );
};
export default GrowthChart;
