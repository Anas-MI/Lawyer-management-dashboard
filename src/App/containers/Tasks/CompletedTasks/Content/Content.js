
import React from 'react'


class Content extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    data: [{Date : "11/11/19" , Task: "Something" , Discription : "We Dont Know", Matter : "Same" },
    {Date : "3/1/20" , Task: "Something else" , Discription : "We Dont Know this one too", Matter : "Same Again" }]
  }}
  
  render() {
    let newData = this.state.data.map((value, index)=>{
      return  <tr>
      <th scope="row">{value.Date}</th>
      <td>{value.Discription}</td>
      <td>{value.Task}</td>
      <td>{value.Matter}</td>
    </tr>
    })
    return (
      <div>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Discription</th>
              <th scope="col">Task</th>
              <th scope="col">Matter</th>
            </tr>
          </thead>
          <tbody>
            {newData}
          </tbody>
      </table>
      </div>     
    )
  }
}

export default Content 
