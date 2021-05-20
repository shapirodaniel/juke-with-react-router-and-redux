import React from 'react';
import { connect } from 'react-redux';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';
const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';
class Player extends React.Component {
	render() {
		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i className={backIcon} />
						{/* // placeholder logic */}
						<i className={true ? pauseIcon : playIcon} />
						<i className={forwardIcon} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Player);
