import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuIcon = () => {
    return(
        <Link to="/"    style={{width:'30px',height:'30px'}}>🏠</Link>
    )
}

export default MenuIcon;