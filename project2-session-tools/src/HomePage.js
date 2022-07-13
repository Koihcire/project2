import React from "react";
import AddNew from "./AddNew";
import Search from "./Search";



export default class HomePage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Search/>
                <AddNew/>
            </React.Fragment>
        )
    }
}