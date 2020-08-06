import React from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import { Upload, message, Modal, notification, Space, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DynamicFeilds from './DynamicFeilds/index.js';
import api from '../../../resources/api';
import AddCompany from './AddCompany/indexModal.js';
import { connect } from 'react-redux';
import { Button as AntdButton } from 'antd';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);

const validZipRegex = RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
const validUrlRegex = RegExp(
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
);

let editMode = null;
let options = null;
let response = {};
let feilds = {};
let editRes = '';
let customData = [];
let customFields = null;
let res = '';
let error = {
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Prefix: '',
  Title: '',
};
let errors = {
  Type: [''],
  Email: [''],
  phone: [''],
  Website: [''],
  Address: [''],
  Street: [''],
  City: [''],
  Country: [''],
  State: [''],
  ZipCode: [''],
};
let formData = new FormData();
let finalres = '';

class newPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      emailAddress: [],
      phone: [],
      website: [],
      customFields: [{}],
      modal: false,
      valid: false,
      visible: false,
      fileList: [],
      disable : false
    };
  }

  handleCustom(e) {
    e.persist();
    const { id, value, name } = e.target;
    customData[id] = { [name]: value };
  }
  async componentDidMount() {
    response = await api.get('/company/viewforuser/' + this.props.userId);

    options = response.data.data.map((value, id) => {
      return <option key={id}>{value.name}</option>;
    });
    feilds = await api.get('/user/view/5eecb08eaec6f1001765f8d5');

    customFields = feilds.data.data.customFields.map((value, index) => {
      return (
        <Col md="6">
          <Form.Group key={index} controlId={index}>
            <Form.Label>{value.name}</Form.Label>
            <Form.Control
              name={value.name}
              type={value.type}
              placeholder={value.name}
              onChange={this.handleCustom}
            />
          </Form.Group>
        </Col>
      );
    });

    this.setState({ customFields, options });

    {
      /*
    if(this.props.location.pathname == "/manage/contacts/edit/person"){
      editMode = true
      res= await api.get('/contact/showall')
      res = res.data.data[this.props.location.state]
      console.log(res)
    }
  */
    }
  }
  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Contact Saved',
    });
  };
  openNotificationWithfailure = (type) => {
    notification[type]({
      message: 'Failure',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    notification.destroy();
    console.log(this.props);
    const validateForm = () => {
      let valid = true;
      Object.values(error).forEach((val) => val.length > 0 && (valid = false));
      Object.values(errors.Email).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.phone).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.State).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.Street).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.City).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.ZipCode).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      Object.values(errors.Country).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      console.log(valid);
      return valid;
    };
    if (validateForm()) {
      this.setState({
        disable : true
      })
      console.log('all good');
      const data = this.state;
      data.userId = this.props.userId;
      data.customFields = customData;
      let dataList = Object.assign({}, this.state);
      delete data.fileList;
      console.log(data);
      if (editMode) {
        //  dispatch(updateBlog({id:this.state._id,body:this.state}))
      } else {
        api.post('contact/create', data).then((result) => {
          notification.success({message : "Contact created"})
          this.setState({ visible: true });
          const key = 'updatingDetails';

          const openMessage = () => {
            message.loading({
              content: 'Uploading Files...',
              key,
              duration: 5,
            });
          };

          if (dataList.fileList.length !== 0) {
            openMessage();
            const formData = new FormData();
            dataList.fileList.forEach((file) => {
              formData.append('image', file);
            });
            console.log({ result });
            api
              .post('/contact/upload/' + result.data.data._id, formData)
              .then((res) => {
                
                console.log(res);
                if (res.status === 200) {
                  setTimeout(() => {
                    message.success({
                      content: 'Uploaded!',
                      key,
                      duration: 3,
                    });
                  }, 1000);
                } else {
                  console.log({ res });
                }
                if (this.props.location != undefined) {
                  this.setState({
                    disable : false
                  })
                  this.props.history.push('/manage/contacts');
                }
              })
              .catch((err) => {
                console.log({ err });
              });
          } else {
            if (this.props.location != undefined) {
              this.setState({
                disable : false
              })
              this.props.history.push('/manage/contacts');
            }
          }
        });
      }
    } else {
      return notification.warning({
        message: 'Please enter valid details',
      });
    }
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // handleUpload = () => {
  //   // e.preventDefault();
  //   const key = 'updatingDetails';
  //   const openMessage = () => {
  //     message.loading({ content: 'Uploading Files...', key });
  //   };
  //   openMessage();
  //   // const { updateUserDetailsApi } = apiList;
  //   // const updateUserDetailsApiUrl = updateUserDetailsApi + "/media/" + this.state._id;

  //   const formData = new FormData();
  //   this.state.fileList.forEach((file) => {
  //     formData.append('images', file);
  //   });
  //   api
  //     .get('/api/contact/upload/' + finalres)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setTimeout(() => {
  //           message.success({
  //             content: 'Uploaded!',
  //             key,
  //             duration: 3,
  //           });
  //         }, 1000);
  //       } else {
  //         console.log({ res });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };

  render() {
    let address = null;
    const handleChange = (e) => {
      e.persist();
      if (e.target.name === 'company' && e.target.selectedIndex != 0) {
        console.log(e.target.selectedIndex);
        this.setState((st) => ({
          ...st,
          [e.target.name]: response.data.data[e.target.selectedIndex - 1],
        }));
      } else {
        this.setState((st) => ({ ...st, [e.target.name]: e.target.value }));
      }
      console.log(this.state);
      const { name, value, id } = e.target;
      switch (name) {
        case 'prefix':
          error.Prefix = value === 'default' ? 'Prefix is required!' : '';
          break;
        case 'firstName':
          error.FirstName =
            value.length == 0
              ? 'First Name is required!'
              : !validNameRegex.test(value)
              ? 'First Name must be in characters!'
              : value.length > 20
              ? 'First Name must be less than 20 characters long!'
              : '';
          break;
        case 'middleName':
          error.MiddleName =
            value.length == 0
              ? ''
              : !validNameRegex.test(value)
              ? 'Middle Name must be in characters!'
              : value.length > 20
              ? 'Middle Name must be less than 20 characters long!'
              : '';
          break;
        case 'lastName':
          error.LastName =
            value.length == 0
              ? ''
              : !validNameRegex.test(value)
              ? 'Last Name must be in characters!'
              : value.length > 20
              ? 'Last Name must be less than 20 characters long!'
              : '';
          break;

        case 'title':
          error.Title = value.length == 0 ? 'Title is Required' : '';
          break;

        default:
          break;
      }
    };
    const HandleAddressChange = (e) => {
      e.persist();
      const { id, value, name } = e.target;
      console.log(id + value + name);
      let newState = this.state;
      newState.address[id][name] = value;
      this.setState(newState);
      console.log(this.state);
      switch (e.target.name) {
        case 'type':
          errors.Type[id] = value === 'default' ? 'Type is required!' : '';
          break;

        case 'country':
          errors.Country[id] =
            value === 'default' ? 'Country is required!' : '';
          break;

        case 'street':
          errors.Street[id] =
            value.length == 0
              ? ''
              : value.length < 2
              ? 'Street is Required'
              : '';
          break;
        case 'city':
          errors.City[id] =
            value.length == 0
              ? ''
              : !validNameRegex.test(value)
              ? 'City Name must be in characters!'
              : value.length < 2
              ? 'City is Required'
              : '';
          break;
        case 'state':
          errors.State[id] =
            value.length == 0
              ? ''
              : !validNameRegex.test(value)
              ? 'State Name must be in characters!'
              : value.length < 2
              ? 'State is Required'
              : '';
          break;
        case 'zipCode':
          errors.ZipCode[id] =
            value.length == 0
              ? ''
              : value.length > 4 && value.length < 10
              ? ''
              : 'Zipcode is not valid!';
          break;
      }
    };
    const handleMultipleChange = (e) => {
      e.persist();
      let list = this.state;
      const { name, id, value, tagName } = e.target;
      if (tagName === 'SELECT') {
        name === 'emailAddress'
          ? (list[name][id][`emailType`] = value)
          : (list[name][id][`${name}Type`] = value);
      } else {
        list[name][id][name] = value;
      }
      console.log(list)
      this.setState(list);
      if (name === 'emailAddress')
        switch (name) {
          case 'emailAddress':
            errors.Email[id] = validEmailRegex.test(value)
              ? ''
              : 'Email is not valid!';
            break;
          case 'phone':
            errors.phone[id] =
              value.length < 10 || value.length > 13
                ? 'phone number must be between 10 and 13 digits'
                : '';
            break;

          default:
            break;
        }
    };

    const addFeild = (type) => {
      let list = this.state;
      if (type === 'emailAddress') {
        list.emailAddress.push({ emailType: 'work' });
      } else if (type === 'address') {
        list.address.push({});
      } else if (type === 'phone') {
        list.phone.push({ phoneType: 'work' });
      } else if (type === 'website') {
        list.website.push({ websiteType: 'work' });
      }
      this.setState(list);
    };

    const AddCompanyHandler = () => {
      // api.post('/company/create', {companyData})
      this.setState({ modal: false });
      this.componentDidMount()
    };
    const handleDelete = (e) => {
      e.persist();
      const { name, id } = e.target;
      let newState = this.state;
      newState[name].splice(id, 1);
      this.setState(newState);
    };

    const handleImageChange = (info) => {
      console.log(info);
      formData.set('image', info.file.name);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    const image = {
      action: 'http://localhost:3002/api/contact/upload/' + finalres,
      headers: {
        'content-type': 'multipart/form-data', // do not forget this
      },
      data: formData,
      onChange: handleImageChange,
      multiple: false,
    };

    const props = {
      onRemove: (file) => {
        const index = this.state.fileList.indexOf(file);
        const newFileList = this.state.fileList.slice();
        newFileList.splice(index, 1);
        this.props.onChange && this.props.onChange(newFileList);
        this.setState({
          fileList: newFileList,
          files: newFileList,
        });
      },
      beforeUpload: (file) => {
        let count = [];
        let files = [];
        // if (showUploadList) {
        //   files = this.state.files;
        // }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          file.thumbUrl = e.target.result;
          files.push(file);
          files.map((item, index) => {
            if (file.name === item.name) {
              count.push(index);
              if (count.length > 1) {
                message.error('This File Aready Exists');
                files.splice(index, 1);
                return;
              }
            }
          });
          this.setState({
            fileList: [...files],
          });

          this.props.onChange && this.props.onChange(this.state.fileList);
        };
        return false;
      },
      onSuccess: (resp, file, xhr) => {
        file.status = 'done';
      },
      onPreview: this.handlePreview,
      // fileList: showUploadList ? this.state.fileList : null,
      // multiple: multiple,
      // showUploadList: showUploadList,
      onRemove: (fileId) => {
        if (fileId.url) {
          // let url =
          //   baseUrl +
          //   "/api/v1/users/update/delete/" +
          //   this.state._id;
          // let body = {
          //   toDelete: fileId.orig
          // };
          // axios
          //   .post(url, body)
          //   .then(data => {
          //     console.log("Image Deleted!");
          //   })
          //   .catch(err => {
          //     console.log({
          //       "Error Deleting Image": err
          //     });
          //   });
        }
        const { fileList } = this.state;
        this.setState({
          fileList: fileList.filter((item) => item.uid !== fileId.uid),
        });
      },
    };
    const imageUpload = (
      <Upload {...props}>
        <AntdButton>
          <UploadOutlined /> Upload Image
        </AntdButton>
      </Upload>
    );
    return (
      <>
        <div className="form-width">
          <div className="card p-4">
            <Form className="form-details" onSubmit={this.handleSubmit}>
              <div className="form-header-container mb-4">
                <h3 className="form-header-text">Add New Person</h3>
              </div>
              <h4>Personal Details</h4>
              <div className="form-header-container mb-4">
                <Form.Row>
                  <Col md="2">
                    <Form.Group controlId="formGroupPrefix">
                      <Form.Label>Prefix</Form.Label>
                      <select
                        required
                        name="prefix"
                        onChange={handleChange}
                        value={res.Prefix}
                        style={{ 'border-radius': '5px' }}
                      >
                        <option value="default">Prefix</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Miss.">Miss.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Gov.">Gov.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </Form.Group>
                    <p className="help-block text-danger">{error.Prefix}</p>
                  </Col>
                  <Col>
                    <Form.Group controlId="formGroupFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={res.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p className="help-block text-danger">{error.FirstName}</p>
                  </Col>

                  <Col>
                    <Form.Group controlId="formGroupMiddleName">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        name="middleName"
                        type="text"
                        placeholder="Middle Name"
                        value={res.middleName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p className="help-block text-danger">{error.MiddleName}</p>
                  </Col>
                  <Col>
                    <Form.Group controlId="formGroupLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={res.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p className="help-block text-danger">{error.LastName}</p>
                  </Col>
                </Form.Row>
                <Form.Row className="mb-3">
                  <Col>{imageUpload}</Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="formGroupCompany">
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        as="select"
                        name="company"
                        onChange={handleChange}
                      >
                        <option>Select a company</option>
                        {options}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formGroupTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={res.title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <p className="help-block text-danger">{error.Title}</p>
                  </Col>
                </Form.Row>
                <div className="form-add mb-4">
                  <span onClick={() => this.setState({ modal: true })}>
                    Add Company
                  </span>
                </div>
                <DynamicFeilds
                  type={'emailAddress'}
                  nameType={'emailType'}
                  name={'emailAddress'}
                  text={'Email'}
                  error={errors.Email}
                  inputList={this.state.emailAddress}
                  change={handleMultipleChange}
                  delete={handleDelete}
                ></DynamicFeilds>
                <div className="form-add mb-4">
                  <span onClick={() => addFeild('emailAddress')}>
                    Add an Email
                  </span>
                </div>

                <DynamicFeilds
                  type={'number'}
                  name={'phone'}
                  nameType={'phoneType'}
                  text={'Phone Number'}
                  error={errors.phone}
                  inputList={this.state.phone}
                  change={handleMultipleChange}
                  delete={handleDelete}
                ></DynamicFeilds>
                <div className="form-add mb-4">
                  <span onClick={() => addFeild('phone')}>
                    Add a Phone Number
                  </span>
                </div>
                <DynamicFeilds
                  type={'website'}
                  nameType={'websiteType'}
                  name={'website'}
                  text={'website'}
                  error={errors.Website}
                  inputList={this.state.website}
                  change={handleMultipleChange}
                  delete={handleDelete}
                ></DynamicFeilds>
                <div className="form-add mb-4">
                  <span onClick={() => addFeild('website')}>Add a Website</span>
                </div>
                <p className="help-block text-danger">{errors.Website}</p>

                <p style={{ color: '#4e4e91' }}>
                  <b>Address</b>
                </p>
                {this.state.address.map((value, index) => {
                  return (
                    <div className="mb-3">
                      <Form.Row>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                              as="select"
                              name="type"
                              onChange={HandleAddressChange}
                            >
                              <option>Work</option>
                              <option>Home</option>
                            </Form.Control>
                          </Form.Group>
                          <p className="help-block text-danger">
                            {errors.Type}
                          </p>
                        </Col>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                              name="street"
                              type="text"
                              placeholder="Street"
                              onChange={HandleAddressChange}
                            />
                          </Form.Group>
                          <p className="help-block text-danger">
                            {errors.Street[index]}
                          </p>
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              name="city"
                              type="text"
                              placeholder="City"
                              onChange={HandleAddressChange}
                            />
                          </Form.Group>
                          <p className="help-block text-danger">
                            {errors.City[index]}
                          </p>
                        </Col>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              name="state"
                              type="text"
                              placeholder="State"
                              onChange={HandleAddressChange}
                            />
                          </Form.Group>
                          <p className="help-block text-danger">
                            {errors.State}
                          </p>
                        </Col>
                      </Form.Row>
                      <Row>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>ZipCode</Form.Label>
                            <Form.Control
                              name="zipCode"
                              type="number"
                              placeholder="ZipCode"
                              onChange={HandleAddressChange}
                            />
                          </Form.Group>
                          <p className="help-block text-danger">
                            {errors.ZipCode[index]}
                          </p>
                        </Col>
                        <Col>
                          <Form.Group controlId={index}>
                            <Form.Label>Country</Form.Label>
                            <select
                              name="country"
                              id={index}
                              onChange={HandleAddressChange}
                              style={{ 'border-radius': '5px' }}
                            >
                              <option value="default">Country</option>
                              <option value="Afganistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">
                                American Samoa
                              </option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Anguilla">Anguilla</option>
                              <option value="Antigua & Barbuda">
                                Antigua & Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bonaire">Bonaire</option>
                              <option value="Bosnia & Herzegovina">
                                Bosnia & Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British Indian Ocean Ter">
                                British Indian Ocean Ter
                              </option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Canary Islands">
                                Canary Islands
                              </option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">
                                Cayman Islands
                              </option>
                              <option value="Central African Republic">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Channel Islands">
                                Channel Islands
                              </option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Christmas Island">
                                Christmas Island
                              </option>
                              <option value="Cocos Island">Cocos Island</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo">Congo</option>
                              <option value="Cook Islands">Cook Islands</option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cote DIvoire">Cote DIvoire</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Curaco">Curacao</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">
                                Dominican Republic
                              </option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands">
                                Falkland Islands
                              </option>
                              <option value="Faroe Islands">
                                Faroe Islands
                              </option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="French Guiana">
                                French Guiana
                              </option>
                              <option value="French Polynesia">
                                French Polynesia
                              </option>
                              <option value="French Southern Ter">
                                French Southern Ter
                              </option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Great Britain">
                                Great Britain
                              </option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Hawaii">Hawaii</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="India">India</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Isle of Man">Isle of Man</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Korea North">Korea North</option>
                              <option value="Korea Sout">Korea South</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">
                                Liechtenstein
                              </option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macau">Macau</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Midway Islands">
                                Midway Islands
                              </option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Nambia">Nambia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherland Antilles">
                                Netherland Antilles
                              </option>
                              <option value="Netherlands">
                                Netherlands (Holland, Europe)
                              </option>
                              <option value="Nevis">Nevis</option>
                              <option value="New Caledonia">
                                New Caledonia
                              </option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="Norfolk Island">
                                Norfolk Island
                              </option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau Island">Palau Island</option>
                              <option value="Palestine">Palestine</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Phillipines">Philippines</option>
                              <option value="Pitcairn Island">
                                Pitcairn Island
                              </option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Republic of Montenegro">
                                Republic of Montenegro
                              </option>
                              <option value="Republic of Serbia">
                                Republic of Serbia
                              </option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="St Barthelemy">
                                St Barthelemy
                              </option>
                              <option value="St Eustatius">St Eustatius</option>
                              <option value="St Helena">St Helena</option>
                              <option value="St Kitts-Nevis">
                                St Kitts-Nevis
                              </option>
                              <option value="St Lucia">St Lucia</option>
                              <option value="St Maarten">St Maarten</option>
                              <option value="St Pierre & Miquelon">
                                St Pierre & Miquelon
                              </option>
                              <option value="St Vincent & Grenadines">
                                St Vincent & Grenadines
                              </option>
                              <option value="Saipan">Saipan</option>
                              <option value="Samoa">Samoa</option>
                              <option value="Samoa American">
                                Samoa American
                              </option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome & Principe">
                                Sao Tome & Principe
                              </option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Tahiti">Tahiti</option>
                              <option value="Taiwan">Taiwan</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad & Tobago">
                                Trinidad & Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Turks & Caicos Is">
                                Turks & Caicos Is
                              </option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Erimates">
                                United Arab Emirates
                              </option>
                              <option value="United States of America">
                                United States of America
                              </option>
                              <option value="Uraguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Vatican City State">
                                Vatican City State
                              </option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Virgin Islands (Brit)">
                                Virgin Islands (Brit)
                              </option>
                              <option value="Virgin Islands (USA)">
                                Virgin Islands (USA)
                              </option>
                              <option value="Wake Island">Wake Island</option>
                              <option value="Wallis & Futana Is">
                                Wallis & Futana Is
                              </option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zaire">Zaire</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </Form.Group>
                          <p className="help-block text-danger">
                            {error.Country}
                          </p>
                        </Col>
                        
                      </Row>
                      <Button
                          id={index}
                          name="address"
                          style={{ height: '45px', 'margin-top': '25px' }}
                          onClick={handleDelete}
                        >
                          -
                        </Button>
                    </div>
                  );
                })}

                <div className="form-add mb-4">
                  <span onClick={() => addFeild('address')}>
                    Add an Address
                  </span>
                </div>
                <br></br>
              </div>
              <br></br>
              <div className="form-header-container mb-4">
                <h4>Custom Fields</h4>
                <p>
                  Customise your
                  <Button
                    variant="link"
                    onClick={() =>
                      this.props.history.push('/settings/customFeilds')
                    }
                  >
                    Custom Field
                  </Button>
                </p>

                {customFields}
                <br></br>
              </div>

              <br></br>
              <h4>Billing preferences</h4>
              <Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Payment profile</Form.Label>
                    <Form.Control
                      as="select"
                      name="Payment profile"
                      //defaultValue={this.props.record[idx]}
                      //onChange={this.props.change}
                    >
                      <option>default</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <p>Hourly billing</p>
              <Row>
                <Col md="3">
                  <Form.Group>
                    <Form.Label>Firm user or group</Form.Label>
                    <Form.Control
                      as="select"
                      //defaultValue={this.props.record[idx]}
                      //onChange={this.props.change}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md="3">
                  <Form.Group>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control name="rate" type="text" placeholder="$0.0" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>ClientID</Form.Label>
                    <Form.Control
                      name="clientId"
                      type="text"
                      placeholder="ClientID"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" disabled={this.state.disable} className="btn btn-success">
                {editMode ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => this.props.history.goBack()}>
                Cancel
              </Button>
            </Form>

            <Modal
              centered
              visible={this.state.modal}
              onOk={AddCompanyHandler}
              onCancel={() => this.setState({ modal: false })}
              footer={[
                <Button onClick={() => {
                  this.setState({ modal: false })
                  this.componentDidMount()
                }}>
                  Cancel
                </Button>
              ]}
            >
              <AddCompany modal={true}></AddCompany>
            </Modal>
            {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Upload {...props}>

           <AntdButton  onClick={this.handleUpload}>
        Upload
    </AntdButton>
        <Button>
          <UploadOutlined /> Upload
        </Button>
        </Modal> */}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(newPerson);
