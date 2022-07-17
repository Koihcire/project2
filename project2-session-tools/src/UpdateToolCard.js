import React from "react"
import "./ToolCard.css"
import axios from "axios"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default class UpdateToolCard extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        allGroupSizes: ["small", "medium", "large"],
        updateId: "",
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

    processUpdate = async () => {
        try {
            await axios.put(this.url + "update-tool/" + this.state.updateId, {
                name: this.state.updateName,
                description: this.state.updateDescription,
                groupSize: this.state.updateGroupSize,
                timeNeeded: this.state.updateTimeNeeded,
                materials: this.state.updateMaterials,
                learningObjectives: this.state.updateLearningObjectives,
                instructions: this.state.updateInstructionsData,
                debrief: this.state.updateDebriefData
            })

        } catch (e) {
            console.log(e)
        }

        this.endUpdate()
        this.props.searchMyTools()
    }

    endUpdate = () => {
        this.setState({
            showStartUpdate: true,
            learningObjectives: [],
            materials: []
        })
        this.props.closeUpdateToolCard()
    }

    startUpdate = () => {
        let id = this.props.activeToolData._id;
        let name = this.props.activeToolData.name;
        let description = this.props.activeToolData.description;
        let tags = this.props.activeToolData.tags;
        let groupSize = this.props.activeToolData.groupSize;
        let timeNeeded = this.props.activeToolData.timeNeeded;
        let learningObjectivesData = this.props.activeToolData.learningObjectives;
        let materialsData = this.props.activeToolData.materials;
        let instructions = this.props.activeToolData.instructions;
        let debrief = this.props.activeToolData.debrief;

        // console.log(materialsData)
        let materials = [...this.state.materials];
        materialsData.map(m => {
            // console.log(m)
            materials.push({
                "material": m
            })
        })

        // console.log("materialsData = " + materials)

        let learningObjectives = [...this.state.learningObjectives]
        learningObjectivesData.map(l => {
            learningObjectives.push({
                "learningObjective": l
            })
        })

        // console.log(name)
        this.setState({
            updateId: id,
            updateName: name,
            updateDescription: description,
            updateTags: tags,
            updateGroupSize: groupSize,
            updateTimeNeeded: timeNeeded,
            learningObjectives: learningObjectives,
            updateLearningObjectives: [],
            materials: materials,
            updateInstructionsData: instructions,
            updateDebriefData: debrief,
            showStartUpdate: false
        })

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray
        })

        //set up updatelearningobjectivesarray
        let _newLearningObjectivesArray = [];
        for (let m of learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray
        })
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

    addMaterial = () => {
        let _materials = [...this.state.materials]
        _materials.push({
            material: ""
        })
        this.setState({
            materials: _materials
        })

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray
        })
    }

    removeMaterial = (index, e) => {
        let _materials = [...this.state.materials]

        _materials.splice(index, 1)
        this.setState({
            materials: _materials
        })
        // console.log(this.state.newMaterials)
        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray
        })
    }

    materialChange = (index, e) => {
        let _materials = [...this.state.materials]
        _materials[index][e.target.name] = e.target.value
        this.setState({
            materials: _materials
        })

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray
        })
    }

    addLearningObjective = () => {
        let _learningObjectives = [...this.state.learningObjectives]
        _learningObjectives.push({
            learningObjective: ""
        })
        this.setState({
            learningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray
        })
    }

    removeLearningObjective = (index) => {
        let _learningObjectives = [...this.state.learningObjectives]
        // _tags = _tags.filter(tag=> tag === tag[index])
        _learningObjectives.splice(index, 1)
        this.setState({
            learningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray
        })
    }

    learningObjectiveChange = (index, e) => {
        let _learningObjectives = [...this.state.learningObjectives]
        _learningObjectives[index][e.target.name] = e.target.value
        this.setState({
            learningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray
        })
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
                                            Materials:
                                            {this.state.materials.map((element, index) => (
                                                <React.Fragment>
                                                    <div key={index}>
                                                        <label></label>
                                                        <input name="material" type="text" value={element.material} onChange={(e) => this.materialChange(index, e)} />
                                                    </div>
                                                    <button onClick={this.addMaterial}>Add New</button>
                                                    <button onClick={(e) => this.removeMaterial(index, e)}>Remove</button>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div>
                                            Learning Objectives:
                                            {this.state.learningObjectives.map((element, index) => (
                                                <React.Fragment>
                                                    <div key={index}>
                                                        <label></label>
                                                        <input name="learningObjective" type="text" value={element.learningObjective} onChange={(e) => this.learningObjectiveChange(index, e)} />
                                                    </div>
                                                    <button onClick={this.addLearningObjective}>Add New</button>
                                                    <button onClick={() => this.removeLearningObjective(index)}>Remove</button>
                                                </React.Fragment>
                                            ))}
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
                                        <div>
                                            <button className="btn btn-sm btn-primary" onClick={this.processUpdate}>Update</button>
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