import React, { useState , useEffect} from "react";
import { Line } from "@ant-design/charts";
import { Dropdown, Row, Col } from "react-bootstrap";
import api from "../../../resources/api";

const GrowthChart = (props) => {
  const [type,setType] = useState('user')
  const now = new Date()
  const [Weeks, setWeeks] = useState([])
  const [data, setdata] = useState([])
  const [Amount, setAmount] = useState([])


  const getWeeksStartAndEndInMonth = (month, year) =>{
    let weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    let start = 1;
    let end = 7 - firstDate.getDay();
    if (start === 'monday') {
        if (firstDate.getDay() === 0) {
            end = 1;
        } else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        weeks.push({start: start, end: end});
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }
    api.get(`admin/showall`).then((res)=>{
        console.log(res)
        console.log(weeks.length)
        let graphdata = []
        let amountData = []
            weeks.map((weeks, num)=>{
                let value = 0
                let amount = 0
                let count = num + 1  
                res.data.data.map((val, index)=>{
                    const date = new Date(val.created_at)
                    if(date <= new Date(now.getFullYear() , now.getMonth() , weeks.end) && date >= new Date(now.getFullYear() , now.getMonth() , weeks.start))
                          {
                            value ++                      
                        }
                })
                graphdata.push({
                    Week : "Week" + count, value: value
                })
                
            })
            
            setdata(graphdata)
            console.log(graphdata)
            console.log(data)

        
    })

    api.get(`subscription/showall`).then((res)=>{
        console.log(res)
        console.log(weeks.length)
        let amountData = []
            weeks.map((weeks, num)=>{
    
                let amount = 0
                let count = num + 1  
                res.data.data.map((val, index)=>{
                   if(val.userId != null){
                    const date = new Date(val.userId.registeredOn.date)
                  
                    
                    if(val.requestGranted === "Yes"){
                        if(date <= new Date(now.getFullYear() , now.getMonth() , weeks.end) && date >= new Date(now.getFullYear() , now.getMonth() , weeks.start))
                          {
                        
                            if(val.subscriptionRequested === "monthly"){
                                amount = amount + 100
                            }else{
                                amount = amount + 1200
                            }

                        }
                        
                    }
                   }
                    
                })
                amountData.push({
                    Week : "Week" + count, value: amount
                })
                
            })
            
            setAmount(amountData)
            console.log(amountData)
            console.log(Amount)

        
    })
    
}

  useEffect(() => {
    getWeeksStartAndEndInMonth(now.getFullYear(), now.getMonth() + 1)
  }, [])
  
  const config = {
    data : data,
    title: {
      visible: true,
      text: "User Growth Chart",
    },
    xField: "Week",
    yField: "value",
  };

  
  const subconfig = {
    data: Amount,
    title: {
      visible: true,
      text: "Subscription Growth Chart",
    },
    xField: "Week",
    yField: "value",
  };


  return (
    <>
      <Row>
        <Col sm className="card col-md-5 mx-3">
          <Line {...config} />
        </Col>
        <Col sm className="card col-md-5 mx-3">
          <Line {...subconfig} />
        </Col>
      </Row>

          
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
      
    </>
  );
};
export default GrowthChart;
