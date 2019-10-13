import * as React from 'react';
import {Chart} from "react-google-charts";
import "./Chart.css"
import {css} from '@emotion/core';

import GridLoader from 'react-spinners/GridLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding-top:40px;

`;

class ChartComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let data = this.props.data
        let dataMap = new Map();
        for (let i = 1; i <= 31; i++) {
            dataMap.set(i, 0)
        }

        data.forEach(ad => {
            let time = new Date(ad.time)
            var month = time.getUTCMonth() + 1; //months from 1-12
            if (month == 4) {
                var day = time.getUTCDate();
                var md = month + "/" + day
                if (dataMap.get(day)) {
                    dataMap.set(day, dataMap.get(day) + ad.revenue)
                } else {
                    dataMap.set(day, ad.revenue)
                }
            }
        });
        let stateData = [['', '']].concat(Array.from(dataMap.entries()))

        this.setState({data: stateData})
    }

    render() {
        console.log(JSON.stringify(this.state.data, null, 2))

        return (
            <div className={"chart-div"}>
                <Chart
                    className={"chart"}
                    width="100%"
                    height={'150px'}
                    chartType="LineChart"
                    loader={<GridLoader
                        css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={"#0080FF"}
                        loading={true}
                    />}
                    data={this.state.data}
                    options={{
                        hAxis: {
                            title: 'day',
                            viewWindow: {min: 1, max: 31}
                        },
                        vAxis: {
                            title: 'revenue',
                        },
                        legend: 'none',
                    }}
                />
            </div>
        );
    }
}

export default ChartComponent;
