import React from "react";
import axios from "axios";
import parse from "html-react-parser"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Search.css"


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
        allGroupSizes: ["small", "medium", "large"],

        isTagsListOpen: false
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
                    "groupSize": this.state.groupSize
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

    toggleClassList = () => {

    }

    render() {
        return (
            <React.Fragment>
                {/* SEARCH */}
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
                    <h6>Tags</h6>
                    <button className="btn btn-sm btn-primary" onClick={this.toggleTagsList}>Select one or more tags</button>
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
                                    Likes: {t.likes} *heart*
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
                                <div>
                                    Materials: {t.materials.map(materials => (
                                        materials
                                    ))}
                                </div>
                                <div>
                                    Learning Objectives: {t.learningObjectives}
                                </div>
                                <div>
                                    Instructions: {parse(t.instructions)}
                                </div>
                                <div>
                                    Debrief: {parse(t.debrief)}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}