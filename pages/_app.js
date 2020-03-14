import React from 'react'
import App from 'next/app'
import { ThemeProvider} from 'theme-ui'
import theme from "../components/theme"
import Nav from "../components/Nav"
import {Flex} from "rebass"
import Footer from "../components/Foot"

export default class Corona extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
        <Flex flexDirection="column" minHeight="100vh">
            <ThemeProvider theme={theme}>
                <Nav/>
                <Component {...pageProps} />
                <Flex my="auto"/>
                <Footer/>
            </ThemeProvider>
        </Flex>
    )
  }
}