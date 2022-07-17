import React from "react"
import "./ToolCard.css"
import parse from "html-react-parser"


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
                                Likes: {props.activeToolData.likes} *heart*
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