import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        //Lawyer Dashboard
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
                    {/* <div className="b-bg"> */}
                        {/* <i className="feather icon-trending-up" /> */}
                        <img style={{"width": "30%"}}src="https://res.cloudinary.com/casemanagement/image/upload/v1600287856/gtfwyjkqpb3auwrkftag.png" alt="Precedent Online"/>

                    {/* </div> */}
                    <span className="b-title">Precedent Online </span>
                 </a>
                {/* <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a> */}
            </div>
        </Aux>
    );
};

export default navLogo;
