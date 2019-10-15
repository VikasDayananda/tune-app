import React from 'react';
import "./Card.css"
import Button from '@material-ui/core/Button';
import {styled} from '@material-ui/core/styles';

const img = require('../../data/graph.png');

const MyButton = styled(({color, ...other}) => <Button {...other} />)({
    background: props =>
        props.color === 'red'
            ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
        props.color === 'red'
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
});
let colors = [
    "blue", "pink", 'brown', "green", "purple"
];

class Card extends React.Component<any, any> {
    onError = (e) => {
        this.setState({
            image: false,
            impression: 0,
            conversion: 0

        })
    }

    constructor(props) {
        super(props);
        this.state = {
            image: true
        }
    }

    numberWithCommas(x) {
        return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];

    }

    shouldComponentUpdate(nextProps, nextState) {

        let a = JSON.stringify(this.props.user)
        let b = JSON.stringify(nextProps.user);
        let c = a !== b
        console.log(c)

        return c
    }

    render() {
        let props = this.props;
        let {image} = this.state;
        console.log("re-render")

        return (
            <div className="col-lg-3 col-md-4 col-sm-4">
                <div className="card">
                    <div className={"flex"}>
                        <div className="card-img-wrapper">
                            {image && props.user.avatar ?
                                <img className="poster" src={props.user.avatar} alt="Avatar" onError={this.onError}/>
                                :
                                <div className={"avatar-circle " + this.getRandomColor()}>
                                    <span className="initials">{props.user.name[0]}</span>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="card-name-wrapper">
                                <span className={"name"}>{props.user.name}</span><br/>
                                <span className={"title"}>{props.user.occupation}</span><br/><br/>
                            </div>
                        </div>

                    </div>
                    <div className="flex">
                        <div style={{margin:"15px 10px 10px 10px"}}>
                            <img src={img} className={"image-button image-hover-highlight"}
                                 onClick={() => props.showUserMetrics(props.user)}/>
                            <a href={"#"} className={"link-button"}
                               onClick={() => props.showUserMetrics(props.user)}>Click to see data</a>
                        </div>
                        <div className="stats">
                            <span className="impressions">{props.data.totoalImpressions}</span><br/>
                            <span className="activity">{"Impressions"}</span><br/>
                            <span className="conversions">{props.data.totalConversions}</span><br/>
                            <span className="activity">{"Conversions"}</span><br/>
                            <div className="revenue">${this.numberWithCommas(props.data.revenue)}</div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
