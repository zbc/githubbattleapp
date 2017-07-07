var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
    return(
        <div>
            <div className='columm'>
                <img className='avatar' src={props.avatar} alt={'avatar for ' + props.username}></img>
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button className='reset' onClick={props.onReset.bind(null, props.id)}>Reset</button>
        </div>
    )
}


class PlayerInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState(function() {
            return {
                username : value 
            }
        });
    }

    render() {
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{this.props.label}</label>
                <input id='username' placeholder='github username' type='text' value={this.state.username} autoComplete='off' onChange={this.handleChange} />
                <button className='button' type='submit' disabled={!this.state.username}>Submit</button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id : PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username',
}

PlayerPreview.propTypes = {
    avatar : PropTypes.string.isRequired,
    username : PropTypes.string.isRequired,
    onReset : PropTypes.func.isRequired,
    id : PropTypes.string.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            PlayerOneName:'',
            PlayerTwoName:'',
            PlayerOneImage: null,
            PlayerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
                    
    handleSubmit(id, username) {
        var newState = {};
        this.setState(function() {
            newState[id + 'Name']= username;
            newState[id + 'Image'] = 'http://github.com/'+username+'.png?size=200';
            return newState;
        });
    }

    handleReset(id) {
        var newState = {};
        this.setState(function() {
            newState[id + 'Name']= '';
            newState[id + 'Image'] = null;
            return newState;
        });
        
    }
    
    render() {
        var match = this.props.match;
        var PlayerOneName = this.state.PlayerOneName;
        var PlayerTwoName = this.state.PlayerTwoName;
        var PlayerOneImage = this.state.PlayerOneImage;
        var PlayerTwoImage = this.state.PlayerTwoImage;

        return (
            <div>
                <div className = "row">
                    {!PlayerOneName &&
                            <PlayerInput id='PlayerOne' label='Player One' onSubmit={this.handleSubmit}/>
                    }
                    {PlayerOneImage !== null && 
                            <PlayerPreview avatar={PlayerOneImage} username={PlayerOneName} onReset={this.handleReset} id='PlayerOne' />
                    }
                    {!PlayerTwoName &&
                            <PlayerInput id='PlayerTwo' label='Player Two' onSubmit={this.handleSubmit}/>
                    }

                    {PlayerTwoImage !== null && 
                            <PlayerPreview avatar={PlayerTwoImage} username={PlayerTwoName} onReset={this.handleReset} id='PlayerTwo' />
                    }
                </div>
                {PlayerOneImage && PlayerTwoImage &&
                        <Link className='button' to={{
                            pathname: match.url + '/results',
                            search: '?playerOneName=' + PlayerOneName + '&playerTwoName=' + PlayerTwoName
                        }}>Battle</Link>
                }
            </div>
        )
    }
}

module.exports = Battle;
