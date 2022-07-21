import React from "react"
import "./ToolCard.css"

export default function ConfirmDelete(props) {
    if (!props.showConfirmDelete){
        return null
    } else if (props.showConfirmDelete) {
        return (
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>Are you sure you want to delete?</h4>
                        </div>
                        {/* <div className="myModal-body">
                            {props.activeToolData.name}
                        </div> */}
                        <div className="myModal-footer">
                            <button className="btn btn-sm btn-danger" onClick={()=>props.processDelete(props.activeToolData._id)}>Yes</button>
                            <button className="btn btn-sm btn-primary" onClick={props.closeConfirmDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}