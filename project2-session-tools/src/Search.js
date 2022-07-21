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
        isFiltersOpen: false
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
                this.setState({
                    data: response.data.tools
                })
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
                        <div id="searchBox">
                            <input id="searchField" name="searchName" type="text" className="form-control" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" />
                            <button id="btnSearch" className="btn btn-sm" onClick={this.search}>Search</button>
                            <button id="btnFilter" className="btn btn-sm" onClick={this.toggleFilters}>Show</button>
                        </div>
                        <div id="searchFilters" className={this.state.isFiltersOpen ? "showFilters container" : "hideFilters container"}>
                    
                        </div>
                    </div>


                    <div>
                        <input name="searchRecent" type="checkbox" className="form-check-input" value="true" checked={this.state.searchRecent.includes("true")} onChange={this.updateFormField} />
                        <label for="searchRecent">Recently Added</label>
                    </div>
                    <div>
                        <input name="minTimeNeeded" type="number" className="form-control.input" value={this.state.minTimeNeeded} onChange={this.updateFormField} placeholder="Min Time in minutes" />
                        <input name="maxTimeNeeded" type="number" className="form-control.input" value={this.state.maxTimeNeeded} onChange={this.updateFormField} placeholder="Max Time in minutes" />
                        {this.state.showMaxMinError ? <p>Max value cannot be less than min value</p> : ''}
                    </div>
                    <div>
                        <h6>Difficulty</h6>
                        <select className="form-select form-select-sm" name="difficulty" onChange={this.updateFormField}>
                            <option selected value="">Select One</option>
                            {this.state.allDifficulty.map(d => (
                                <React.Fragment>
                                    <option value={d}>{d}</option>
                                </React.Fragment>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h6>Tags</h6>
                        <div>
                            <div className="btn btn-sm btn-primary" onClick={this.toggleTagsList}>
                                Select one or more tags {this.state.isTagsListOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                            </div>
                        </div>

                        <div id="tagsBox" className={this.state.isTagsListOpen ? "showTags" : "hideTags"}>
                            {this.state.tagsData.map(t => (
                                <React.Fragment>
                                    <div>
                                        <input name="tags" type="checkbox" className="form-check-input" value={t} checked={this.state.tags.includes(t)} onChange={this.updateFormField} />
                                        <label for="tags" className="form-check-label">{t}</label>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h6>Group Size</h6>
                        {this.state.allGroupSizes.map(g => (
                            <React.Fragment>
                                <input name="groupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.groupSize.includes(g)} onChange={this.updateFormField} />
                                <label for="groupSize" className="form-check-label">{g}</label>
                            </React.Fragment>
                        ))}
                    </div>
                    <div>
                        Sort By:
                        <div>
                            <input className="form-check-input" type="radio" name="sortBy" id="recentlyAdded" value="recentlyAdded" checked={this.state.sortBy === "recentlyAdded"} onChange={this.updateFormField} />
                            <label for="recentlyAdded" className="form-check-label">Recently Added</label>
                            <input className="form-check-input" type="radio" name="sortBy" id="popularity" value="popularity" checked={this.state.sortBy === "popularity"} onChange={this.updateFormField} />
                            <label for="popularity" className="form-check-label">Popularity</label>
                        </div>
                    </div>
                </div>

                {/* SEARCH RESULTS */}
                <h1>Search Results</h1>
                {this.state.data.map(t => (
                    <div className="card">
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
                            <button className="btn btn-sm btn-primary" onClick={() => this.showToolCard(t._id, t.likes)}>Show More</button>
                        </div>

                    </div>
                ))}
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