import React from "react";
import { Box, Flex, Text, Heading, Card} from "rebass"
import {PieChart, Pie, Tooltip, Cell} from "recharts"
import fetch from "isomorphic-unfetch"

export default class Index extends React.Component {
    state = {
        coronaPie:[{name:"china",value:1,color:"#fff"}],
        latest:{}
    }
    render () {
        return (
            <Flex flexDirection="column">
                <Heading variant="squiggle" m="auto" fontSize={[4,5,6]}>Corona Portal</Heading>
                <Flex sx={{m:"20px",fontWeight:"heading"}}>
                    <Text m="auto" sx={{fontSize:[3,4,5],color:"grey"}}>Confirmed: {this.state.latest.confirmed}</Text>
                    <Text m="auto" sx={{fontSize:[3,4,5],color:"#ee0202"}}>Deaths: {this.state.latest.deaths}</Text>
                    <Text m="auto" sx={{fontSize:[3,4,5],color:"#31cc31"}}>Recovered: {this.state.latest.recovered}</Text>                
                </Flex>
                <Text m="auto">More Coming!!</Text>
            </Flex>
        )
    }
    async componentDidMount () {
        var data = await (await fetch("https://coronavirus-tracker-api.herokuapp.com/all")).json()
        console.log(data)
        this.setState({latest:data.latest})
    }
}