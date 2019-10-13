import React from 'react';
import "./Card.css"
import Chart from "../Chart/Chart";

let colors = [
    "blue", "pink", 'brown', "green", "purple"
]

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

    render() {
        let props = this.props;
        let {image} = this.state;

        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
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
                        <Chart data={props.data.conversions}/>

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
