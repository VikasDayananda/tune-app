import React from 'react';
import './App.css';
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import {Search} from "./components/Search/Search";
import {Filter} from "./components/Filters/Filter";

import {createMuiTheme} from "@material-ui/core/styles";
import {GraphModal} from "./components/GraphModal/graphModal";

declare var require;
var UserData = require("./data/users.json");
var LogData = require("./data/logs.json");


const theme = () => createMuiTheme({

        overrides: {

            MuiPaper: {
                root: {
                    width: "60%",
                    height: "70%"
                },

            },
        }
    })
;

class App extends React.Component<any, any> {

    toggleFilters = () => {
        this.setState({openFilters: !this.state.openFilters});
    };
    showUserMetrics = (user) => {
        this.setState({selectedUserId: user.id, showGraph: true})

    }
    toggleModal = () => {
        this.setState({showGraph: !this.state.showGraph})
    }
    private onChangeName = (e) => {
        let userData = [...UserData]
        this.setState({search: e.target.value})
        setTimeout(() => {
            let searchData = userData.filter(user => user.name.toLowerCase().includes(this.state.search.toLowerCase()))
            this.setState({userData: searchData})
        }, 100)


    }
    private searchName = () => {


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
                }
                userData.graphData.push(data)
                map.set(data.user_id, userData)

            } else {
                let userData: any = {
                    totoalImpressions: 0,
                    totalConversions: 0,
                    revenue: 0,
                    graphData: []
                }
                if (data.type === "impression") {
                    userData.totoalImpressions++;
                } else {
                    userData.totalConversions++;
                    userData.revenue += data.revenue;

                }
                userData.graphData.push(data)
                map.set(data.user_id, userData)
            }
        })
        this.setState({data: map})
    }
    private onApply = (sortBy, period) => {
        debugger
        if (!sortBy) {
            let userData = [...UserData]
            this.setState({userData, openFilters: false})
            return;
        }
        let {userData} = this.state
        let {data} = this.state
        if (sortBy === "name") {
            userData.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })

        } else if (sortBy === "impressions") {
            userData.sort(function (a, b) {
                let userA = data.get(a.id)
                let userB = data.get(b.id)
                if (userA.totoalImpressions > userB.totoalImpressions) {
                    return -1;
                }
                if (userA.totoalImpressions < userB.totoalImpressions) {
                    return 1;
                }
                return 0;

            })
        } else if (sortBy === "conversions") {
            userData.sort(function (a, b) {
                let userA = data.get(a.id)
                let userB = data.get(b.id)
                if (userA.totalConversions > userB.totalConversions) {
                    return -1;
                }
                if (userA.totalConversions < userB.totalConversions) {
                    return 1;
                }
                return 0;

            })
        } else {
            userData.sort(function (a, b) {
                let userA = data.get(a.id)
                let userB = data.get(b.id)
                if (userA.revenue > userB.revenue) {
                    return -1;
                }
                if (userA.revenue < userB.revenue) {
                    return 1;
                }
                return 0;

            })
        }
        this.setState({userData, openFilters: false})

    }
    private filters: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.state = {
            userData: [...UserData],
            data: {},
            search: "",
            openFilters: false,
            showGraph: false,
            selectedUserId: 78
        }
        this.filters = React.createRef<any>();

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
                <div className="inner-container">
                    <div className="row" style={{marginLeft: "10px"}}>
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <Search onSearch={this.searchName} onChange={this.onChangeName}
                                    searchName={this.state.search}/>
                        </div>
                        <div className="col-md-4 col-lg-3 col-sm-12">
                            <Filter
                                label={true}
                                none={true}
                                sortByOptions={[
                                    {
                                        name: "Name",
                                        id: "name"
                                    },
                                    {
                                        name: "Impressions",
                                        id: "impressions"
                                    },
                                    {
                                        name: "Conversions",
                                        id: "conversions"
                                    },
                                    {
                                        name: "Revenue",
                                        id: "revenue"
                                    }
                                ]}
                                onApply={this.onApply}

                            />
                        </div>
                    </div>

                    {!this.isEmpty(this.state.data) &&
                    <div className="row">
                        {userData.map(user => {
                            return <Card user={user}
                                         data={this.state.data.get(user.id)}
                                         showUserMetrics={this.showUserMetrics}
                            />
                        })}
                    </div>
                    }
                    {this.state.showGraph &&
                    <GraphModal
                        open={this.state.showGraph}
                        toggleModal={this.toggleModal}
                        userData={this.state.userData.find(user => user.id === this.state.selectedUserId)}
                        graphData={this.state.data.get(this.state.selectedUserId).graphData}

                    />
                    }

                </div>
                <Footer/>
            </div>
        )
            ;
    }
}

export default App;
