import { Modal } from 'antd';
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
class AddList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const tableData = this.props.tableData;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          className="form-add-button"
        >
          + Add List
        </Button>
        <Modal
          title="Add to List"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Descripton</Form.Label>
              <Form.Control type="text" placeholder="Descripton" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Practice Area</Form.Label>
              <Form.Control as="select">
                  <option>Select a practice area</option>
                  <option>Attorney</option>
                  <option>Administrative</option>
                  <option>Bankruptcy</option>
                  <option>Business</option>
                  <option>Builder's Liens</option>
                  <option>Civil Litigation</option>
                  <option>Commercial</option>
                  <option>Conveyance (Purchase)</option>
                  <option>Conveyance (Sale)</option>
                  <option>Corporate</option>
                  <option>Criminal</option>
                  <option>Employment</option>
                  <option>Estates</option>
                  <option>Family</option>
                  <option>Immigration</option>
                  <option>Insurance</option>
                  <option>Personal Injury</option>
                  <option>Tax</option>
                  <option>Wills</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal>

        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Discription</th>
              <th scope="col">Task</th>
              <th scope="col">Matter</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }
}

export default AddList;
