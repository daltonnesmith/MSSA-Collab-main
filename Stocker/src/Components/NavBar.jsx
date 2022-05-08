import React from "react";
import { Link } from "react-router-dom";
const navbar = () => {
    return (
        <div>
            <li>
                <Link to="/">Dogs</Link>
            </li>
            <li>
                <Link to="/cats">Cats</Link>
            </li>
            <li>
                <Link to="/sheeps">Sheeps</Link>
            </li>
            <li>
                <Link to="/goats">Goats</Link>
            </li>
        </div>
    );
};
const Dogs = () =>{
    return (
      <div>
        <h3>Dogs</h3>
        <div>
          <img src="./dog.png"/>
          <img src="./dog.png"/>
        </div>
      </div>
    );
  }

export default navbar;
