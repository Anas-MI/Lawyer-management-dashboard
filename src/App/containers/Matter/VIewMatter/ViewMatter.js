import React, { useEffect, useState } from 'react';
import api from '../../../../resources/api';
import { Card, Tabs, Button, Modal, Table, Upload, notification } from 'antd';
import { number } from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import Communication from './communnication';
import TaskFuntions from './Task';
import Activity from './Activity';
import 'jspdf-autotable';
import Bills from './Bills';
import Documents from './Documents';
import Calendar from './Calendar';

const { TabPane } = Tabs;

function CompanyView(props) {
  let response = {};
  const [desc, setdesc] = useState('');
  const [Client, setClient] = useState('');
  const [Amount, setAmount] = useState('0');
  const [state, setState] = useState({ visible: false });
  const [contact, setContact] = useState([]);
  const [act, setAct] = useState([]);
  const [address, setAddress] = useState();
  const [events, setEvents] = useState();
  const [firstName, setfirstName] = useState();
  const [ID, setID] = useState();
  const [Website, setWebsite] = useState();
  const [Email, setEmail] = useState();
  const [Number, setNumber] = useState();
  console.log(props.location.state);
  useEffect(() => {
    async function fetchData() {
      await api.get('/matter/view/' + props.location.state.id).then((res) => {
        response = res.data;
        response.data.client =
          response.data.client === null
            ? {
                _id: '',
                updated_at: '',
                created_at: '-',
                userId: '-',
                title: '-',
                lastName: '-',
                firstName: '',
                __v: 0,
                image: '',
                customFields: [
                  {
                    Email: '-',
                  },
                ],
                address: [],
                website: [],
                phone: [],
                emailAddress: [],
                company: ['-'],
              }
            : response.data.client;
        setdesc(res.data.data.matterDescription);
        setClient(
          res.data.data.client.firstName + ' ' + res.data.data.client.lastName

          // res.data.data.client
        );
      });
      {
        /*
                calendar = await api.get('/calendar/viewforuser/'+props.location.state.id)
               .then(()=>{
               api.get('/activity/viewformatter/'+props.location.state.userId+props.location.state.id).then((res)=>{console.log(res)})
           })*/
      }
      setValue();
    }
    fetchData();
  }, []);

  useEffect(() => {
    api
      .get(
        '/activity/viewformatter/' +
          props.location.state.userId +
          '/' +
          props.location.state.id
      )
      .then((res) => {
        let activity = [];
        res.data.data.map((val, index) => {
          activity.push(val);
        });
        console.log('activiviviviv', activity);
        setAct(activity);
      });
  }, []);

  const setValue = () => {
    const amnt = window.localStorage.getItem('total');
    setAmount(amnt);

    let data = [];
    //  setRealatedContacts(rcntct)
    response.data.relatedContacts.map(async (value, index) => {
      console.log(value.contact);
      const cntct = await api.get('/contact/view/' + value.contact);
      console.log(cntct.data);
      const mail = response.data.client.emailAddress.map((value, index) => {
        return (
          <div className="table-span-light" key={index}>
            <p>{value}</p>
          </div>
        );
      });
      const Num = response.data.client.phone.map((value, index) => {
        return (
          <div className="table-span-light" key={index}>
            <p>{value.number}</p>
          </div>
        );
      });
      data.push(
        <Card title="Related Contact" className="form-width mb-4">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Client</span>
                </td>
                <td className="border-0 py-2">
                  <span className="table-span-light">
                    {cntct.data.data.firstName + cntct.data.data.lastName}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Phone</span>
                </td>
                <td className="border-0 py-2">
                  <span className="table-span-light">{Num}</span>
                </td>
              </tr>
              <tr>
                <td className="border-0 py-2">
                  <span className="table-span-dark">Email</span>
                </td>
                <td className="border-0">
                  <span className="table-span-light">{mail}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      );
      setContact(data);
    });

    // setEvents(evnt)
    const adrs = response.data.client.address.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>{value.street}</p>
          {console.log('data', response.data)}
          <p>{value.city}</p>
          <p>{value.state}</p>
          <p>{value.zipCode}</p>
          <p>{value.country}</p>
          <p>{value.type}</p>
        </div>
      );
    });
    const mail = response.data.client.emailAddress.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {value.emailType} : {value.emailAddress}
          </p>
        </div>
      );
    });
    const Num = response.data.client.phone.map((value, index) => {
      return (
        <div className="table-span-light" key={index}>
          <p>
            {console.log(value)}
            {value.phoneType} : {value.phone}
          </p>
        </div>
      );
    });
    const fNAme =
      response.data.client.firstName + ' ' + response.data.client.lastName;
    const IDx = response.data.client._id;
    setAddress(adrs);
    setID(IDx);
    setfirstName(fNAme);
    setEmail(mail);
    setNumber(Num);
  };
  function callback(key) {
    console.log(key);
  }

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  //data source for bills section
  const dataForBills = [
    {
      key: '1',
      lastSeen: '2m ago',
      status: 'paid',
      dueDate: '20/10/20',
      id: '664',
      client: 'abc name',
      matter: 'dummy matter',
      issueDate: '10/9/20',
      Balance: '1000',
    },
    {
      key: '1',
      lastSeen: '2m ago',
      status: 'unpaid',
      dueDate: '20/10/20',
      id: '654',
      client: 'abcd name',
      matter: 'dummy matter 2',
      issueDate: '10/9/20',
      Balance: '800',
    },
  ];

  const handleBills = () => {
    console.log(props.location.state.id);
    props.history.push('/view/matter/bills', props.location.state.id);
  };
  return (
    <div>
      <Card style={{ height: '110px' }}>
        <div className="d-flex mb-3 example-parent">
          <div className="mr-auto p-2 col-example">
            <h4>{Client}</h4>
            <p>{desc}</p>
          </div>

          <div className="p-2 col-example">
            <Button
              onClick={() =>
                props.history.push('/edit/matter', props.location.state.id)
              }
              type="link"
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                api
                  .get('/matter/delete/' + props.location.state.id)
                  .then(() => {
                    notification.success({ message: 'Matter deleted.' });
                    props.history.push(
                      '/manage/matter',
                      props.location.state.id
                    );
                  })
                  .catch(() =>
                    notification.error({ message: 'Failed to delete' })
                  )
              }
              type="link"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Dashboard" key="1" style={{ padding: '0px' }}>
          <Card
            title="Financial"
            extra={
              <Button type="link" onClick={handleBills}>
                Quick Bills
              </Button>
            }
            className="form-width mb-4"
          >
            <div className="text-center pt-2">
              <div>Work In progress Amount</div>
              <div class="d-flex py-2 mt-2 matter-amount">
                <div style={{ flex: 1, 'border-right': '2px solid #B2E4D6' }}>
                  <p>
                    <b>Outstanding Amount</b>
                  </p>
                  <span>$500</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p>
                    <b>Trust Funds</b>
                  </p>
                  <span>$500.00</span>
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="Details"
            extra={
              <Button type="link" onClick={showModal}>
                Add Contact
              </Button>
            }
            className="form-width mb-4"
          >
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Client</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{firstName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Phone</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{Number}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Email</span>
                  </td>
                  <td className="border-0">
                    <span className="table-span-light">{Email}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-0 py-2">
                    <span className="table-span-dark">Address</span>
                  </td>
                  <td className="border-0 py-2">
                    <span className="table-span-light">{address}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          {contact.map((value, index) => {
            return value;
          })}
          <Modal
            title="Add Contact"
            visible={state.visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="relationship">
                    <Form.Label>Relationship</Form.Label>
                    <Form.Control
                      name="relationship"
                      type="text"
                      placeholder="Relationship"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="rcontact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control as="select" name="contact">
                      <option>1</option>
                      <option>2</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="billThis">
                <Form.Check
                  name="billThis"
                  type="checkbox"
                  label="Bill this contact"
                />
              </Form.Group>
            </Form>
          </Modal>
        </TabPane>
        <TabPane tab="Acitivites" key="2">
          <Activity id={props.location.state.id}></Activity>
        </TabPane>
        <TabPane tab="Calendar" key="3">
          <Calendar
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
        </TabPane>
        <TabPane tab="Communication" key="4">
          <Communication></Communication>
        </TabPane>
        <TabPane tab="Phone Log" key="5">
          <Card
            title="Phone Log"
            extra={<a href="#"></a>}
            className="form-width mb-4"
          ></Card>
        </TabPane>
        <TabPane tab="Notes" key="6">
          <Card
            title="Notes"
            extra={<a href="#"></a>}
            className="form-width mb-4"
          ></Card>
        </TabPane>
        <TabPane tab="Document" key="7">
          {console.log('matter in viw', props.location.state.matters)}
          <Documents
            matters={props.location.state.matters}
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
        </TabPane>
        <TabPane tab="Task" key="8">
          <TaskFuntions id={props.location.state.id}></TaskFuntions>
        </TabPane>
        <TabPane tab="Bills" key="9">
          <Bills dataSource={dataForBills} />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default CompanyView;
