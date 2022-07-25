import React from "react"
import "./ToolCard.css"

export default function ProcessDelete(props){
    if (!props.showProcessDelete){
        return null
    } else if (props.showProcessDelete){
        return(
            <div className="myModal">
                <div className="myAlertModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title d-flex justify-content-center">
                            <h4>Your record has been deleted</h4>
                        </div>
                        <div className="myModal-footer">
                            <button id="btnProcessDelete" className="btn btn-sm" onClick={props.closeProcessDelete}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}