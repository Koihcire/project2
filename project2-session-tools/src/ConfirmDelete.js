import React from "react"
import "./ToolCard.css"

export default function ConfirmDelete(props) {
    if (!props.showConfirmDelete) {
        return null
    } else if (props.showConfirmDelete) {
        return (
            <div className="myModal">
                <div className="myAlertModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>Confirm delete "{props.activeToolData.name}"</h4>
                        </div>
                        {/* <div className="myModal-body">
                            {props.activeToolData.name}
                        </div> */}
                        <div className="myModal-footer">
                            <button className="btn btn-sm btnYes" onClick={() => props.processDelete(props.activeToolData._id)}>Yes</button>
                            {/* <button className="btn btn-sm btn-primary" onClick={props.closeConfirmDelete}>Cancel</button> */}
                            <button className="btn btn-sm deleteBtn" onClick={props.closeConfirmDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}