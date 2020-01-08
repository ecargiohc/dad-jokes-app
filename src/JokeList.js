import React, {Component} from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import uuid from 'uuid/v4';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            // jokes: []
                // the following logic says, if there are any jokes stored in localStorage, get those, otherwise return an empty
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            // loading: false
        };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    console.log(this.seenJokes)
    };

    componentDidMount() {
        // this.grabJokes();
        if(this.state.jokes.length === 0) this.grabJokes();
    }
    async grabJokes() {
        // try-catch is for if/when url is incorrect or API is down, etc.
        try {
        let getJokes = [];
        while (getJokes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                // this object asks for the JSON version, bc the url gives us HTML version
                headers: {Accept: 'application/json'}
            });
            // getJokes.push(res.data.joke)
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
                // we will make 'jokes', formerly an array, to now be an object so that we can store more info, such as 'vote':
            getJokes.push({id: uuid(), text: newJoke, votes: 0})
        } else {
            console.log("found dOOP!")
            console.log(newJoke);
            // alert("FOUND DOOP")
        }
        }
        // console.log(getJokes);
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.joke)
    // the following allow previous data to 'persist' by using localStorage while rendering new ones: 
        this.setState(st => ({
            jokes: [...st.jokes, ...getJokes]
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
        // window.localStorage.setItem("jokes", JSON.stringify(getJokes));
    } catch (err) {
        alert(err);
        };
    };

    handleVote = (id, delta) => {
        // 'delta' means a 'vote' can either be negative or positive
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ?
                {...j, votes: j.votes + delta}
                : j
                )
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    };

    handleClick = () => {
        this.grabJokes();
    };

    render() {
        let sortJokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
        return(
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h2 className="JokeList-title">
                        <span>Dad Jokes</span>
                    <button className="JokeList-getmore" 
                    onClick={this.handleClick}>👀</button>
                        🤦🏻‍♀️ 🙄</h2>
                        </div>
                        <div className="JokeList-jokes">
                            {sortJokes.map((j) => (
                                <Joke
                                key={j.id}
                                text={j.text} 
                                vote={j.votes}
                                upVote={() => this.handleVote(j.id, 1)}
                                downVote={() => this.handleVote(j.id, -1)}
                            />))}
                        </div>
                </div>
        )
    }
}
export default JokeList;
