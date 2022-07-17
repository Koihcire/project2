import React from "react"
import "./ToolCard.css"
import parse from "html-react-parser"

export default function UpdateToolCard(props){
    if (!props.showUpdateToolCard) {
        return null
    } else if (props.showUpdateToolCard) {
        return (
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>{props.activeToolData.name}</h4>
                        </div>
                        <div className="myModal-body">
                            This is a modal update test
                        </div>
                        <div className="myModal-footer">
                            <button onClick={props.closeUpdateToolCard}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}