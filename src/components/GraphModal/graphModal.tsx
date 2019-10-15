import React, {useState, useEffect} from "react";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Filter} from "../Filters/Filter"
import {ChartComponent} from "../Chart/Chart";
import "./graphModal.css"

const theme = () => createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                width: "70%",
                height: "70%"
            },

        },
    }
});


export const GraphModal = (props: any) => {
    const [state, setState] = React.useState({
        sortBy: 'conversion',
        period: 4,
        graphData: []
    });
    let data = props.graphData
    let dataMap = new Map();
    for (let i = 1; i <= 31; i++) {
        dataMap.set(i, 0)
    }

    useEffect(() => {
        countGraph(state.sortBy, state.period)
    }, []);


    const countGraph = (sortBy, period) => {
        data.forEach(ad => {
            let time = new Date(ad.time)
            var month = time.getUTCMonth() + 1; //months from 1-12
            if (month == period) {
                var day = time.getUTCDate();
                if (ad.type == sortBy) {
                    if (dataMap.get(day)) {
                        dataMap.set(day, dataMap.get(day) + 1)
                    } else {
                        dataMap.set(day, 1)
                    }
                }
            }
        });
        let stateData: any = [['x', sortBy]].concat(Array.from(dataMap.entries()))
        setState({...state, graphData: stateData, sortBy, period});
    }

    const revenueGraph = (period) => {
        data.forEach(ad => {
            let time = new Date(ad.time)
            var month = time.getUTCMonth() + 1; //months from 1-12
            if (month == period) {
                var day = time.getUTCDate();
                if (dataMap.get(day)) {
                    dataMap.set(day, dataMap.get(day) + ad.revenue)
                } else {
                    dataMap.set(day, ad.revenue)
                }
            }
        });
        let stateData: any = [['x', 'revenue']].concat(Array.from(dataMap.entries()))
        setState({...state, graphData: stateData, sortBy: "revenue", period});
    }

    const processData = (category ?: any, period?: any) => {
        let sortBy = category || state.sortBy
        let month = period || state.period
        if (sortBy === "revenue") {
            revenueGraph(month)
        } else {
            countGraph(sortBy, month)
        }
    };

    return (
        <MuiThemeProvider theme={theme()}>
            <Dialog
                maxWidth={"lg"}
                open={props.open}
                fullScreen={false}
                onClose={props.toggleModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title">Graph showing
                    <div className={"filter-dropdown-graph"}>
                        <Filter
                            none={false}
                            theme={"graph"}
                            default={"conversion"}
                            sortByOptions={[
                                {
                                    name: "Impression",
                                    id: "impression"
                                },
                                {
                                    name: "Conversion",
                                    id: "conversion"
                                },
                                {
                                    name: "Revenue",
                                    id: "revenue"
                                }
                            ]}
                            onApply={(cat) => processData(cat, null)}

                        /></div> Per day for {props.userData.name} during the period
                    <div className={"filter-dropdown-graph"}>
                        <Filter
                            none={false}
                            theme={"graph"}
                            default={"4"}
                            sortByOptions={[
                                {
                                    name: "April 2013",
                                    id: "4"
                                },
                                {
                                    name: "May 2013",
                                    id: "5"
                                },
                            ]}
                            onApply={(per) => processData(null, per)}

                        /></div>
                </DialogTitle>
                <DialogContent>
                    <ChartComponent data={state.graphData} category={state.sortBy}/>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    );
}