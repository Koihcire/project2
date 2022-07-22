import React from "react"
import "./index.css"
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
        showEmailValidationError: false,
    }

    toDate = (date) => {
        const c = { time: date }
        return new Date(c.time).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
    }

    closeDelete = () => {
        this.setState({
            showValidateEmail: false,
            showEmailValidationError: false,
            activeCommentId: "",
            activeEmail: ""
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
            this.setState({
                showEmailValidationError: true
            })
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
                        <button className="btn btn-sm deleteBtn" onClick={this.props.closeToolCard}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg></button>
                        <div className="myModal-header">
                            <div className="myModal-title">
                                <h4>{this.props.activeToolData.name}</h4>
                                <div id="summaryCardDescription" className="mb-3">
                                    {this.props.activeToolData.description}
                                </div>

                            </div>
                            <div className="myModal-body">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg> <span className="summaryCardText ms-2">{this.props.activeToolData.createdBy.userName}</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg> <span className="summaryCardText ms-2">{this.toDate(this.props.activeToolData.dateCreated)}</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg> <span className="summaryCardText ms-2">{this.props.activeToolData.likes} views</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hammer" viewBox="0 0 16 16">
                                        <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
                                    </svg> <span className="summaryCardText ms-2">{this.props.activeToolData.difficulty} difficulty</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                    </svg> <span className="summaryCardText">{this.props.activeToolData.groupSize.map(g => (
                                        <span className="ms-2">| {g}</span>
                                    ))}</span>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
                                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                                    </svg> <span className="summaryCardText ms-2">{this.props.activeToolData.timeNeeded} minutes</span>
                                </div>
                                <div id="tagsContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                        <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                    </svg> <span>{this.props.activeToolData.tags.map(tag => (
                                        <span id="tag">{tag}</span>
                                    ))}</span>
                                </div>
                                <hr></hr>
                                <div className="mt-3">
                                    <h6>Learning Objectives</h6>
                                    <ul>
                                        {this.props.activeToolData.learningObjectives.map(lo => (
                                            <li>{lo}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-2">
                                    <h6>Materials Needed</h6>
                                    <ul>
                                        {this.props.activeToolData.materials.map(m => (
                                            <li>{m}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-2">
                                    {this.props.activeToolData.instructions ?
                                        <React.Fragment>
                                            <h6>Instructions</h6>
                                            <div className="ms-3">
                                                {parse(this.props.activeToolData.instructions)}
                                            </div>
                                        </React.Fragment>
                                        : ""
                                    }
                                </div>
                                <div className="mt-3 mb-2">
                                    {this.props.activeToolData.debrief ?
                                        <React.Fragment>
                                            <h6>Debrief</h6>
                                            <div className="ms-3">
                                                {parse(this.props.activeToolData.debrief)}
                                            </div>
                                        </React.Fragment>
                                        : ""
                                    }
                                </div>
                                <hr></hr>


                                <div className="mt-2">
                                    {this.props.activeToolData.comments ?
                                        <React.Fragment>
                                            <h6>Comments</h6>
                                            {this.props.activeToolData.comments.map(c => (
                                                <div id="commentCard" className="card p-2 mt-2">
                                                    <div className="commentUser">
                                                        {c.userName}
                                                    </div>
                                                    <div className="commentData">
                                                        {c.comments}
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-sm deleteBtn" onClick={() => this.toggleConfirmDeleteComment(c.comment_id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                        : ""
                                    }
                                </div>
                                <div className="px-4 mt-3">
                                    <p className="commentFieldHeader">Add New Comment</p>
                                    <div id="addNewComment" className="card">
                                        <label className="commentFieldHeader">User Name</label>
                                        <input type="text" name="commentUserName" className="form-control-sm commentBox" value={this.props.commentUserName} onChange={this.props.updateFormField} />
                                        {this.props.showAddCommentUserError ? <p className="errorMessage">! User name cannot be empty</p> : ""}
                                        <label className="commentFieldHeader">Email</label>
                                        <input type="text" name="commentEmail" className="form-control-sm commentBox" value={this.props.commentEmail} onChange={this.props.updateFormField} />
                                        {this.props.showAddCommentEmailError ? <p className="errorMessage">! Please enter a valid email address</p> : ""}
                                        <label className="commentFieldHeader">Comments</label>
                                        <textarea type="text" name="commentData" className="form-control-sm commentBox" value={this.props.commentData} onChange={this.props.updateFormField} />
                                        {this.props.showAddCommentError ? <p className="errorMessage">! Comments cannot be empty</p> : ""}
                                        <div>
                                            <button id="btnComment" className="btn btn-sm btnColor mt-2" onClick={this.props.submitComment}>Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myModal-footer">
                                {/* <button onClick={this.props.closeToolCard}>close</button> */}

                            </div>
                        </div>
                    </div>
                    {this.state.showValidateEmail ? <ValidateEmail
                        showValidateEmail={this.state.showValidateEmail}
                        updateFormField={this.updateFormField}
                        processDelete={this.processDelete}
                        closeDelete={this.closeDelete}
                        showEmailValidationError={this.state.showEmailValidationError}
                    /> : ""}
                </div>
            )
        }
    }

}