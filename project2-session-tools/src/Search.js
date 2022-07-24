import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import "./Search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ToolCard from "./ToolCard";
import LoadingIcons from "react-loading-icons";


export default class Search extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        data: [],
        tagsData: [],
        searchName: "",
        searchRecent: "",
        minTimeNeeded: "",
        maxTimeNeeded: "",
        tags: [],
        groupSize: [],
        difficulty: "",
        sortBy: "recentlyAdded",
        allGroupSizes: ["Small", "Medium", "Large"],
        allDifficulty: ["Easy", "Medium", "Hard"],

        isTagsListOpen: false,
        showToolCard: false,

        activeToolData: [],
        commentUserName: "",
        commentEmail: "",
        commentData: "",

        showMaxMinError: false,
        isFiltersOpen: false,

        showNoResults: false,

        showAddCommentUserError: false,
        showAddCommentEmailError: false,
        showAddCommentError: false,

        searchByTagValue: [],

        showLoading: false
    }

    async showLoading() {
        await this.setState({
            showLoading: true
        })
    }

    async closeLoading() {
        await this.setState({
            showLoading: false
        })
    }

    refresh = async () => {
        let response = await axios.get(this.url + "tool/" + this.state.activeToolData._id)
        this.setState({
            activeToolData: response.data.tool
        })
    }

    clearSearchFilters = () => {
        this.setState({
            searchName: "",
            searchRecent: "",
            minTimeNeeded: "",
            maxTimeNeeded: "",
            tags: [],
            groupSize: [],
            difficulty: "",
            sortBy: "recentlyAdded",
        })
    }

    submitComment = async () => {
        //check for username error
        if (!this.state.commentUserName || this.state.commentUserName.length > 100) {
            await this.setState({
                showAddCommentUserError: true
            })
        } else {
            await this.setState({
                showAddCommentUserError: false
            })
        }

        //check for email error
        if ((this.state.commentEmail.includes("@") && this.state.commentEmail.includes("."))) {
            await this.setState({
                showAddCommentEmailError: false
            })
        } else {
            await this.setState({
                showAddCommentEmailError: true
            })
        }

        //check for comment error
        if (!this.state.commentData || this.state.commentData.length > 500) {
            await this.setState({
                showAddCommentError: true
            })
        } else {
            await this.setState({
                showAddCommentError: false
            })
        }

        if (!this.state.showAddCommentEmailError && !this.state.showAddCommentError && !this.state.showAddCommentUserError) {
            let toolId = this.state.activeToolData._id
            try {
                let response = await axios.put(this.url + "add-comment/" + toolId, {
                    userName: this.state.commentUserName,
                    comments: this.state.commentData,
                    email: this.state.commentEmail
                })
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
            this.setState({
                commentUserName: "",
                commentData: "",
                commentEmail: ""
            })
            let response = await axios.get(this.url + "tool/" + toolId)

            this.setState({
                showToolCard: true,
                // activeToolId: activeToolId
                activeToolData: response.data.tool
            })
        }
    }

    closeToolCard = () => {
        this.setState({
            showToolCard: false,
            commentUserName: "",
            commentData: "",
            showAddCommentUserError: false,
            showAddCommentEmailError: false,
            showAddCommentError: false
        })
    }

    showToolCard = async (toolId, likes) => {
        // let activeToolId = toolId;
        try {
            let incrementLikes = likes + 1
            await axios.put(this.url + "update-likes/" + toolId, {
                likes: incrementLikes
            })
        } catch (e) {
            console.log(e)
        }

        let response = await axios.get(this.url + "tool/" + toolId)

        this.setState({
            showToolCard: true,
            // activeToolId: activeToolId
            activeToolData: response.data.tool
        })
    }

    toggleTagsList = () => {
        if (this.state.isTagsListOpen) {
            this.setState({
                isTagsListOpen: false
            })
        } else if (!this.state.isTagsListOpen) {
            this.setState({
                isTagsListOpen: true
            })
        }
    }

    toggleFilters = () => {
        if (this.state.isFiltersOpen) {
            this.setState({
                isFiltersOpen: false
            })
        } else if (!this.state.isFiltersOpen) {
            this.setState({
                isFiltersOpen: true
            })
        }
    }

    async componentDidMount() {
        this.showLoading();
        try {
            let response = await axios.get(this.url + "tools")
            this.setState({
                data: response.data.tools
            })
            let allTags = []
            for (let d of this.state.data) {
                for (let tag of d.tags) {
                    // console.log(tag)
                    allTags.push(tag)
                }
            }
            let allUniqueTags = [...new Set(allTags)]

            this.setState({
                tagsData: allUniqueTags
            })
        } catch (e) {
            console.log(e)
        }
        this.closeLoading();
    }

    searchByTag = async (e) => {
        await this.setState({
            searchByTagValue: [e.target.value]
        })

        console.log(this.state.searchByTagValue)


        try {
            let response = await axios.get(this.url + "tools", {
                params: {
                    "tags": this.state.searchByTagValue,
                    "sortBy": "popularity"
                }
            })

            let data = response.data.tools;

            if (!data.length) {
                this.setState({
                    data: data,
                    isFiltersOpen: false,
                    showNoResults: true,
                    showToolCard: false
                })
            } else {
                this.setState({
                    data: data,
                    isFiltersOpen: false,
                    showNoResults: false,
                    showToolCard: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    search = async (e) => {
        this.showLoading();
        let minTime = ''
        let maxTime = ''
        if (!this.state.minTimeNeeded) {
            minTime = "0"
        } else {
            minTime = this.state.minTimeNeeded
        }

        if (!this.state.maxTimeNeeded) {
            maxTime = "999"
        } else {
            maxTime = this.state.maxTimeNeeded
        }

        if (maxTime < minTime) {
            await this.setState({
                showMaxMinError: true
            })
        } else {
            await this.setState({
                showMaxMinError: false
            })
        }

        if (!this.state.showMaxMinError) {
            try {
                let response = await axios.get(this.url + "tools", {
                    params: {
                        "name": this.state.searchName,
                        "dateCreated": this.state.searchRecent,
                        "minTimeNeeded": minTime,
                        "maxTimeNeeded": maxTime,
                        "tags": this.state.tags,
                        "groupSize": this.state.groupSize,
                        "difficulty": this.state.difficulty,
                        "sortBy": this.state.sortBy
                    }
                }
                )

                let data = response.data.tools;

                if (!data.length) {
                    this.setState({
                        data: data,
                        isFiltersOpen: false,
                        showNoResults: true
                    })
                } else {
                    this.setState({
                        data: data,
                        isFiltersOpen: false,
                        showNoResults: false
                    })
                }

            } catch (e) {
                console.log(e)
            }
        }
        this.closeLoading();
    }

    keyUpSearch = (e) => {
        if (e.key === "Enter") {
            this.search();
        }
    }

    toDate = (date) => {
        const c = { time: date }
        return new Date(c.time).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
    }

    updateFormField = (e) => {
        if (e.target.type === "checkbox") {
            let currentValues = this.state[e.target.name];
            let modifiedValues;
            if (!currentValues.includes(e.target.value)) {
                modifiedValues = [...currentValues, e.target.value];
            } else {
                modifiedValues = currentValues.filter((element) => {
                    return element !== e.target.value
                })
            }
            this.setState({
                [e.target.name]: modifiedValues
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* SEARCH */}
                    <div id="searchFilterBox" className="lato">
                        <div className="d-flex container" id="searchBoxContainer">
                            <div id="searchBox">
                                <div className="container-fluid d-flex">
                                    <input id="searchField" name="searchName" type="text" className="form-control" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" onKeyUp={this.keyUpSearch} />
                                    <button id="btnSearch" className="btn btn-sm" onClick={this.search}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg></button>
                                    <button id="btnFilter" className="btn btn-sm" onClick={this.toggleFilters}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                                    </svg></button>
                                    {/* <button id="btnFilter" className="btn btn-sm" onClick={this.clearSearchFilters}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></button> */}
                                </div>

                            </div>
                        </div>

                        <div className="d-flex container" id="filterContainer">
                            <div id="searchFilters" className={this.state.isFiltersOpen ? "showFilters" : "hideFilters"}>
                                <button id="btnClearFilter" className="btn btn-sm" onClick={this.clearSearchFilters}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg></button>
                                <div id="searchFiltersContainer">
                                    <div className="container mt-2">
                                        <h6>Recently Added</h6>
                                        <div id="recentlyAdded">
                                            <input id="searchRecent" name="searchRecent" type="checkbox" className="form-check-input" value="true" checked={this.state.searchRecent.includes("true")} onChange={this.updateFormField} />
                                            <label for="searchRecent" className="ms-2 placeholderText">Added in the last month</label>
                                        </div>
                                    </div>
                                    <div className="container mt-2">
                                        <h6>Time (minutes)</h6>
                                        <div>
                                            <input name="minTimeNeeded" type="number" className="searchTime placeholderText" value={this.state.minTimeNeeded} onChange={this.updateFormField} placeholder="Min Time" />
                                            <input name="maxTimeNeeded" type="number" className="searchTime placeholderText" value={this.state.maxTimeNeeded} onChange={this.updateFormField} placeholder="Max Time" />
                                        </div>

                                        {this.state.showMaxMinError ? <p>Max value cannot be less than min value</p> : ''}
                                    </div>
                                    <div className="container mt-2">
                                        <h6>Difficulty</h6>
                                        <select className="form-select form-select-sm" name="difficulty" onChange={this.updateFormField}>
                                            <option selected value="">Select one</option>
                                            {this.state.allDifficulty.map(d => (
                                                <option value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="container mt-2">
                                        <h6>Tags</h6>
                                        <div>
                                            <div id="tagsToggle" className="btn btn-sm" onClick={this.toggleTagsList}>
                                                Select one or more
                                                <div id="fakeArrow">
                                                    {this.state.isTagsListOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tagsBox" className={this.state.isTagsListOpen ? "showTags" : "hideTags"}>
                                            <div id="tagsHolder">
                                                {this.state.tagsData.map(t => (
                                                    <React.Fragment>
                                                        <div>
                                                            <input id={t} name="tags" type="checkbox" className="form-check-input" value={t} checked={this.state.tags.includes(t)} onChange={this.updateFormField} />
                                                            <label for={t} className="form-check-label ms-2 placeholderText">{t}</label>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container mt-2">
                                        <h6>Group Size</h6>
                                        {this.state.allGroupSizes.map(g => (
                                            <React.Fragment>
                                                <input id={g} name="groupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.groupSize.includes(g)} onChange={this.updateFormField} />
                                                <label for={g} className="form-check-label placeholderText ms-2 me-2">{g}</label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="container mt-2 mb-2">
                                        <h6>Sort By</h6>
                                        <div>
                                            <input className="form-check-input" type="radio" name="sortBy" id="mostRecent" value="recentlyAdded" checked={this.state.sortBy === "recentlyAdded"} onChange={this.updateFormField} />
                                            <label for="mostRecent" className="form-check-label ms-2 me-2 placeholderText">Most Recent</label>
                                            <input className="form-check-input" type="radio" name="sortBy" id="popularity" value="popularity" checked={this.state.sortBy === "popularity"} onChange={this.updateFormField} />
                                            <label for="popularity" className="form-check-label ms-2 me-2 placeholderText">Popularity</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SEARCH RESULTS */}
                <div className="container d-flex noSearchResultsContainer">
                    {this.state.showNoResults ? <p className="noSearchResults">No search results</p> : ""}
                </div>
                <div className="container">
                    <div id="searchResults" className="row lato">
                        {this.state.showLoading ?
                            <div id="loading" className="d-flex align-items-center justify-content-center">
                                <LoadingIcons.Puff stroke="#4a6eb5" fill="#4a6eb5" width="50px" id="loadingIcon" />
                            </div> : ""
                        }
                        {this.state.data.map(t => (
                            <div className="card col-xl-3 col-md-5 col-12 m-3 summaryCard">
                                <div className="card-title">
                                    <h4>{t.name}</h4>
                                    <div id="summaryCardDescription">
                                        {t.description}
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                            </svg> <span className="summaryCardText ms-2">{t.createdBy.userName}</span>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                            </svg> <span className="summaryCardText ms-2">{this.toDate(t.dateCreated)}</span>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg> <span className="summaryCardText ms-2">{t.likes} views</span>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hammer" viewBox="0 0 16 16">
                                                <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
                                            </svg> <span className="summaryCardText ms-2">{t.difficulty} difficulty</span>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                            </svg> <span className="summaryCardText">{t.groupSize.map(g => (
                                                <span className="ms-2">| {g}</span>
                                            ))}</span>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
                                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                                            </svg> <span className="summaryCardText ms-2">{t.timeNeeded} minutes</span>
                                        </div>
                                        <div id="tagsContainer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                            </svg> <span>{t.tags.map(tag => (
                                                <button id="tag" value={tag} onClick={this.searchByTag}>{tag}</button>
                                            ))}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="decoy"></div>
                                <button className="btn btn-sm btnShowMore" onClick={() => this.showToolCard(t._id, t.likes)}>Read More</button>
                            </div>
                        ))}
                    </div>

                </div>
                <div id="mobileBottomBuffer"></div>
                <ToolCard showToolCard={this.state.showToolCard}
                    closeToolCard={this.closeToolCard}
                    activeToolData={this.state.activeToolData}
                    updateFormField={this.updateFormField}
                    submitComment={this.submitComment}
                    commentUserName={this.state.commentUserName}
                    commentData={this.state.commentData}
                    commentEmail={this.state.commentEmail}
                    refresh={this.refresh}
                    showAddCommentUserError={this.state.showAddCommentUserError}
                    showAddCommentEmailError={this.state.showAddCommentEmailError}
                    showAddCommentError={this.state.showAddCommentError}
                    searchByTag={this.searchByTag}
                />

            </React.Fragment>
        );
    }
}