var React = require('react');
var QueryString = require('query-string');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

function Profile(props) {
    var info = props.info;

    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    ) 
}

Profile.propTypes = {
    info : PropTypes.object.isRequired
}

function Player(props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign : 'center'}}>{props.score}</h3>
            <Profile info = {props.profile} />
        </div>
    )
}

Player.propTypes = {
    label : PropTypes.string.isRequired,
    score : PropTypes.number.isRequired,
    profile : PropTypes.object.isRequired
}

class Results extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            winner:null,
            loser: null,
            error: null,
            loading: true
        }

    }

    componentDidMount() {
        var players = QueryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(results){
            if (results === null) {
                this.setState(function () {
                    return {
                        error :'There was error, please check and make sure those two github user are existed',
                        loading : false
                    }
                });
            }
            this.setState(function() {
                return {
                    winner : results[0],
                    loser : results[1],
                    error : null,
                    loading : false
                } 
            });
        }.bind(this));

    }

    render() {
        var winner = this.state.winner;
        var loser = this.state.loser;
        var error = this.state.error;
        var loading = this.state.loading;

        if (loading === true) {
            return (
                <Loading />
            )
        } 
        if (error) {
            return (
                <div>
                    <p>{error}</p> 
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        return (
            <div className='row'>
                <Player label='Winner'
                        score = {winner.score}
                        profile = {winner.profile}
                        />

                <Player label='Loser'
                        score = {loser.score}
                        profile = {loser.profile}
                        />
            </div>
        ) 
    }
}

module.exports = Results;

