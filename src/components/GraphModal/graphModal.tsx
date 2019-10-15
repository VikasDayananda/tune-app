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
        sortBy: props.default || null,
        graphData: []
    });
    let data = props.graphData
    let dataMap = new Map();
    for (let i = 1; i <= 31; i++) {
        dataMap.set(i, 0)
    }

    useEffect(() => {
        conversionGraph()
    }, []);


    const impressionGraph = () => {
        data.forEach(ad => {
            let time = new Date(ad.time)
            var month = time.getUTCMonth() + 1; //months from 1-12
            if (month == 4) {
                var day = time.getUTCDate();
                var md = month + "/" + day
                if (ad.type == "impression") {
                    if (dataMap.get(day)) {
                        dataMap.set(day, dataMap.get(day) + 1)
                    } else {
                        dataMap.set(day, 1)
                    }
                }
            }
        });
        let stateData: any = [['x', 'impression']].concat(Array.from(dataMap.entries()))
        setState({...state, graphData: stateData});
    }
    const conversionGraph = () => {
        data.forEach(ad => {
            let time = new Date(ad.time)
            var month = time.getUTCMonth() + 1; //months from 1-12
            if (month == 4) {
                var day = time.getUTCDate();
                var md = month + "/" + day
                if (ad.type == "conversion") {
                    if (dataMap.get(day)) {
                        dataMap.set(day, dataMap.get(day) + 1)
                    } else {
                        dataMap.set(day, 1)
                    }
                }
            }
        });
        let stateData: any = [['x', 'conversion']].concat(Array.from(dataMap.entries()))
        setState({...state, graphData: stateData});
    }
    const revenueGraph = () => {
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
        let stateData: any = [['x', 'revenue']].concat(Array.from(dataMap.entries()))
        setState({...state, graphData: stateData});
    }
    const processData = category => {
        switch (category) {
            case "impressions":
                impressionGraph()
                break;
            case "conversions":
                conversionGraph()
                break;
            case "revenue":
                revenueGraph()
                break;
            default:
                break

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
                            default={"conversions"}
                            sortByOptions={[
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
                            onApply={processData}

                        /></div> Per day for {props.userData.name}</DialogTitle>
                <DialogContent>
                    <ChartComponent data={state.graphData} category={state.sortBy}/>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    );
}