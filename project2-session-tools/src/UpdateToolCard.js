import React from "react"
import "./ToolCard.css"
import axios from "axios"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class UpdateToolCard extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        allGroupSizes: ["small", "medium", "large"],
        _id: "",
        updateName: "",
        updateDescription: "",
        updateGroupSize: [],
        updateTimeNeeded: [],
        learningObjectives: [],
        updateLearningObjectives: [],
        materials: [],
        updateMaterials: [],
        updateInstructionsData: "",
        updateDebriefData: "",

        showStartUpdate: true
    }

    endUpdate = () => {
        this.setState({
            showStartUpdate: true
        })
        this.props.closeUpdateToolCard()
    }

    startUpdate = () => {
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
            learningObjectives: learningObjectives,
            updateLearningObjectives: [],
            materials: materials,
            updateMaterials: [],
            updateInstructionsData: instructions,
            updateDebriefData: debrief,
            showStartUpdate: false
        })

        // this.setState({
        //     showStartUpdate: false
        // })
    }

    // componentDidMount() {
    //     let name = this.props.activeToolData.name;
    //     let description = this.props.activeToolData.description;
    //     let tags = this.props.activeToolData.tags;
    //     let groupSize = this.props.activeToolData.groupSize;
    //     let timeNeeded = this.props.activeToolData.timeNeeded;
    //     let learningObjectives = this.props.activeToolData.learningObjectives;
    //     let materials = this.props.activeToolData.materials;
    //     let instructions = this.props.activeToolData.instructions;
    //     let debrief = this.props.activeToolData.debrief;

    //     // console.log(name)
    //     this.setState({
    //         updateName: name,
    //         updateDescription: description,
    //         updateTags: tags,
    //         updateGroupSize: groupSize,
    //         updateTimeNeeded: timeNeeded,
    //         updateLearningObjectives: learningObjectives,
    //         updateMaterials: materials,
    //         updateInstructionsData: instructions,
    //         updateDebriefData: debrief
    //     })
    //     // console.log(this.props.activeToolData)
    // }

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
                            {this.state.showStartUpdate ?
                                <div>
                                    <button onClick={this.startUpdate}>Click to Start Update</button>
                                </div> :
                                <React.Fragment>
                                    <div className="myModal-body">
                                        This is a modal update test
                                        <div>
                                            Name:
                                            <input type="text" className="form-control" name="updateName" value={this.state.updateName} onChange={this.updateFormField} />
                                        </div>
                                        <div>
                                            Description:
                                            <input type="text" className="form-control" name="updateDescription" value={this.state.updateDescription} onChange={this.updateFormField} />
                                        </div>
                                        <div>
                                            Group Size:
                                            {this.state.allGroupSizes.map(g => (
                                                <React.Fragment>
                                                    <input name="updateGroupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.updateGroupSize.includes(g)} onChange={this.updateFormField} />
                                                    <label for="updateGroupSize" className="form-check-label">{g}</label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div>
                                            Time Needed:
                                            <input name="updateTimeNeeded" type="number" className="form-control" value={this.state.updateTimeNeeded} onChange={this.updateFormField} /> minutes
                                        </div>
                                        <div>
                                            Instructions:
                                            <div>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.updateInstructionsData}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        console.log({ event, editor, data });
                                                        this.setState({
                                                            updateInstructionsData: data
                                                        })
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            Debrief:
                                            <div>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.updateDebriefData}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        console.log({ event, editor, data });
                                                        this.setState({
                                                            updateDebriefData: data
                                                        })
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="myModal-footer">
                                        <button onClick={this.endUpdate}>Cancel</button>
                                    </div>
                                </React.Fragment>
                            }

                            {/* <div className="myModal-body">
                                This is a modal update test
                                <input type="text" name="updateName" value={this.state.updateName} onChange={this.updateFormField}/>
                            </div> */}
                            {/* <div className="myModal-footer">
                                <button onClick={this.props.closeUpdateToolCard}>close</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
    }
}