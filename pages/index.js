import React from "react";
import { Box, Flex, Text, Heading, Card } from "rebass";
import { Input, Select } from "@rebass/forms";
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
import moment from "moment";

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
                <Heading variant="squiggle" m="auto" p="20px" fontSize={[4, 5, 6]}>
                    Corona Portal
				</Heading>
                <Heading m="auto" fontSize={[2, 3, 4]}>
                    Novel Coronavirus Disease (COVID-19)
				</Heading>
                <Flex sx={{ m: "20px", fontWeight: "heading" }}>
                    <Text m="auto" sx={{ fontSize: [3, 4, 5], color: "grey" }}>
                        Confirmed: {this.state.latest.confirmed}
                    </Text>
                    <Text
                        m="auto"
                        sx={{ fontSize: [3, 4, 5], color: "#ee0202" }}
                    >
                        Deaths: {this.state.latest.deaths}
                    </Text>
                    <Text
                        m="auto"
                        sx={{ fontSize: [3, 4, 5], color: "#31cc31" }}
                    >
                        Recovered: {this.state.latest.recovered}
                    </Text>
                </Flex>
                <Flex>
                    <BarChart
                        style={{ margin: "auto" }}
                        width={500}
                        height={300}
                        data={Object.values(this.state.latest).map((v, i) => {
                            return {
                                value: v,
                                name: Object.keys(this.state.latest)[i]
                            };
                        })}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value">
                            {
                                Object.keys(this.state.latest).map((v, i) => {
                                    switch (v) {
                                        case "confirmed": return <Cell fill="grey" />
                                        case "deaths": return <Cell fill="hsl(351.6, 79.4%, 52.4%)" />
                                        case "recovered": return <Cell fill="hsl(109.5, 95.5%, 43.5%)" />
                                    }
                                })
                            }
                        </Bar>
                    </BarChart>
                </Flex>
                <Box sx={{ width: "90vw", height: "5px", bg: "muted", m: "auto", borderRadius: "10px" }} />
                <Flex m="20px" flexDirection="column">
                    <Heading m="auto" p="10px" fontSize={[2, 3, 4]}>
                        Countries, Areas, or Territories
				    </Heading>
                    <Box width="30vw" m="auto">
                        <Select
                            defaultValue="Italy"
                            sx={{ borderRadius: "10px" }}
                            onChange={e =>
                                this.setState({ name: e.target.value })
                            }
                        >
                            {Object.keys(this.state.county).map(v => (
                                <option key={v}>{v}</option>
                            ))}
                        </Select>
                    </Box>
                    <Box width="80vw" height="50vh" m="auto">
                        <ResponsiveContainer
                            minHeight={100}
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                style={{ margin: "auto" }}
                                data={
                                    this.state.county &&
                                        this.state.county[this.state.name]
                                        ? Object.entries(
                                            this.state.county[
                                                this.state.name
                                            ].history
                                        )
                                            .sort((a, b) => {
                                                return (
                                                    moment(
                                                        a[0],
                                                        "MM/DD/YY"
                                                    ).unix() -
                                                    moment(
                                                        b[0],
                                                        "MM/DD/YY"
                                                    ).unix()
                                                );
                                            })
                                            .map(v => {
                                                return {
                                                    "Confirmed Cases":
                                                        v[1].confirmed,
                                                    Recovered:
                                                        v[1].recovered,
                                                    Deaths: v[1].deaths,
                                                    day: v[0]
                                                };
                                            })
                                        : []
                                }
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="Confirmed Cases"
                                    fillOpacity={0.7}
                                    fill="grey"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Recovered"
                                    fillOpacity={0.7}
                                    fill="hsl(109.5, 95.5%, 43.5%)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Deaths"
                                    fillOpacity={0.7}
                                    fill="hsl(351.6, 79.4%, 52.4%)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                    <Text m="auto">Drag your mouse to see more!</Text>
                </Flex>
            </Flex>
        );
    }
    async componentWillMount() {
        var data = await (
            await fetch("https://corona-api-neelr.herokuapp.com/all")
        ).json();
        let locations = {};
        Object.keys(data.confirmed.locations).map(p => {
            locations[p] = { history: {} };
            Object.keys(data.confirmed.locations[p].history).map(d => {
                locations[p].history[d] = {
                    confirmed: data.confirmed.locations[p].history[d],
                    deaths: data.deaths.locations[p].history[d],
                    recovered: data.recovered.locations[p].history[d]
                };
            });
        });
        this.setState({
            latest: data.latest,
            county: locations
        });
    }
}
