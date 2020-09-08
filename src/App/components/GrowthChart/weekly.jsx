import React, { useState , useEffect} from "react";
import { Line } from "@ant-design/charts";
import { Dropdown, Row, Col } from "react-bootstrap";
import api from "../../../resources/api";

const GrowthChart = (props) => {
  const [type,setType] = useState('user')
  const now = new Date()
  var start_of_week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
         var end_of_week = new Date(
           now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
         );
  const days = [
      start_of_week.getDate() ,
      start_of_week.getDate() + 1,
      start_of_week.getDate() + 2,
      start_of_week.getDate() + 3,
      start_of_week.getDate() + 4,
      start_of_week.getDate() + 5,
      start_of_week.getDate() + 6,

  ]
  const [data, setdata] = useState([])
  const [Amount, setAmount] = useState([])



    const fetchData = () => {
         api.get(`admin/showall`).then((res)=>{
        console.log(res)
        console.log(days.length)
        let graphdata = []

            days.map((days, num)=>{
                let value = 0
                let ddd = now
                ddd.setDate(days)
            
                res.data.data.map((val, index)=>{
                    const date = new Date(val.created_at)
                    
                    if(date.getDate() === days &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear())
                          {
                            value ++                      
                        }
                })
                graphdata.push({
                    Day : days, value: value
                })
                
            })
            
            setdata(graphdata)
            console.log(graphdata)
            console.log(data)

        
    })

    api.get(`subscription/showall`).then((res)=>{
        console.log(res)
        console.log(days.length)
        let amountData = []
            days.map((days, num)=>{
    
                let amount = 0
              
                res.data.data.map((val, index)=>{
                   if(val.userId != null){
                    const date = new Date(val.userId.registeredOn.date)
                  
                    
                    if(val.requestGranted === "Yes"){
                        if(date <= new Date(now.getFullYear() , now.getMonth() , days))
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
                    Day : days, value: amount
                })
                
            })
            
            setAmount(amountData)
            console.log(amountData)
            console.log(Amount)

        
    })
    }
  useEffect(() => {
    //getWeeksStartAndEndInMonth(now.getFullYear(), now.getMonth() + 1)
    fetchData()
  }, [])
  
  const config = {
    data : data,
    title: {
      visible: true,
      text: "User Growth Chart",
    },
    xField: "Day",
    yField: "value",
  };

  
  const subconfig = {
    data: Amount,
    title: {
      visible: true,
      text: "Subscription Growth Chart",
    },
    xField: "Day",
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
