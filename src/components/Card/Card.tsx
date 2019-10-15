import React from 'react';
import {getRandomColor, parseNumber} from "../../constants";
import "./Card.css"

const img = require('../../data/graph.png');


class Card extends React.Component<any, any> {
    private onError = (e) => {
        this.setState({
            image: false,

        })
    }

    constructor(props) {
        super(props);
        this.state = {
            image: true
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user);
    }

    render() {
        let {user, data, showUserMetrics} = this.props;
        let {image} = this.state;


        return (
            <div className="col-lg-3 col-md-4 col-sm-4">
                <div className="card">
                    <div className={"flex"}>
                        <div className="card-img-wrapper">
                            {image && user.avatar ?
                                <img className="poster" src={user.avatar} alt="Avatar" onError={this.onError}/>
                                :
                                <div className={"avatar-circle " + getRandomColor()}>
                                    <span className="initials">{user.name[0]}</span>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="card-name-wrapper">
                                <span className={"name"}>{user.name}</span><br/>
                                <span className={"title"}>{user.occupation}</span><br/><br/>
                            </div>
                        </div>

                    </div>
                    <div className="flex">
                        <div style={{margin: "15px 10px 10px 10px"}}>
                            <img src={img} className={"image-button image-hover-highlight"}
                                 alt={"Avatar"}
                                 onClick={() => showUserMetrics(user)}/>
                            <a href={"#"} className={"link-button"}
                               onClick={() => showUserMetrics(user)}>Click to see data</a>
                        </div>
                        <div className="stats">
                            <span className="impressions">{data.totoalImpressions}</span><br/>
                            <span className="activity">{"Impressions"}</span><br/>
                            <span className="conversions">{data.totalConversions}</span><br/>
                            <span className="activity">{"Conversions"}</span><br/>
                            <div className="revenue">${parseNumber(data.totalRevenue)}</div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
