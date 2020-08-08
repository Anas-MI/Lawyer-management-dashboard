import React, {Component} from 'react';
import windowSize from 'react-window-size';

import Aux from "../../../../../../hoc/_Aux";
import DEMO from "../../../../../../store/constant";
import searchData from './searchdata'
import { Card ,ListGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Input, AutoComplete } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import api from '../../../../../../resources/api'

const { Search } = Input;


class NavSearch extends Component {
    state = {
        searchWidth: (this.props.windowWidth < 992) ? 90 : 0,
        searchString: (this.props.windowWidth < 992) ? '90px' : '',
        isOpen: (this.props.windowWidth < 992),
        searchValue:'',
        contacts : [],
        contactSeach : [],
        companys : [],
        companySearch : [],
        matters : [],
        seachedMatters : [],
        tasks : [],
        searchedTask : [],
        Events : [],
        searchedEvents : [],
        logs : [],
        searchedLog : [],
        act : [],
        searchedAct : [],
        docs : [],
        searchedDocs : [],
        options : []
    };

    componentDidMount(){
        api.get('/contact/viewforuser/' + this.props.userId).then((res)=>{
            console.log(res)
            console.log('contacts')
            let contactData = []
            res.data.data.map((value, id) => {
      
                const data = {
                  key : id,
                  firstName: `${value.firstName} ${value.lastName}`,
                  _id: value._id,
                };
           
                contactData.push(data);
                this.setState({
                    contacts : contactData
                })
              });
        })

        api.get('/company/viewforuser/' + this.props.userId).then((res)=>{
            let companyData = []
            res.data.data.map((value, id) => {
      
                const data = {
                  key : id,
                  name: `${value.name}`,
                  _id: value._id,
                };
           
                companyData.push(data);
                this.setState({
                    companys : companyData
                })
              });
        })

        api
        .get('/matter/viewforuser/' + this.props.userId)
        .then((res) => {
            let matters = [];
            res.data.data.map((value, index) => {

                let newData = {
                key: index,
                id: value._id,
                matterDescription: value.matterDescription,
               };
                
                matters.push(newData);
            });
           this.setState({
               matters : matters
           })

        });

        api.get('/tasks/viewforuser/' + this.props.userId).then((res) => {
            let taskData = []
            console.log(res.data.data)
            res.data.data.map((value, index)=>{
              const newdata = {
                  key : index,
                  taskName : value.taskName
              }
              
              taskData.push(newdata)
              
            })
            this.setState({
                tasks : taskData
            });
        });

        api.get('/calendar/viewforuser/'+this.props.userId).then((res)=>{
            let newTableData = []
            res.data.data.map((value, index)=>{
            
            const tableData={
                id: value._id,
                Subject : value.title,
                StartTime : value.startTime,
                EndTime : value.endTime,
            }
 
            newTableData.push(tableData)
        })
        this.setState({Events : newTableData })

        })

        api.get('/communication/viewforuser/' + this.props.userId).then((res) => {
            
            let completeData = [];
            
            res.data.data.map((val, index) => {
            
              const temp = {
                key: index,
                logType: val.logType,
                id: val._id,
                subject: val.subject ? val.subject : '-',
                body: val.body,
             
              };

              completeData.push(temp);
            });
            this.setState({
              logs : completeData
            });
          });

          api.get('/activity/viewforuser/' + this.props.userId).then((res) => {
            let actData = []
            res.data.data.map((val, index) => {
              
              let temp = {
                key: index,
                type: val.type,
                id: val._id,
                description: val.description ? val.description : '-',
                //  invoiceStatus :  val.invoiceStatus?  val.invoiceStatus : "-" ,
              };
              
              actData.push(temp);
            });
            this.setState({
              act : actData
            });
          });

          api.get(`/document/viewforuser/${this.props.userId}`).then((res) => {
            let docx = []
        
            res.data.data.map((item, index) => {
              let tempDocs = {
                  key : index,
                  name : item.name
              }
              docx.push(tempDocs)
            });
            this.setState({
                docs : docx
            })
          });
         
    }

    onSearch = (val) => {
        console.log(val)
        this.setState({searchValue:val})
        // this.setState(prevSate => {
        //     return {
        //         searchWidth: prevSate.searchWidth + 15,
        //         searchString: prevSate.searchWidth + 'px'
        //     }
        // });
    }

    onSelect = value => {
        console.log((value))
        this.props.history.push(value)
    }

    // searchOnHandler = (e) => {
    //     this.setState({isOpen: true});
    //     const searchInterval = setInterval(() => {
    //         if (this.state.searchWidth >= 91) {
    //             clearInterval(searchInterval);
    //             return false;
    //         }
    //         this.setState(prevSate => {
    //             return {
    //                 searchWidth: prevSate.searchWidth + 15,
    //                 searchString: prevSate.searchWidth + 'px'
    //             }
    //         });
    //     }, 35);
    // };

    // searchOffHandler = () => {
    //     const searchInterval = setInterval(() => {
    //         if (this.state.searchWidth < 0) {
    //             this.setState({isOpen: false});
    //             clearInterval(searchInterval);
    //             return false;
    //         }
    //         this.setState(prevSate => {
    //             return {
    //                 searchWidth: prevSate.searchWidth - 15,
    //                 searchString: prevSate.searchWidth + 'px'
    //             }
    //         });
    //     }, 35);
    // };

    render() {
        let searchClass = ['main-search'];
        if (this.state.isOpen) {
            searchClass = [...searchClass, 'open'];
        }
        
        {
            /*
            <div style={{"position": "relative","bottom" : "-20px", "width" : "200%"}}>
            <Search placeholder="input search text" onChange={handleSearch} enterButton />
         </div>
         options={[{label:'Dashboard',value:'/dashboard/default'},{label:'Lawyer',value:'/lawyer'},{label:'Profile',value:'/profile'}]}
             */
        }
        const renderTitle = (title) => {
            return (
              <span>
                {title}
                {
                  /* 
                  <a
                  style={{ float: 'right' }}
                  href="https://www.google.com/search?q=antd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  more
                </a>
                  */
                }
              </span>
            );
          };
          
          const renderItem = (title, count) => {
            return {
              key : count,
              value: title,
              label: (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {title}
                  
                  <span>
                   {/*<UserOutlined /> {count}  */} 
                  </span>
                </div>
              ),
            };
          };
        const options = [
            /*
            {
              label: renderTitle('Libraries'),
              options: [renderItem('AntDesign', id), renderItem('AntDesign UI', 10600)],
            },
            {
              label: renderTitle('Solutions'),
              options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
            },
            {
              label: renderTitle('Articles'),
              options: [renderItem('AntDesign design language', 100000)],
            },
            */
          ];
          const handleSearch = (e) => {
            this.setState({
                companySearch : [],
                contactSeach : [],
                seachedMatters : [] , 
                searchedAct : [], 
                searchedDocs : [], 
                searchedEvents : [], 
                searchedLog : [], 
                searchedTask : [],
                options : []
            })
            const value = e.target.value
            console.log(value)
            let contactData;
            console.log(this.state.contacts)
              //  setValue(value);
          
                if (value.length !== 0 || value === '') {
                  contactData = this.state.contacts.filter((item) =>
        
                    item.firstName
                      .toLowerCase()
                      .includes(value.toLowerCase())
                      
                  );
                  if (contactData.length !== 0 ) {
                    let cop = []
                    contactData.map((item, id)=>{
                        
                        cop.push(renderItem(item.firstName,  "co"+ id)) 
                        
                      })
                    const optionforContact = {
                        label: renderTitle('Contact'),
                        options: cop,
                      }  
                     // const options = [optionforContact]
                      this.setState({
                        contactSeach : optionforContact,
                       // options : options
                    });
                  }
                
                } else {
                    /*
                    this.setState({
                        contactSeach : this.state.contacts
                    });
                    */
                }
                /*
                this.setState({
                    options : this.state.contactSeach
                })
              */
             let companyData;
                //  setValue(value);
                  if (value.length !== 0 || value === '') {
                    companyData = this.state.companys.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                    if (companyData.length !== 0 ) {
                        let cop2 = []
                        companyData.map((item, id)=>{
                            
                            cop2.push(renderItem(item.name, "cm" + id)) 
                            
                          })
                        const optionforCompany = {
                            label: renderTitle('Company'),
                            options: cop2,
                          }  
                        
                          this.setState({
                            companySearch : optionforCompany
                        });
                      }
                     
                   
                  } else {
                      /*
                      this.setState({
                          contactSeach : this.state.companys
                      });
                      */
                  }

             let matterData;
             //  setValue(value);
               if (value.length !== 0 || value === '') {
                   matterData = this.state.matters.filter((item) =>
                   item.matterDescription
                     .toLowerCase()
                     .includes(value.toLowerCase())
                 );
                 
                 if (matterData.length !== 0 ) {
                   let mop = []
                   matterData.map((item, id)=>{
                       
                       mop.push(renderItem(item.matterDescription,  "mtr"+id))                         
                     })
                   const optionformatter = {
                       label: renderTitle('Matters'),
                       options: mop,
                     }  
                     this.setState({
                       seachedMatters : optionformatter
                   });
                 }
             
               } else {
                   /*
                   this.setState({
                       seachedMatters : this.state.matters
                   });
                   */
               }
              
               let taskData;
             //  setValue(value);
               if (value.length !== 0 || value === '') {
                   taskData = this.state.tasks.filter((item) =>
                   item.taskName ? 
                                   item.taskName
                                   .toLowerCase()
                                   .includes(value.toLowerCase())
                                   :
                                   null
                 );
                 if (taskData.length !== 0 ) {
                   let top = []
                   taskData.map((item, id)=>{
                       
                       top.push(renderItem(item.taskName,  "tsk"+ id))                         
                     })
                   const optionfortask = {
                       label: renderTitle('Tasks'),
                       options: top,
                     }  
                     this.setState({
                       searchedTask : optionfortask
                   });
                 }
                
               } else {
                   /*
                   this.setState({
                       searchedTask : this.state.tasks
                   });
                   */
               }

               let EventsData;
             //  setValue(value);
               if (value.length !== 0 || value === '') {
                   EventsData = this.state.Events.filter((item) =>
                   item.subject ?
                   item.subject
                     .toLowerCase()
                     .includes(value.toLowerCase())
                     :
                     null
                 );
                 if (EventsData.length !== 0 ) {
                   let eop = []
                   EventsData.map((item, id)=>{
                       
                       eop.push(renderItem(item.subject,  "ev"+id))                         
                     })
                   const optionforEvent = {
                       label: renderTitle('Events'),
                       options: eop,
                     }  
                     this.setState({
                       searchedEvents : optionforEvent
                   });
                 }
                 
               } else {
                   /*
                   this.setState({
                       searchedEvents : this.state.Events
                   });
                   */
               }

               let logData;
               //  setValue(value);
                 if (value.length !== 0 || value === '') {
                   logData = this.state.logs.filter((item) =>
                     item.subject
                       .toLowerCase()
                       .includes(value.toLowerCase())
                   );
                   if (logData.length !== 0 ) {
                       let lop = []
                       logData.map((item, id)=>{
                           
                           lop.push(renderItem(item.subject,  "log"+id))                         
                         })
                       const optionforlogs = {
                           label: renderTitle('Logs'),
                           options: lop,
                         }  
                         this.setState({
                           searchedLog : optionforlogs
                       });
                     }
                 } else {
                     /*
                     this.setState({
                       searchedLog : this.state.logs
                     });
                     */
                 }

                 let actData;
               //  setValue(value);
                 if (value.length !== 0 || value === '') {
                   actData = this.state.act.filter((item) =>
                     item.description
                       .toLowerCase()
                       .includes(value.toLowerCase())
                   );
                   if (actData.length !== 0 ) {
                       let aop = []
                       actData.map((item, id)=>{
                           
                           aop.push(renderItem(item.description,  "act"+ id))                         
                         })
                       const optionforActivity = {
                           label: renderTitle('Activities'),
                           options: aop,
                         }  
                         this.setState({
                           searchedAct : optionforActivity
                       });
                     }
                 } else {
                     /*
                     this.setState({
                       searchedAct : this.state.act
                     });
                     */
                 }

                 let docxx;
               //  setValue(value);
                 if (value.length !== 0 || value === '') {
                   docxx = this.state.docs.filter((item) =>
                     item.name
                       .toLowerCase()
                       .includes(value.toLowerCase())
                   );
                   if (docxx.length !== 0 ) {
                   
                       let dop = []
                       docxx.map((item, id)=>{
                           
                           dop.push(renderItem(item.name,  "doc"+id))                         
                         })
                       const optionfordocs = {
                           label: renderTitle('Documents'),
                           options: dop,
                         }  
                         this.setState({
                           searchedDocs : optionfordocs
                       });
                     }
                 } else {
                     /*
                     this.setState({
                       searchedDocs : this.state.docs
                     });
                     */
                    }
            
             
            /*
            let newoption = []
            if(this.state.contactSeach.length != 0){
                newoption = [
                  this.state.contactSeach
                ]
            }
            if(this.state.companySearch.length != 0){
              newoption = [
                newoption,
                this.state.companyData
              ]
               // newoption.push(this.state.companyData)
            }
          
            if(this.state.seachedMatters.length != 0){
                newoption.push(this.state.seachedMatters)
            }
            if(this.state.searchedAct.length != 0){
                newoption.push(this.state.searchedAct)
            }
            if(this.state.searchedTask.length != 0){
                newoption.push(this.state.searchedTask)
            }
            if(this.state.searchedEvents.length != 0){
                newoption.push(this.state.searchedEvents)
            }
            if(this.state.searchedLog.length != 0){
                newoption.push(this.state.searchedLog)
            }
            if(this.state.searchedDocs.length != 0){
                newoption.push(this.state.searchedDocs)
            }
            this.setState({
                options : newoption
            })
            */
            
           
              this.setState({
                        options : [
                            this.state.companySearch ,
                            this.state.contactSeach,
                            this.state.seachedMatters , 
                            this.state.searchedAct, 
                            this.state.searchedDocs, 
                            this.state.searchedEvents, 
                            this.state.searchedLog, 
                            this.state.searchedTask
                          ]
                    })
                    /*
             let newoptions = this.state.options
              if(this.state.seachedMatters.length == 0){
                console.log("matter nahi he")
             
                  newoptions.splice(2,1)
                 
              }
              if(this.state.companySearch.length == 0){
                console.log("company nahi he")
                
                  
                  newoptions.splice(0,1)
                 
            }
            if(this.state.companySearch.length == 0){
              console.log("contacts nahi he")
                
                newoptions.splice(1,1)
               
             }
             if(this.state.searchedTask.length == 0){
              console.log("tasks nahi he")
                
                newoptions.splice(7,1)
               
             }
             if(this.state.searchedEvents.length == 0){
              console.log("evnts nahi he")
                
                newoptions.splice(5,1)
               
             }
             if(this.state.searchedAct.length == 0){
              console.log("activity nahi he")
                
                newoptions.splice(3,1)
               
             }
             if(this.state.searchedDocs.length == 0){
              console.log("docs nahi he")
                
                newoptions.splice(4,1)
               
             }
             if(this.state.searchedLog.length == 0){
              console.log("log nahi he")
                
                newoptions.splice(6,1)
               
             }
            
              
            console.log(newoptions)*/
            console.log(this.state.options)
        }
        return (
       
            <Aux>
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: "200%" }}
                    options={this.state.options}
                >
                    <Input.Search size="large" onChange={handleSearch} placeholder="input here" />
                </AutoComplete>
            </Aux>
          
        );
    }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(NavSearch);
