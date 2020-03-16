import React from "react";
import { Box, Flex, Text, Heading, Card } from "rebass";
import {Input, Select} from "@rebass/forms"
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Bar,
    AreaChart,
    Area,
    ResponsiveContainer
} from "recharts";
import fetch from "isomorphic-unfetch";
import moment from "moment"

export default class Index extends React.Component {
    state = {
        coronaPie: [{ name: "china", value: 1, color: "#fff" }],
        latest: {},
        county: false,
        name: ""
    };
    render() {
        return (
            <Flex flexDirection="column">
                <Heading variant="squiggle" m="auto" fontSize={[4, 5, 6]}>
                    Corona Portal
        </Heading>
                <Flex sx={{ m: "20px", fontWeight: "heading" }}>
                    <Text m="auto" sx={{ fontSize: [3, 4, 5], color: "grey" }}>
                        Confirmed: {this.state.latest.confirmed}
                    </Text>
                    <Text m="auto" sx={{ fontSize: [3, 4, 5], color: "#ee0202" }}>
                        Deaths: {this.state.latest.deaths}
                    </Text>
                    <Text m="auto" sx={{ fontSize: [3, 4, 5], color: "#31cc31" }}>
                        Recovered: {this.state.latest.recovered}
                    </Text>
                </Flex>
                <Flex>
                    <BarChart
                        style={{ margin: "auto" }}
                        width={500}
                        height={300}
                        data={Object.values(this.state.latest).map((v, i) => {
                            return { value: v, name: Object.keys(this.state.latest)[i] };
                        })}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="grey" />
                    </BarChart>
                </Flex>
                <hr width="90vw"/>
                <Flex flexDirection="column">
                    <Box width="30vw" m="auto">
                        <Select defaultValue="Italy" sx={{borderRadius:"10px"}} onChange={e => this.setState({name:e.target.value})}>
                            {Object.keys(this.state.county).map(v => <option key={v}>{v}</option> )}
                        </Select>
                    </Box>
                    <Box width="80vw" height="50vh" m="auto">
                    <ResponsiveContainer minHeight={100} width="100%" height="100%">
                        <AreaChart style={{ margin: "auto" }}
                            data={
                                this.state.county && this.state.county[this.state.name] ? Object.entries(this.state.county[this.state.name].history).sort((a, b) => {
                                    return moment(a[0], 'MM/DD/YY').unix() - moment(b[0], 'MM/DD/YY').unix();;
                                }).map(v => {
                                    return { "Confirmed Cases": v[1], day: v[0] };
                                }) : []
                            }
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <XAxis dataKey="day" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Confirmed Cases"
                                fillOpacity={0.7}
                                fill="#8884d8"
                            />
                        </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                </Flex>
                <Text m="auto">More Coming!!</Text>
            </Flex >
        );
    }
    async componentWillMount() {
        var data = await (await fetch("http://9a4edec9.ngrok.io/all"")).json();
        console.log(data);
        this.setState({
            latest: data.latest,
            county: data.confirmed.locations
        });
    }
}
