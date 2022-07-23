import React from "react"
import axios from "axios";
import parse from "html-react-parser"
import ToolCard from "./ToolCard";
import "./index.css"
import "./ToolCard.css"
import "./MyTools.css"
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
        commentUserName: "",
        commentEmail: "",
        commentData: "",

        showNoResults: false,
        showEmailError: false,
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
        //check for email error
        if ((!this.state.email.includes("@") && !this.state.email.includes(".")) || !this.state.email) {
            await this.setState({
                showEmailError: true
            })
        } else {
            await this.setState({
                showEmailError: false
            })
        }

        if (!this.state.showEmailError) {
            try {
                let response = await axios.get(this.url + "tools", {
                    params: {
                        email: this.state.email
                    }
                }
                )

                let data = response.data.tools;

                if (!data.length) {
                    await this.setState({
                        showNoResults: true,
                        data: data
                    })
                } else {
                    await this.setState({
                        showNoResults: false,
                        data: data
                    })
                }
                // this.setState({
                //     data: response.data.tools
                // })
            } catch (e) {
                console.log(e)
            }
        }
    }

    keyUpSearch = (e) => {
        if (e.key === "Enter") {
            this.searchMyTools();
        }
    }

    clearSearch = () => {
        this.setState({
            data: [],
            email: "",
            showNoResults: false,
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

    refresh = async () => {
        let response = await axios.get(this.url + "tool/" + this.state.activeToolData._id)
        this.setState({
            activeToolData: response.data.tool
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex mt-3 justify-content-center">
                    <div>
                        <div>
                            <input id="myToolsSearchField" name="email" className="form-control" type="text" value={this.state.email} onChange={this.updateFormField} placeholder="Enter email to search for your tools" onKeyUp={this.keyUpSearch} />
                        </div>
                        <div>
                            {this.state.showEmailError ? <p className="errorMessage ms-3">!Please enter a valid email address</p> : ""}
                        </div>
                    </div>
                    <button id="btnFilter" className="btn btn-sm" onClick={this.searchMyTools}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg></button>
                    <button id="btnSearch" className="btn btn-sm" onClick={this.clearSearch}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></button>
                </div>

                {/* SEARCH RESULTS */}
                <div className="container d-flex noSearchResultsContainer">
                    {this.state.showNoResults ? <p className="noSearchResults">No search results</p> : ""}
                </div>
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
                    activeToolData={this.state.activeToolData}
                    updateFormField={this.updateFormField}
                    submitComment={this.submitComment}
                    commentUserName={this.state.commentUserName}
                    commentData={this.state.commentData}
                    commentEmail={this.state.commentEmail}
                    refresh={this.refresh} />

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