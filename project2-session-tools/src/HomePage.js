import React from "react";
import AddNew from "./AddNew";
import Search from "./Search";
import MyTools from "./MyTools";
import LandingPage from "./LandingPage";
import "bootstrap/dist/css/bootstrap.min.css"
import "./HomePage.css"
import "./index.css"
import logo from "./images/logo.png"


export default class HomePage extends React.Component {
    state = {
        active: "landingPage"
    }

    renderContent() {
        if (this.state.active === "search") {
            return <Search />
        } else if (this.state.active === "addNew") {
            return <AddNew changePage={() => this.setToSearch()} />
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

    setToSearch() {
        this.setState({
            "active": "search"
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="main">
                    <div id="nav-bar" className="container-fluid">
                        <ul className="nav nav-tabs navbar-expand" >
                            <li><img className="company-logo" src={logo}></img></li>
                            <li className="nav-item">
                                <div className={"nav-link" + (this.state.active === "landingPage" ? " active" : "")} aria-current="page" onClick={() => this.changePage("landingPage")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                                    </svg> <span className="navTitle">Home</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={"nav-link" + (this.state.active === "search" ? " active" : "")} aria-current="page" onClick={() => this.changePage("search")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg> <span className="navTitle">Search</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={"nav-link" + (this.state.active === "addNew" ? " active" : "")} aria-current="page" onClick={() => this.changePage("addNew")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg> <span className="navTitle">Add new</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={"nav-link" + (this.state.active === "myTools" ? " active" : "")} aria-current="page" onClick={() => this.changePage("myTools")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg> <span className="navTitle">My Tools</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="topBuffer"></div>
                    <div>
                        {this.renderContent()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}