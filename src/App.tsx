import React from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";

declare var require;
var UserData = require("./data/users.json")
var LogData = require("./data/logs.json")

class App extends React.Component<any, any> {

    private searchName = (e) => {
        this.setState({search: e.target.value})
        // setTimeout(function () {
        //     let searchData = UserData.filter(user => user.name.toLowerCase().includes(this.state.search))
        //     this.setState({userData: searchData})
        // }, 1000)

    }

    private parseData = (data) => {
        let map = new Map();
        LogData.forEach(data => {
            if (map.has(data.user_id)) {
                let userData: any = map.get(data.user_id)
                if (data.type === "impression") {
                    userData.totoalImpressions++;
                } else {
                    userData.totalConversions++;
                    userData.revenue += data.revenue;
                    let graphData: any = {
                        time: data.time,
                        revenue: data.revenue
                    }
                    userData.conversions.push(graphData)
                }

            } else {
                let userData: any = {
                    totoalImpressions: 0,
                    totalConversions: 0,
                    revenue: 0,
                    conversions: []
                }
                if (data.type === "impression") {
                    userData.totoalImpressions++;
                } else {
                    userData.totalConversions++;
                    userData.revenue += data.revenue;
                    let graphData = {
                        time: data.time,
                        revenue: data.revenue
                    }
                    userData.conversions.push(graphData)
                }
                map.set(data.user_id, userData)
            }
        })
        this.setState({data: map})
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            userData: UserData,
            search: ""
        }

    }

    componentDidMount() {
        this.parseData(LogData)

    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object

    }

    render() {
        let {userData} = this.state
        return (
            <div className="App">
                <h1 className={"header"}>Ad Testing Metrics</h1>

                <input type={"text"} id={"search"} value={this.state.search} onChange={(e) => this.searchName(e)}/>
                {!this.isEmpty(this.state.data) &&
                <div className="row" style={{margin: "50px"}}>
                    {userData.map(user => {
                        return <Card user={user} data={this.state.data.get(user.id)}/>
                    })}
                </div>
                }
                <Footer/>
            </div>
        );
    }
}

export default App;
