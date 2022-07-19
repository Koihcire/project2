import React from "react"
import "./ToolCard.css"
import parse from "html-react-parser"
import "bootstrap/dist/css/bootstrap.min.css"


export default function ToolCard(props) {

    if (!props.showToolCard) {
        return null
    } else if (props.showToolCard) {
        return (
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>{props.activeToolData.name}</h4>
                        </div>
                        <div className="myModal-body">
                            <div>
                                Created By: {props.activeToolData.createdBy.userName}
                            </div>
                            <div>
                                Date Created: {props.activeToolData.dateCreated}
                            </div>
                            <div>
                                Description: {props.activeToolData.description}
                            </div>
                            <div>
                                Views: {props.activeToolData.likes}
                            </div>
                            <div>
                                Difficulty: {props.activeToolData.difficulty}
                            </div>
                            <div>
                                Tags: {props.activeToolData.tags.map(tags => (
                                    tags
                                ))}
                            </div>
                            <div>
                                Group Size: {props.activeToolData.groupSize.map(g => (
                                    g
                                ))}
                            </div>
                            <div>
                                Time Needed: {props.activeToolData.timeNeeded} minutes
                            </div>
                            <div>
                                Learning Objectives: {props.activeToolData.learningObjectives}
                            </div>
                            <div>
                                Materials: {props.activeToolData.materials}
                            </div>
                            <div>
                                Instructions:
                                <div>
                                    {parse(props.activeToolData.instructions)}
                                </div>
                            </div>
                            <div>
                                Debrief:
                                <div>
                                    {parse(props.activeToolData.debrief)}
                                </div>
                            </div>
                            <div>
                                Comments:
                                {props.activeToolData.comments.map(c => (
                                    <div className="card">
                                        <div>
                                            {c.userName}
                                        </div>
                                        <div>
                                            {c.comments}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                Add New Comment:
                                <div className="card">
                                    <label>User Name</label>
                                    <input type="text" name="commentUserName" className="form-control" value={props.commentUserName} onChange={props.updateFormField} />
                                    <label>Comments</label>
                                    <input type="text" name="commentData" className="form-control" value={props.commentData} onChange={props.updateFormField} />
                                    <div>
                                        <button className="btn btn-sm btn-primary" onClick={props.submitComment}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="myModal-footer">
                            <button onClick={props.closeToolCard}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}