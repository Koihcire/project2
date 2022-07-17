import React from "react"
import "./ToolCard.css"

export default function ProcessDelete(props){
    if (!props.showProcessDelete){
        return null
    } else if (props.showProcessDelete){
        return(
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>Confirmation</h4>
                        </div>
                        <div className="myModal-body">
                            This record has been deleted
                        </div>
                        <div className="myModal-footer">
                            <button className="btn btn-sm btn-primary" onClick={props.closeProcessDelete}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}