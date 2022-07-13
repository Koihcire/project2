import React from "react"
import axios from "axios";
import parse from "html-react-parser"

export default class MyTools extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        data: [],
        email: ""
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

    searchMyTools = async (e) => {
        try {
            let response = await axios.get(this.url + "tools", {
                params: {
                    email: this.state.email
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

    clearSearch = () => {
        this.setState({
            data: [],
            email: ""
        })

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>THIS IS MY TOOLS PAGE</h1>
                    <h6>Enter your email to display the tools you created</h6>
                </div>
                <div>
                    <input name="email" type="text" value={this.state.email} onChange={this.updateFormField} placeholder="email" />
                    <button onClick={this.searchMyTools}>Search</button>
                    <button onClick={this.clearSearch}>Clear</button>
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
        )
    }
}