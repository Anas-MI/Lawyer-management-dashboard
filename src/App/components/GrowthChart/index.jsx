
    import React, { useState , useEffect} from "react";
    import { Line } from "@ant-design/charts";
    import { Dropdown, Row, Col } from "react-bootstrap";
    import api from "../../../resources/api";
    
    const GrowthChart = (props) => {
      const [type,setType] = useState('user')
      const now = new Date()
      var start_of_year = new Date(now.getFullYear(), 0, 1)
             var end_of_year = new Date(now.getFullYear() , 11 , 31 );

      const months = [
        { month: "January", date: new Date(now.getFullYear(), 0 ,1 ) },
        { month: "Feburary", date: new Date(now.getFullYear(), 1 ,1 ) },
        { month: "March", date: new Date(now.getFullYear(), 2 ,1 ) },
        { month: "April", date: new Date(now.getFullYear(), 3 ,1 ) },
        { month: "May", date: new Date(now.getFullYear(), 4 ,1 ) },
        { month: "June", date: new Date(now.getFullYear(), 5 ,1 ) },
        { month: "July", date: new Date(now.getFullYear(), 6 ,1 ) },
        { month: "August", date: new Date(now.getFullYear(), 7 ,1 ) },
        { month: "September", date: new Date(now.getFullYear(), 8 ,1 ) },
        { month: "October", date: new Date(now.getFullYear(), 9 ,1 ) },
        { month: "November", date: new Date(now.getFullYear(), 10 ,1 ) },
        { month: "December", date: new Date(now.getFullYear(), 11 ,1 ) },
    
      ]
      const [data, setdata] = useState([])
      const [Amount, setAmount] = useState([])
    
    
    
        const fetchData = () => {
             api.get(`admin/showall`).then((res)=>{
            console.log(res)
            console.log(months.length)
            let graphdata = []
    
                months.map((month, num)=>{
                    let value = 0
                    const count = num + 1
                
                    res.data.data.map((val, index)=>{
                        const date = new Date(val.created_at)
                    
                        if(date >= month.date && date < months[num + 1].date)
                            {
                                value ++                      
                            }
                    })
                    graphdata.push({
                        Month : month.month, value: value
                    })
                    
                })
                
                setdata(graphdata)
                console.log(graphdata)
                console.log(data)
    
            
        })
    
        api.get(`subscription/showall`).then((res)=>{
            console.log(res)
            console.log(months.length)
            let amountData = []
                months.map((month, num)=>{
        
                    let amount = 0
                  
                    res.data.data.map((val, index)=>{
                       if(val.userId != null){
                        const date = new Date(val.userId.registeredOn.date)
                      
                        
                        if(val.requestGranted === "Yes"){
                            if(date >= month.date && date < months[num + 1].date)
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
                        Month : month.month, value: amount
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
        xField: "Month",
        yField: "value",
      };
    
      
      const subconfig = {
        data: Amount,
        title: {
          visible: true,
          text: "Subscription Growth Chart",
        },
        xField: "Month",
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
    