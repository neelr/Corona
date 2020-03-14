import React from "react";
import { Text, Flex, Link} from "rebass";

export default class Index extends React.Component {
    render () {
        return (
            <Flex p="30px">
                <Text m="auto">Made with 💖 by <Link color="primary" href="https://neelr.dev">@neelr</Link></Text>
            </Flex>
        )
    }
}