import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class HomePage extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        data: [],
        allTags: [],
        searchName: "",
        searchRecent: "",
        minTimeNeeded: "",
        maxTimeNeeded: "",
        tags: ["Conflict Management"]
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
            this.setState({
                allTags: allTags
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
                    "tags": this.state.tags
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <input name="searchName" type="text" className="form-control-input" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" />
                </div>
                <div>
                    <input name="searchRecent" type="radio" value={new Date()} checked={this.state.searchRecent === new Date()} onChange={this.updateFormField} /> Recently Added
                </div>
                <div>
                    <input name="minTimeNeeded" type="number" className="form-control.input" value={this.state.minTimeNeeded} onChange={this.updateFormField} placeholder="Min Time in minutes"/>
                    <input name="maxTimeNeeded" type="number" className="form-control.input" value={this.state.maxTimeNeeded} onChange={this.updateFormField} placeholder="Max Time in minutes"/>
                </div>
                <button onClick={this.search}>Search</button>
                <h1>Search Results</h1>
                {this.state.data.map(t => (
                    <div className="card">
                        <div className="card-title">
                            <h3>{t.name}</h3>
                            <div className="card-body">
                                <div>
                                    Created By: {t.createdBy}
                                </div>
                                <div>
                                    Date Created: {t.dateCreated}
                                </div>
                                <div>
                                    Description: {t.description}
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
                                    Instructions: {t.instructions}
                                </div>
                                <div>
                                    Debrief: {t.debrief}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        )
    }
}