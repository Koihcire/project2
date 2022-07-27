import React from "react"
import "./ToolCard.css"
// import "./AddNew.css"
import "./index.css"
import axios from "axios"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CreatableSelect from 'react-select/creatable';


export default class UpdateToolCard extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        allGroupSizes: ["Small", "Medium", "Large"],
        allDifficulty: ["Easy", "Medium", "Hard"],
        allTags: [],
        updateTags: [],
        preSelectedTags: [],
        updateId: "",
        updateName: "",
        updateDescription: "",
        updateGroupSize: [],
        updateTimeNeeded: [],
        updateDifficulty: "",
        learningObjectives: [],
        updateLearningObjectives: [],
        materials: [],
        updateMaterials: [],
        updateInstructionsData: "",
        updateDebriefData: "",

        showStartUpdate: true,

        showNameError: false,
        showDescriptionError: false,
        showTagsError: false,
        showGroupSizeError: false,
        showTimeNeededError: false,
        showLearningObjectivesError: false,
        showMaterialsError: false,
        showDifficultyError: false,
        showInstructionsError: false,
    }

    processUpdate = async () => {
        //check for name error
        if (!this.state.updateName || this.state.updateName.length > 100) {
            await this.setState({
                showNameError: true
            })
        } else {
            await this.setState({
                showNameError: false
            })
        }

        //check for description error
        if (!this.state.updateDescription || this.state.updateDescription.length > 300) {
            await this.setState({
                showDescriptionError: true
            })
        } else {
            await this.setState({
                showDescriptionError: false
            })
        }

        //check for tags error
        if (!this.state.updateTags.length) {
            await this.setState({
                showTagsError: true
            })
        } else {
            await this.setState({
                showTagsError: false
            })
        }

        //check for group size error
        if (!this.state.updateGroupSize.length) {
            await this.setState({
                showGroupSizeError: true
            })
        } else {
            await this.setState({
                showGroupSizeError: false
            })
        }

        //check for time needed error
        if (!this.state.updateTimeNeeded || this.state.updateTimeNeeded < 0 || this.state.updateTimeNeeded > 999) {
            await this.setState({
                showTimeNeededError: true
            })
        } else {
            await this.setState({
                showTimeNeededError: false
            })
        }

        //check difficulty error
        if (!this.state.updateDifficulty) {
            await this.setState({
                showDifficultyError: true
            })
        } else {
            await this.setState({
                showDifficultyError: false
            })
        }

        //check for materials error
        let emptyMat = "";
        for (let m of this.state.updateMaterials) {
            if (!m.length) {
                emptyMat = true
            }
        }
        if (emptyMat) {
            await this.setState({
                showMaterialsError: true
            })
        } else {
            await this.setState({
                showMaterialsError: false
            })
        }

        //check for learning objectives error
        let emptyLo = "";
        for (let l of this.state.updateLearningObjectives) {
            if (!l.length) {
                emptyLo = true
            }
        }
        if (emptyLo) {
            await this.setState({
                showLearningObjectivesError: true
            })
        } else {
            await this.setState({
                showLearningObjectivesError: false
            })
        }

        //check for instructions error
        if (!this.state.updateInstructionsData) {
            await this.setState({
                showInstructionsError: true
            })
        } else {
            await this.setState({
                showInstructionsError: false
            })
        }

        try {
            await axios.put(this.url + "update-tool/" + this.state.updateId, {
                name: this.state.updateName,
                description: this.state.updateDescription,
                groupSize: this.state.updateGroupSize,
                timeNeeded: this.state.updateTimeNeeded,
                materials: this.state.updateMaterials,
                learningObjectives: this.state.updateLearningObjectives,
                instructions: this.state.updateInstructionsData,
                debrief: this.state.updateDebriefData,
                tags: this.state.updateTags,
                difficulty: this.state.updateDifficulty
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

    componentDidMount() {
        let id = this.props.activeToolData._id;
        let name = this.props.activeToolData.name;
        let description = this.props.activeToolData.description;
        let allTagsData = this.props.tagsData;
        let groupSize = this.props.activeToolData.groupSize;
        let timeNeeded = this.props.activeToolData.timeNeeded;
        let learningObjectivesData = this.props.activeToolData.learningObjectives;
        let materialsData = this.props.activeToolData.materials;
        let instructions = this.props.activeToolData.instructions;
        let debrief = this.props.activeToolData.debrief;
        let tags = this.props.activeToolData.tags;
        let difficulty = this.props.activeToolData.difficulty;

    
        let materials = [...this.state.materials];
        materialsData.map(m => {
            // console.log(m)
            materials.push({
                "material": m
            })
        })

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of materials) {
            _newMaterialsArray.push(m.material)
        }

        let learningObjectives = [...this.state.learningObjectives]
        learningObjectivesData.map(l => {
            learningObjectives.push({
                "learningObjective": l
            })
        })

        //set up updatelearningobjectivesarray
        let _newLearningObjectivesArray = [];
        for (let m of learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }

        let _selectedTags = [];
        for (let i = 0; i < tags.length; i++) {
            let temp = {
                label: tags[i],
                value: i + 1
            }
            _selectedTags.push(temp)
        }

        // console.log(name)
        this.setState({
            updateId: id,
            updateName: name,
            updateDescription: description,
            allTags: allTagsData,
            updateGroupSize: groupSize,
            updateTimeNeeded: timeNeeded,
            learningObjectives: learningObjectives,
            updateLearningObjectives: _newLearningObjectivesArray,
            materials: materials,
            updateMaterials: _newMaterialsArray,
            updateInstructionsData: instructions,
            updateDebriefData: debrief,
            showStartUpdate: false,
            updateTags: tags,
            preSelectedTags: _selectedTags,
            updateDifficulty: difficulty
        })
    }

    handleCreatableChange = (selectedOptions) => {
        // console.log("selected =>" + selectedOptions)
        let temp = []
        for (let o of selectedOptions) {
            temp.push(o.label)
        }
        console.log("temp" + temp)
        this.setState({
            updateTags: temp
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

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray,
            materials: _materials
        })
    }

    removeMaterial = (index, e) => {
        let _materials = [...this.state.materials]

        _materials.splice(index, 1)

        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray,
            materials: _materials
        })
    }

    materialChange = (index, e) => {
        let _materials = [...this.state.materials]
        _materials[index][e.target.name] = e.target.value
        // this.setState({
        //     materials: _materials
        // })

        // set updatematerialsarray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            updateMaterials: _newMaterialsArray,
            materials: _materials
        })
    }

    addLearningObjective = () => {
        let _learningObjectives = [...this.state.learningObjectives]
        _learningObjectives.push({
            learningObjective: ""
        })
  
        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray,
            learningObjectives: _learningObjectives
        })
    }

    removeLearningObjective = (index) => {
        let _learningObjectives = [...this.state.learningObjectives]

        _learningObjectives.splice(index, 1)
      

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray,
            learningObjectives: _learningObjectives
        })
    }

    learningObjectiveChange = (index, e) => {
        let _learningObjectives = [...this.state.learningObjectives]
        _learningObjectives[index][e.target.name] = e.target.value
        // this.setState({
        //     learningObjectives: _learningObjectives
        // })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            updateLearningObjectives: _newLearningObjectivesArray,
            learningObjectives: _learningObjectives
        })
    }

    render() {
        return (
            <div className="myModal">
                <div className="myModal-content">
                    <div className="myModal-header">

                        <div className="myModal-title">
                            <div>
                                <button className="btn btn-sm deleteBtn me-4 mt-2" onClick={this.endUpdate}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg></button>
                            </div>
                        </div>
                        {this.state.showStartUpdate ?
                        ""
                            :
                            <React.Fragment>
                                <div className="myModal-body">
                                    <div>
                                        <h4>Name</h4>
                                        <input name="updateName" type="text" className="form-control" value={this.state.updateName} onChange={this.updateFormField} placeholder="Activity Name" />
                                        {this.state.showNameError ? <p className="errorMessage">!Please enter an activity name</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Description:
                                        <div>
                                            <textarea rows={4} name="updateDescription" type="text" className="form-control mt-2" value={this.state.updateDescription} onChange={this.updateFormField} placeholder="Brief description of the activity" />
                                            {this.state.showDescriptionError ? <p className="errorMessage">!Please describe your activity</p> : ""}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        Group Size:
                                        <div className="mt-2">
                                            {this.state.allGroupSizes.map(g => (
                                                <React.Fragment>
                                                    <input id={g} name="updateGroupSize" type="checkbox" className="form-check-input ms-3" value={g} checked={this.state.updateGroupSize.includes(g)} onChange={this.updateFormField} />
                                                    <label for={g} className="form-check-label ms-1">{g}</label>
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        {this.state.showGroupSizeError ? <p className="errorMessage">!Please select at least 1 group size</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Time Needed (minutes):
                                        <div>
                                            <input name="updateTimeNeeded" type="number" className="form-control halfInput mt-2" value={this.state.updateTimeNeeded} onChange={this.updateFormField} min="0" max="999" />
                                        </div>
                                        {this.state.showTimeNeededError ? <p className="errorMessage">!Please enter an integer from 0 to 999</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Difficulty:
                                        <select className="form-select form-select-sm mt-2" name="updateDifficulty" select={this.state.updateDifficulty} onChange={this.updateFormField}>
                                            {/* <option selected>Select One</option> */}
                                            {this.state.allDifficulty.map(d => (
                                                <React.Fragment>
                                                    <option value={d}>{d}</option>
                                                </React.Fragment>
                                            ))}
                                        </select>
                                        {this.state.showDifficultyError ? <p className="errorMessage">!Please select a difficulty level</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Tags:
                                        <div className="mt-2">
                                            <CreatableSelect
                                                placeholder="Select or create new tag"
                                                isMulti
                                                onChange={this.handleCreatableChange}
                                                options={this.state.allTags}
                                                defaultValue={this.state.preSelectedTags}
                                            />
                                        </div>
                                        {this.state.showTagsError ? <p className="errorMessage">!Please select at least 1 tag</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Materials:
                                        <div>
                                            {this.state.materials.map((element, index) => (
                                                <React.Fragment>
                                                    <div key={index} className="d-flex mt-2">
                                                        <input name="material" type="text" className="form-control dynamicInput" value={element.material} onChange={(e) => this.materialChange(index, e)} />
                                                        <button className="btn btn-sm" onClick={this.addMaterial}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                        </svg></button>
                                                        {this.state.materials.length > 1 && (<button className="btn btn-sm" onClick={(e) => this.removeMaterial(index, e)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                            </svg></button>)}
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        {this.state.showMaterialsError ? <p className="errorMessage">!Please do not leave any field blank</p> : ""}
                                    </div>
                                    <div className="mt-3">
                                        Learning Objectives:
                                        {this.state.learningObjectives.map((element, index) => (
                                            <React.Fragment>
                                                <div key={index} className="d-flex mt-2">
                                                    <input name="learningObjective" type="text" className="form-control dynamicInput" value={element.learningObjective} onChange={(e) => this.learningObjectiveChange(index, e)} />
                                                    <button className="btn btn-sm" onClick={this.addLearningObjective}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                    </svg></button>
                                                    {this.state.learningObjectives.length > 1 && (<button className="btn btn-sm" onClick={() => this.removeLearningObjective(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                    </svg></button>)}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                        {this.state.showLearningObjectivesError ? <p className="errorMessage">!Please do not leave any field blank</p> : ''}
                                    </div>
                                    <div className="mt-3">
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
                                        {this.state.showInstructionsError ? <p className="errorMessage">!Please enter instructions for your activity</p> : ''}
                                    </div>
                                    <div className="mt-3">
                                        Debrief:
                                        <div>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                config={{ placeholder: "Optional" }}
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

                                    <div className="mt-4 mb-4">
                                        <button className="btnSubmit" onClick={this.processUpdate}>Update</button>
                                    </div>

                                </div>

                                <div className="myModal-footer">
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}