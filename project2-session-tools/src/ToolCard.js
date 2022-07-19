import React from "react"
import "./ToolCard.css"
import parse from "html-react-parser"
import "bootstrap/dist/css/bootstrap.min.css"
import ValidateEmail from "./ValidateEmail"
import axios from "axios"



export default class ToolCard extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        showValidateEmail: false,
        activeCommentId: "",
        activeEmail: "",
        activeToolId: "",
        deleteCommentMatch: false
    }

    closeDelete = () => {
        this.setState({
            showValidateEmail: false
        })
    }

    toggleConfirmDeleteComment = async (comment_id) => {
        this.setState({
            showValidateEmail: true,
            activeCommentId: comment_id,
        })
    }

    processDelete = async () => {
        let comment_id = this.state.activeCommentId
        let email = this.state.activeEmail
        let firstResponse = ''
        try {
            firstResponse = await axios.get(this.url + "get-comment", {
                params: {
                    comment_id: comment_id,
                    email: email
                }
            })
            console.log(firstResponse.data)

        } catch (e) {
            console.log(e)
        }

        if (firstResponse.data.length !== 0) {
            try {
                await axios.put(this.url + "delete-comment/", {
                    comment_id: this.state.activeCommentId,
                })
                console.log("DELETED")
                this.setState({
                    showValidateEmail: false
                })
                this.props.refresh()
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log("CANNOT DELETE")
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
        if (!this.props.showToolCard) {
            return null
        } else if (this.props.showToolCard) {
            return (
                <div className="myModal">
                    <div className="myModal-content">
                        <div className="myModal-header">
                            <div className="myModal-title">
                                <h4>{this.props.activeToolData.name}</h4>
                            </div>
                            <div className="myModal-body">
                                <div>
                                    Created By: {this.props.activeToolData.createdBy.userName}
                                </div>
                                <div>
                                    Date Created: {this.props.activeToolData.dateCreated}
                                </div>
                                <div>
                                    Description: {this.props.activeToolData.description}
                                </div>
                                <div>
                                    Views: {this.props.activeToolData.likes}
                                </div>
                                <div>
                                    Difficulty: {this.props.activeToolData.difficulty}
                                </div>
                                <div>
                                    Tags: {this.props.activeToolData.tags.map(tags => (
                                        tags
                                    ))}
                                </div>
                                <div>
                                    Group Size: {this.props.activeToolData.groupSize.map(g => (
                                        g
                                    ))}
                                </div>
                                <div>
                                    Time Needed: {this.props.activeToolData.timeNeeded} minutes
                                </div>
                                <div>
                                    Learning Objectives: {this.props.activeToolData.learningObjectives}
                                </div>
                                <div>
                                    Materials: {this.props.activeToolData.materials}
                                </div>
                                <div>
                                    Instructions:
                                    <div>
                                        {parse(this.props.activeToolData.instructions)}
                                    </div>
                                </div>
                                <div>
                                    Debrief:
                                    <div>
                                        {parse(this.props.activeToolData.debrief)}
                                    </div>
                                </div>
                                <div>
                                    Comments:
                                    {this.props.activeToolData.comments.map(c => (
                                        <div className="card">
                                            <div>
                                                {c.userName}
                                            </div>
                                            <div>
                                                {c.comments}
                                            </div>
                                            <div>
                                                <button className="btn btn-sm btn-danger" onClick={() => this.toggleConfirmDeleteComment(c.comment_id)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    Add New Comment:
                                    <div className="card">
                                        <label>User Name</label>
                                        <input type="text" name="commentUserName" className="form-control" value={this.props.commentUserName} onChange={this.props.updateFormField} />
                                        <label>Email</label>
                                        <input type="text" name="commentEmail" className="form-control" value={this.props.commentEmail} onChange={this.props.updateFormField} />
                                        <label>Comments</label>
                                        <input type="text" name="commentData" className="form-control" value={this.props.commentData} onChange={this.props.updateFormField} />
                                        <div>
                                            <button className="btn btn-sm btn-primary" onClick={this.props.submitComment}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myModal-footer">
                                <button onClick={this.props.closeToolCard}>close</button>
                            </div>
                        </div>
                    </div>
                    {this.state.showValidateEmail ? <ValidateEmail
                        showValidateEmail={this.state.showValidateEmail}
                        updateFormField={this.updateFormField}
                        processDelete={this.processDelete}
                        closeDelete={this.closeDelete}
                        deleteCommentMatch={this.state.deleteCommentMatch}
                    /> : ""}
                </div>
            )
        }
    }

}