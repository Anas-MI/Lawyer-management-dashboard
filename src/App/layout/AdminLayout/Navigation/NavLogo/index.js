import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        //Admin dashbaord main
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
          
                        {/* <i className="feather icon-trending-up" /> */}
                     
                        <img style={{"width": "30%"}}src="https://res.cloudinary.com/casemanagement/image/upload/v1600287856/gtfwyjkqpb3auwrkftag.png" alt="Precedent Online"/>

                    
                    <span className="b-title">Precedent Online</span>
                 </a>
                {/* <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a> */}
            </div>
        </Aux>
    );
};

export default navLogo;
