import React from "react"
import axios from "axios";
import parse from "html-react-parser"
import ToolCard from "./ToolCard";
import "./ToolCard.css"
import UpdateToolCard from "./UpdateToolCard";
import ConfirmDelete from "./ConfirmDelete";
import ProcessDelete from "./ProcessDelete";

export default class MyTools extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        tagsData: [],
        data: [],
        email: "",

        showToolCard: false,
        showUpdateToolCard: false,
        showConfirmDelete: false,
        showProcessDelete: false,

        activeToolData: [],
    }

    async componentDidMount() {
        try {
            let response = await axios.get(this.url + "tags")
            let responseData = response.data.tags

            let allTags = []
            for (let t of responseData) {
                for (let tag of t.tags) {
                    // console.log(tag)
                    allTags.push(tag)
                }
            }

            let allUniqueTags = [...new Set(allTags)]
            let tagsData = []
            for (let i = 0; i < allUniqueTags.length; i++) {
                let temp = {
                    label: allUniqueTags[i],
                    value: i + 1
                }
                tagsData.push(temp)
            }

            this.setState({
                tagsData: tagsData
            })
        } catch (e) {
            console.log(e)
        }
    }

    closeToolCard = () => {
        this.setState({
            showToolCard: false
        })
    }

    showToolCard = async (toolId) => {
        let response = await axios.get(this.url + "tool/" + toolId)

        this.setState({
            showToolCard: true,
            activeToolData: response.data.tool
        })
    }

    closeUpdateToolCard = () => {
        this.setState({
            showUpdateToolCard: false
        })
    }

    showUpdateToolCard = async (toolId) => {
        let response = await axios.get(this.url + "tool/" + toolId)

        this.setState({
            showUpdateToolCard: true,
            activeToolData: response.data.tool
        })
    }

    closeConfirmDelete = () => {
        this.setState({
            showConfirmDelete: false
        })
    }

    showConfirmDelete = async (toolId) => {
        let response = await axios.get(this.url + "tool/" + toolId)

        this.setState({
            showConfirmDelete: true,
            activeToolData: response.data.tool
        })
    }

    showProcessDelete = () => {
        this.setState({
            showProcessDelete: true
        })
    }

    closeProcessDelete = () => {
        this.setState({
            showProcessDelete: false
        })

        this.searchMyTools()
    }

    processDelete = async (toolId) => {
        await axios.delete(this.url + "delete-tool/" + toolId)

        this.setState({
            showConfirmDelete: false,
            showProcessDelete: true
        })
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
        if (this.state.email){
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
                                    Views: {t.likes} 
                                </div>
                                <div>
                                    Difficulty: {t.difficulty}
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
                                    <button className="btn btn-sm btn-primary" onClick={() => this.showToolCard(t._id)}>Show More</button>
                                    <button className="btn btn-sm btn-primary" onClick={() => this.showUpdateToolCard(t._id)}>Update Tool</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => this.showConfirmDelete(t._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                <ToolCard showToolCard={this.state.showToolCard}
                    closeToolCard={this.closeToolCard}
                    activeToolData={this.state.activeToolData} />

                <UpdateToolCard showUpdateToolCard={this.state.showUpdateToolCard}
                    closeUpdateToolCard={this.closeUpdateToolCard}
                    activeToolData={this.state.activeToolData}
                    searchMyTools={this.searchMyTools}
                    tagsData={this.state.tagsData} />

                <ConfirmDelete showConfirmDelete={this.state.showConfirmDelete}
                    closeConfirmDelete={this.closeConfirmDelete}
                    activeToolData={this.state.activeToolData}
                    processDelete={this.processDelete} />

                <ProcessDelete showProcessDelete={this.state.showProcessDelete}
                    closeProcessDelete={this.closeProcessDelete} />

            </React.Fragment>
        )
    }
}