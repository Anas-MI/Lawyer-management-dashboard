import React from 'react';
import {Spin} from 'antd'

const loader = () => {
    return (
        <div style={{left:'50%',top:'50%',transform:'translate(-50%,-50%)'}} >
            <Spin></Spin>
        </div>
    );
};

export default loader;