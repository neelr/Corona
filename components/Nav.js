import React from "react";
import { Text, Flex, Link} from "rebass";

export default class Index extends React.Component {
    render () {
        return (
            <Flex>
                <Flex>
                    <Link variant="nav">
                        Corona Time
                    </Link>
                </Flex>

                <Flex m="auto"/>
                <Flex>
                    <Link variant="nav" href="https://www.cdc.gov/coronavirus/2019-ncov">
                        CDC Website
                    </Link>
                    <Link variant="nav" href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">
                        JHU Map
                    </Link>
                </Flex>
            </Flex>
        )
    }
}