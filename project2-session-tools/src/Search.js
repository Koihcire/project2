import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ToolCard from "./ToolCard";


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

        showNoResults: false
    }

    refresh = async () => {
        let response = await axios.get(this.url + "tool/" + this.state.activeToolData._id)
        this.setState({
            activeToolData: response.data.tool
        })
    }

    submitComment = async () => {
        let toolId = this.state.activeToolData._id
        if (this.state.commentUserName && this.state.commentData) {
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
            commentData: ""
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
    }

    search = async (e) => {
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
                    <div id="searchFilterBox">
                        <div className="d-flex container" id="searchBoxContainer">
                            <div id="searchBox">
                                <div className="container-fluid d-flex">
                                    <input id="searchField" name="searchName" type="text" className="form-control" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" />
                                    {/* <button id="btnFilter" className="btn btn-sm" onClick={this.toggleFilters}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                                    </svg></button> */}
                                    <button id="btnFilter" className="btn btn-sm" onClick={this.toggleFilters}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                                    </svg></button>
                                    <button id="btnSearch" className="btn btn-sm" onClick={this.search}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg></button>
                                </div>

                            </div>
                        </div>

                        <div className="d-flex container" id="filterContainer">
                            <div id="searchFilters" className={this.state.isFiltersOpen ? "showFilters" : "hideFilters"}>
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
                                                    <div id="tag">
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

                {/* SEARCH RESULTS */}
                <div id="noSearchResultsContainer" className="container d-flex">
                    {this.state.showNoResults ? <p id="noSearchResults">No search results</p> : ""}
                </div>
                <div className="container d-flex">
                    <div id="searchResults" className="row">
                        {this.state.data.map(t => (
                            <div className="card col-lg-3 m-3">
                                <div className="card-title">
                                    <h3>{t.name}</h3>
                                    <div className="card-body">
                                        <div>
                                            Created By: {t.createdBy.userName}
                                        </div>
                                        <div>
                                            Date Created: {t.dateCreated}
                                        </div>
                                        <div>
                                            Description: {t.description}
                                        </div>
                                        <div>
                                            Views: {t.likes}
                                        </div>
                                        <div>
                                            Difficulty Level: {t.difficulty}
                                        </div>
                                        <div>
                                            Tags: {t.tags.map(tags => (
                                                tags
                                            ))}
                                        </div>
                                        <div>
                                            Group Size: {t.groupSize.map(g => (
                                                g
                                            ))}
                                        </div>
                                        <div>
                                            Time Needed: {t.timeNeeded} minutes
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-sm btnColor" onClick={() => this.showToolCard(t._id, t.likes)}>Show More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ToolCard showToolCard={this.state.showToolCard}
                    closeToolCard={this.closeToolCard}
                    activeToolData={this.state.activeToolData}
                    updateFormField={this.updateFormField}
                    submitComment={this.submitComment}
                    commentUserName={this.state.commentUserName}
                    commentData={this.state.commentData}
                    commentEmail={this.state.commentEmail}
                    refresh={this.refresh}
                />

            </React.Fragment>
        );
    }
}