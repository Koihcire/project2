import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "./Search.css"
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
        commentData: "",
    }

    submitComment = async () => {
        let toolId = this.state.activeToolData._id
        if (this.state.commentUserName && this.state.commentData) {
            try {
                let response = await axios.put(this.url + "add-comment/" + toolId, {
                    userName: this.state.commentUserName,
                    comments: this.state.commentData
                })
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
            this.setState({
                commentUserName: "",
                commentData: ""
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
        try {
            let response = await axios.get(this.url + "tools", {
                params: {
                    "name": this.state.searchName,
                    "dateCreated": this.state.searchRecent,
                    "minTimeNeeded": this.state.minTimeNeeded,
                    "maxTimeNeeded": this.state.maxTimeNeeded,
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
                {/* SEARCH */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-2-circle-fill iconHeight" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="iconHeight" fill="currentColor" viewBox="0 0 448 512"><path d="M423.9 255.8L411 413.1c-3.3 40.7-63.9 35.1-60.6-4.9l10-122.5-41.1 2.3c10.1 20.7 15.8 43.9 15.8 68.5 0 41.2-16.1 78.7-42.3 106.5l-39.3-39.3c57.9-63.7 13.1-167.2-74-167.2-25.9 0-49.5 9.9-67.2 26L73 243.2c22-20.7 50.1-35.1 81.4-40.2l75.3-85.7-42.6-24.8-51.6 46c-30 26.8-70.6-18.5-40.5-45.4l68-60.7c9.8-8.8 24.1-10.2 35.5-3.6 0 0 139.3 80.9 139.5 81.1 16.2 10.1 20.7 36 6.1 52.6L285.7 229l106.1-5.9c18.5-1.1 33.6 14.4 32.1 32.7zm-64.9-154c28.1 0 50.9-22.8 50.9-50.9C409.9 22.8 387.1 0 359 0c-28.1 0-50.9 22.8-50.9 50.9 0 28.1 22.8 50.9 50.9 50.9zM179.6 456.5c-80.6 0-127.4-90.6-82.7-156.1l-39.7-39.7C36.4 287 24 320.3 24 356.4c0 130.7 150.7 201.4 251.4 122.5l-39.7-39.7c-16 10.9-35.3 17.3-56.1 17.3z" /></svg>
                <div>
                    <input name="searchName" type="text" className="form-control-input" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" />
                </div>
                <div>
                    <input name="searchRecent" type="checkbox" className="form-check-input" value="true" checked={this.state.searchRecent.includes("true")} onChange={this.updateFormField} />
                    <label for="searchRecent">Recently Added</label>
                </div>
                <div>
                    <input name="minTimeNeeded" type="number" className="form-control.input" value={this.state.minTimeNeeded} onChange={this.updateFormField} placeholder="Min Time in minutes" />
                    <input name="maxTimeNeeded" type="number" className="form-control.input" value={this.state.maxTimeNeeded} onChange={this.updateFormField} placeholder="Max Time in minutes" />
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

                    <div className={this.state.isTagsListOpen ? "show" : "hidden"}>
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
                <button onClick={this.search}>Search</button>

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
                />

            </React.Fragment>
        );
    }
}