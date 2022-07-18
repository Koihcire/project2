import React from "react";
import AddNew from "./AddNew";
import Search from "./Search";
import MyTools from "./MyTools";
import LandingPage from "./LandingPage";



export default class HomePage extends React.Component {
    state = {
        active: "landingPage"
    }

    renderContent() {
        if (this.state.active === "search") {
            return <Search />
        } else if (this.state.active === "addNew") {
            return <AddNew changePage={() => this.test()} />
        } else if (this.state.active === "myTools") {
            return <MyTools />
        } else if (this.state.active === "landingPage") {
            return <LandingPage />
        }
    }

    changePage(page) {
        this.setState({
            "active": page
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={"nav-link" + (this.state.active === "landingPage" ? "active" : "")} aria-current="page" onClick={() => this.changePage("landingPage")}>Home</button>
                        </li>
                        <li className="nav-item">
                            <button className={"nav-link" + (this.state.active === "search" ? "active" : "")} aria-current="page" onClick={() => this.changePage("search")}>Search</button>
                        </li>
                        <li className="nav-item">
                            <button className={"nav-link" + (this.state.active === "addNew" ? "active" : "")} aria-current="page" onClick={() => this.changePage("addNew")}>Add New</button>
                        </li>
                        <li className="nav-item">
                            <button className={"nav-link" + (this.state.active === "myTools" ? "active" : "")} aria-current="page" onClick={() => this.changePage("myTools")}>My Tools</button>
                        </li>
                    </ul>
                    {this.renderContent()}
                </div>
            </React.Fragment>
        )
    }
}