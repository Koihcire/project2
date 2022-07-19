import React from "react"
import "./ToolCard.css"

export default function ValidateEmail(props) {
    if (!props.showValidateEmail){
        return null
    } else if (props.showValidateEmail) {
        return (
            {props.}
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">
                        <div className="myModal-title">
                            <h4>Enter your email address to Delete</h4>
                        </div>
                        <div className="myModal-body">
                            <input type="text" name="activeEmail" className="form-control-input" value={props.checkEmail} onChange={props.updateFormField}/>
                        </div>
                        <div className="myModal-footer">
                            <button className="btn btn-sm btn-danger" onClick={props.processDelete}>Yes</button>
                            <button className="btn btn-sm btn-primary" onClick={props.closeDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}