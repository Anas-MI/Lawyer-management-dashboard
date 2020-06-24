import { Modal, Button } from 'antd';
import React from 'react'
import Content from './Content/Content'
class AddList extends React.Component {
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
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add AddList
        </Button>
        <Modal
            title="Add to List"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            >
          <div>
            <input placeholder="Name" type="text"></input>
            <input placeholder="Descripton" type="text"></input>
            <select id="Area" name="Area">
                    <option value="volvo">Volvo</option>
                </select>
          </div>
        </Modal>
        <Content></Content>
      </div>
    );
  }
}

export default AddList