import React, { Fragment } from 'react';
import logger from "../../common/logger";

let WgtText = ({name, value, edit, dispatcher, label=null, extraclasses=null, rows="3"}) =>  {
    logger.debug(`[WgtText|in] (${name}, ${value}, ${edit}, <dispatcher>, ${label}, ${extraclasses})`)
    logger.debug('[WgtText|out')
    return (
        <Fragment>                  
            <label htmlFor={name}>{ label ? label: name}</label>
            <textarea className={`form-control ${extraclasses}`} id={name} rows={rows} value={value} 
            onChange={e => {e.preventDefault(); dispatcher({ type: name, value: e.target.value})}} readOnly={!edit} />
        </Fragment>
    ); 
};

export default WgtText;