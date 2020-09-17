import React  from 'react'
import { Card , Form ,Button, Col ,Row} from 'react-bootstrap'
import { notification } from 'antd'
import api from '../../../../resources/api'

class footer extends React.Component{
    constructor(){
        super()
        this.state = {
            
                list : [],
                list2 : [],
                description: '',
                address: '',
                socialMedia: [
                    { item : "Facebook",  url :'' },
                    { item : "Twitter",  url :'' },
                    { item : "Youtube",  url :'' },
                    { item : "Instagram",  url :'' },
                    { item : "LinkedIn",  url :'' }
                ],
                imageFile: '',
                header : [],
                logo: "",
                headerLogo:"",
                footer:"",
                banner : ["You Rely on Lawyer, Lawyers rely on us"],
                disabled: false
              }
    }
    componentDidMount(){
        api.get(`/footer/showall/`).then((res)=>{
          console.log(res)
          this.setState(res.data.data[res.data.data.length - 1])
        //  this.setState(res.data.data)
        })
    }
    render(){
      console.log(this.state)
        const handleChange = (e) => {
            e.persist();
        
            const { name, value } = e.target;
            if(name === "banner"){
              let newState = this.state
              newState.banner[0] = value
              this.setState(newState)
            }else{
              this.setState((st) => ({ ...st, [e.target.name]: e.target.value }));
            }
            console.log(this.state)
          };
        
          const handleSubmit = (e) => {
            notification.destroy()
            let data = this.state
            delete data.updated_at
            delete data._id
            delete data.__v
            
            this.setState({disabled : true})
          
            if(data.imageFile === ""){
              console.log("File not found")
              api
              .post('/footer/create', data)
              .then( (res)=> {
                console.log(res)
                this.setState({disabled : false})
                this.componentDidMount()
                notification.success({ message: 'Data Updated.' });
                
              
              })
              .catch( (err)=>{
                console.log(err)
                this.setState({disabled : false})
                notification.error({ message: 'Try again later.' });
              })
            }else{
              var docFormData = new FormData();
              docFormData.set('image', this.state.imageFile);
      
              api
                .post('/footer/upload', docFormData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response)=>{
                  console.log(response)
                  notification.success({ message: 'Image Uploaded.' });
                  console.log(response.data.message)
                     
                    data.logo = response.data.message
                      api
                    .post('/footer/create', data)
                    .then( (res)=> {
                      console.log(res)
                      this.setState({disabled : false})
                      this.componentDidMount()
                      notification.success({ message: 'Data Updated.' });
                      
                    
                    })
                    .catch( (err)=>{
                      console.log(err)
                      this.setState({disabled : false})
                      notification.error({ message: 'Try again later.' });
                    })
                 
                })
                
            }
          };
        
          
        
          // handel Image Upload
          const uploadImage = (e) => {
            this.setState({ ...this.state, imageFile: e.target.files[0] });
            console.log(this.state)
          };

          const uploadImage2 = (e) => {
            // this.setState({ ...this.state, imageFile: e.target.files[0] });
            // console.log(this.state)
          
            var docFormData = new FormData();
            docFormData.set('image', e.target.files[0]);
    
            api
              .post('/footer/upload', docFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              })
              .then((response)=>{
                console.log(response)
                notification.success({ message: 'Image Uploaded.' });
                console.log(response.data.message)
                 this.setState({headerLogo: response.data.message})  
                  // data.logo = response.data.message
              }).catch(error => {
                console.log({error})
              })
          
          
          };

          const addFeild = (key) => {
            let listx = this.state
            listx[key].push({item : "", url :""})
            this.setState(listx)
            console.log(this.state)
          };
          const handleDynamicData = (e)=> {
            e.persist();
            console.log(e)
            const { value , id, name, alt} = e.target;
            let newData = this.state
            if(name === "sm"){
             newData.socialMedia[id].url = value
            }else
            {
                newData[name][id][alt] = value
            }
            this.setState(newData);
            console.log(this.state)
          };
          const handleDelete = (key, id)=>{
           let newState = this.state
           newState[key].splice(id, 1)
           this.setState(newState);
        };
        
          return (
            <>
            
              <Card>
                <Card.Header>
                   <h5 className="text-center">Customise Home Page</h5>
                </Card.Header>
                <Card.Body>
                <Form className="form-details">
                
                <Form.Label>Header Logo</Form.Label>
                <br/>
                <img width="30%" height="30%" alt="No Image" src = {this.state.headerLogo}></img><br></br>
                <Form.Group controlId="formGroupEmail">
                  <input
                    type="file"
                    name="Logo"
                    onChange={uploadImage2}
                    placeholder="Upload Image"
                  />
                </Form.Group>
                <Form.Label>Footer Logo</Form.Label>

                <img width="30%" height="30%" alt="No Image" src = {this.state.logo}></img><br></br>
                <Form.Group controlId="formGroupEmail">
                  <input
                    type="file"
                    name="Logo"
                    onChange={uploadImage}
                    placeholder="Upload Image"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupBanner">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control
                    name="banner"
                    type="text"
                    placeholder="banner"
                    value={this.state['banner'][0]}
                    onChange={handleChange}
                  />
          
                </Form.Group>
                <Form.Group controlId="formGroupAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={handleChange}
                  />
          
                </Form.Group>
        
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    type="text"
                    as="textarea" rows="3"
                    placeholder="Description"
                    value={this.state['description']}
                    onChange={handleChange}
                  />
          
                </Form.Group>
                <h4>Headers</h4>
                {
              this.state.header.map((value, index) => {
                return (
                  <>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId={index}>
                      <Form.Label>Items {index + 1}</Form.Label>
                      <Form.Control
                        name="header"
                        alt="item"
                        type="text"
                        placeholder="Item"
                        value={this.state.header[index].item}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId={index}>
                      <Form.Label>Url</Form.Label>
                      <Form.Control
                        name="header"
                        alt="url"
                        type="text"
                        placeholder="/pricing"
                        value={this.state.header[index].url}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Button id={index} name="list" style={{ "height": "45px", "margin-top": "25px"}} onClick={()=>handleDelete("header",index)}>-</Button>
                  </Form.Row>
      
                </>
              )
              })
              
            }
            <div className="form-add mb-4">
                  <span onClick={()=>addFeild("header")}>Add a header item</span>
            </div>
                <h4>Links to navigate on other pages</h4>
                {
              this.state.list.map((value, index) => {
                return (
                  <>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId={index}>
                      <Form.Label>Items {index + 1}</Form.Label>
                      <Form.Control
                        name="list"
                        alt="item"
                        type="text"
                        placeholder="Item"
                        value={this.state.list[index].item}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId={index}>
                      <Form.Label>Url</Form.Label>
                      <Form.Control
                        name="list"
                        alt="url"
                        type="text"
                        placeholder="/pricing"
                        value={this.state.list[index].url}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Button id={index} name="list" style={{ "height": "45px", "margin-top": "25px"}} onClick={()=>handleDelete("list",index)}>-</Button>
                  </Form.Row>
      
                </>
              )
              })
              
            }
            <div className="form-add mb-4">
                  <span onClick={()=>addFeild("list")}>Add a item</span>
            </div>
            <h4>Links to navigate on the hompage</h4>
            {
              this.state.list2.map((value, index) => {
                return (
                  <>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId={index}>
                      <Form.Label>Items {index + 1 }</Form.Label>
                      <Form.Control
                        name="list2"
                        alt = "item"
                        type="text"
                        placeholder="List"
                        value={this.state.list2[index].item}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId={index}>
                      <Form.Label>Url</Form.Label>
                      <Form.Control
                        name="list2"
                        alt="url"
                        type="text"
                        placeholder="#pricing"
                        value={this.state.list2[index].url}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                    <Button  id={index} name="list" style={{ "height": "45px", "margin-top": "25px"}} onClick={()=>handleDelete("list2",index)}>-</Button>
                  </Form.Row>
            
                </>
              )
              })
              
            }
            <div className="form-add mb-4">
                  <span onClick={()=>addFeild("list2")}>Add a link</span>
            </div>
            <h4>Social Media</h4>
              {
              this.state.socialMedia.map((value, index) => {
                return (
                  <>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId={index}>
                      <Form.Label>{value.item} URL</Form.Label>
                      <Form.Control
                        name="sm"
                        type="text"
                        placeholder= "URL"
                        value={this.state.socialMedia[index].url}
                        onChange={handleDynamicData}
                      />
                      </Form.Group>
                    </Col>
                  </Form.Row>
            
                </>
              )
              })
              
            }
            <h4>Footer Text</h4>
           
           <Form.Row>
                    <Col>
                      <Form.Group >
                      <Form.Label>Footer Text</Form.Label>
                      <Form.Control
                        name="footer"
                        type="text"
                        placeholder= "Footer text"
                        value={this.state.footer}
                        onChange={handleChange}
                      />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                <Button disabled= {this.state.disabled} onClick={handleSubmit}>Update</Button>
              </Form>
              
                </Card.Body>
              </Card>
            </>
          );
    
    }
}


export default footer