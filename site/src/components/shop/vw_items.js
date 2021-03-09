import { useLocation, Link, useRouteMatch } from "react-router-dom";
import React, { useEffect } from 'react';
import ItemSmallWidget from './wgt_item_small';
import logger from "../../common/logger";
import config from "../../common/config"



let ItemsView = ({items, user, admin, dispatch, page}) =>  {

    logger.debug('[ItemsView|in] (items: %s, user: %s, admin: %s, dispatch: %s)', JSON.stringify(items), JSON.stringify(user), JSON.stringify(admin)
    , JSON.stringify(dispatch), JSON.stringify(page))

    const previousPage = page - 1
    const nextPage = page + 1
    let previousPageEntry = null
    if( 0 <  previousPage)
        previousPageEntry = <Link className="btn btn-outline-dark btn-sm m-1" to={"/shop?page=" + previousPage} >&lt;</Link>

    useEffect(() => { dispatch( {type:'items.get', page: page} ); }, [page]);

    if ( null !== items && Array.isArray(items) && (0 < items.length) ){
        let nextPageEntry = null
        // TODO review this when total number of items is a multiple of config.items.pagesize
        if ( config.items.pagesize === items.length )
            nextPageEntry = <Link className="btn btn-outline-dark btn-sm m-1" to={"/shop?page=" + nextPage} >&gt;</Link>
        
        logger.debug('[ItemsView|in]: going to render %d items', items.length)
        return (
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        { items.map((o,index) => <ItemSmallWidget key={index} item={o} admin={admin} dispatch={dispatch} />) }
                    </div>
                    <nav className="row float-right">
                        <Link className="btn btn-outline-dark btn-sm m-1" to={"/shop"}>&lt;&lt;</Link>
                        {previousPageEntry}
                        {nextPageEntry}
                    </nav>
                </div>
            </div>
        ); 
    }
    else
        return null
};

export default ItemsView;