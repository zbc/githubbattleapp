var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
    return(
        <div>
            <div className='columm'>
                <img className='avatar' src={props.avatar} alt={'avatar for ' + props.username}></img>
                <h2 className='username'>@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired,
}

module.exports = PlayerPreview;
