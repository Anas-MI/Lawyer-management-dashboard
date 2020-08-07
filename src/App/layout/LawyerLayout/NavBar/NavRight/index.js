import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';
import Timer from '../../../../components/Timer';
import { Link } from 'react-router-dom';

class NavRight extends Component {
    constructor(){
        super()
        this.state = {
            listOpen: false
        };
    }
   

    render() {
        console.log(this.props)
        const menu = (
            <Menu>
              <Menu.Item  onClick={()=>this.props.handleNavigation('/manage/activity', "time")} key="0">
                <span>Time entry</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/activity', "expense")} key="1">
                <span >Expense entry</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/tasks', "from dashboard")} key="2">
                <span >Task</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/contacts/add/Person', "")} key="3">
                <span >Contact</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/Matter/add', "")} key="5">
                <span >Matter</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/billing/record', "")} key="6">
                <span >Record payment</span>
              </Menu.Item>
              <Menu.Item key="7">
                <span>Trust request</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/communication', "phone")} key="4">
                <span >Phone log</span>
              </Menu.Item>
              <Menu.Item  onClick={()=>this.props.handleNavigation('/manage/communication', "email")} key="8">
                <span>Email log</span>
              </Menu.Item>
              <Menu.Item key="9">
                <span>Secure message</span>
              </Menu.Item>
              <Menu.Item onClick={()=>this.props.handleNavigation('/manage/Matter/add')} key="10">
                <span>events</span>
              </Menu.Item>
            </Menu>
          );
        return (
            <Aux>
               <ul className="navbar-nav ml-auto">
               <li>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="primary" className="ant-dropdown-link" onClick={e => e.preventDefault()}> Create new <DownOutlined /></Button>
                    </Dropdown>
                </li>
                <li><Timer/></li>
                    {/* <li>
                        <Dropdown alignRight={!this.props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-bell"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={DEMO.BLANK_LINK}>clear all</a>
                                    </div>
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>John Doe</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>New ticket Added</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href={DEMO.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li> */}
                    {/* <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => {this.setState({listOpen: true});}}><i className="icon feather icon-mail"/></a>
                    </li> */}
                    {/* <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>John Doe</span>
                                    <Link to='/logout' className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </Link>
                                </div>
                                <ul className="pro-body">
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings"/> Settings</a></li>
                                    <li><a href="/profile" className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail"/> My Messages</a></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li> */}
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default NavRight;
