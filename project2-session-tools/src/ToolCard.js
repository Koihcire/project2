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
                            This is a modal test
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