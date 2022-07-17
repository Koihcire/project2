import React from "react"
import "./ToolCard.css"

export default function ProcessAddNew(props){
    if (!props.showProcessAddNew){
        return null
    } else if (props.showProcessAddNew){
        return(
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>Confirmation</h4>
                        </div>
                        <div className="myModal-body">
                            This record has been added
                        </div>
                        <div className="myModal-footer">
                            <button className="btn btn-sm btn-primary" onClick={props.closeProcessAddNew}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}