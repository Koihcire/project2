import React from "react"
import "./ToolCard.css"
import parse from "html-react-parser"
import axios from "axios"

export default class UpdateToolCard extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state={
        _id: "",
        updateName: "",
        updateDescription: "",
        updateTags: [],
        updateGroupSize: [],
        updateTimeNeeded: [],
        updateLearningObjectives: [],
        updateMaterials: [],
        updateInstructionsData: "",
        updateDebriefData: ""
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.activeToolData !== prevProps.activeToolData){
    //         this.setState({
    //             updateName: name
    //         })
    //     }
    // }

    componentDidMount(){
        let name = this.props.activeToolData.name;
        let description = this.props.activeToolData.description;
        let tags = this.props.activeToolData.tags;
        let groupSize = this.props.activeToolData.groupSize;
        let timeNeeded = this.props.activeToolData.timeNeeded;
        let learningObjectives = this.props.activeToolData.learningObjectives;
        let materials = this.props.activeToolData.materials;
        let instructions = this.props.activeToolData.instructions;
        let debrief = this.props.activeToolData.debrief;

        // console.log(name)
        this.setState({
            updateName: name,
            updateDescription: description,
            updateTags: tags,
            updateGroupSize: groupSize,
            updateTimeNeeded: timeNeeded,
            updateLearningObjectives: learningObjectives,
            updateMaterials: materials,
            updateInstructionsData: instructions,
            updateDebriefData: debrief
        })
        console.log(this.props.activeToolData) 
    }

    updateFormField = (e) => {
        if (e.target.type === "checkbox") {
            let currentValues = this.state[e.target.name];
            let modifiedValues;
            if (!currentValues.includes(e.target.value)) {
                modifiedValues = [...currentValues, e.target.value];
            } else {
                modifiedValues = currentValues.filter((element) => {
                    return element !== e.target.value
                })
            }
            this.setState({
                [e.target.name]: modifiedValues
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        if (!this.props.showUpdateToolCard) {
            return null
        } else if (this.props.showUpdateToolCard) {
            return (
                <div className="myModal">
                    <div className="myModal-content">
                        <div className="myModal-header">
                            <div className="myModal-title">
                                <h4>Update</h4>
                            </div>
                            <div className="myModal-body">
                                This is a modal update test
                                <input type="text" name="updateName" value={this.state.updateName} onChange={this.updateFormField}/>
                            </div>
                            <div className="myModal-footer">
                                <button >close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}