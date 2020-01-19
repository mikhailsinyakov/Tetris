import React from 'react';
import '../stylesheets/Indicator.css';

const Indicator = ({name, value, component}) => {
	return (
		<div className="indicator">
			<div className="name">{name.toUpperCase()}:</div>
			{value === undefined ? <div className="component">{component}</div> : 
															<div className="value">{value}</div>}
		</div>
	)
};

export default Indicator;