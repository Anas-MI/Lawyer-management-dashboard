import React, {Component} from 'react';
import windowSize from 'react-window-size';

import Aux from "../../../../../../hoc/_Aux";
import DEMO from "../../../../../../store/constant";
import searchData from './searchdata'
import { Card ,ListGroup} from 'react-bootstrap';
import {AutoComplete} from 'antd'


class NavSearch extends Component {
    state = {
        searchWidth: (this.props.windowWidth < 992) ? 90 : 0,
        searchString: (this.props.windowWidth < 992) ? '90px' : '',
        isOpen: (this.props.windowWidth < 992),
        searchValue:''
    };


    onSearch = val => {
        this.setState(prevState => ({...prevState,searchValue:val}))
    }

    searchOnHandler = (e) => {
        this.setState({isOpen: true});
        const searchInterval = setInterval(() => {
            if (this.state.searchWidth >= 91) {
                clearInterval(searchInterval);
                return false;
            }
            this.setState(prevSate => {
                return {
                    searchWidth: prevSate.searchWidth + 15,
                    searchString: prevSate.searchWidth + 'px'
                }
            });
        }, 35);
    };

    searchOffHandler = () => {
        const searchInterval = setInterval(() => {
            if (this.state.searchWidth < 0) {
                this.setState({isOpen: false});
                clearInterval(searchInterval);
                return false;
            }
            this.setState(prevSate => {
                return {
                    searchWidth: prevSate.searchWidth - 15,
                    searchString: prevSate.searchWidth + 'px'
                }
            });
        }, 35);
    };

    render() {
        let searchClass = ['main-search'];
        if (this.state.isOpen) {
            searchClass = [...searchClass, 'open'];
        }

        return (
            <Aux>
            <Aux>
                <div id="main-search" className={searchClass.join(' ')}>
                    
                    <AutoComplete value={this.searchValue} onChange={this.onSearch} options={[{label:'Calendar'}]}
                    className="form-control" placeholder="Search . . ." style={{width: '90px'}}/>
                    
                    {/* <div className="input-group">
                        <input type="text" id="m-search" value={this.searchValue} onChange={this.onSearch} className="form-control" placeholder="Search . . ." style={{width: this.state.searchString}}/>
                        <a href={DEMO.BLANK_LINK} className="input-group-append search-close" onClick={this.searchOffHandler}>
                            <i className="feather icon-x input-group-text"/>
                        </a>                        <span className="input-group-append search-btn btn btn-primary" onClick={this.searchOnHandler}>
                        <i className="feather icon-search input-group-text"/>
                    </span>
                    </div> */}
                </div>
            </Aux>
            {/* {
                this.state.searchValue!=''?(
                    <Card style={{ width: '15rem' }}>
                    <ListGroup variant="flush">
                        {(searchData.filter(s=>s.name.startsWith(this.state.searchValue)))
                        .map((item,i)=>(
                        <ListGroup.Item>{item.name}</ListGroup.Item>
                        ))
                        }
                    </ListGroup>
                </Card>

                ):null
            } */}
            </Aux>
        );
    }
}

export default windowSize(NavSearch);