import React from 'react';

const Sidebar = props => {
	const deselectAlbum = props.deselectAlbum;

	return (
		<div id='sidebar'>
			<img src='juke.svg' id='logo' />
		</div>
	);
};

export default Sidebar;
