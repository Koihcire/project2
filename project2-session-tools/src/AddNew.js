import React from "react";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CreatableSelect from 'react-select/creatable';
import ProcessAddNew from "./ProcessAddNew";
import "bootstrap/dist/css/bootstrap.min.css"


export default class AddNew extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        tagsData: [],
        allGroupSizes: ["Small", "Medium", "Large"],
        allDifficulty: ["Easy", "Medium", "Hard"],
        newName: "",
        newDescription: "",
        // newTagsData: [],
        newTagsArray: [],
        newGroupSize: [],
        newTimeNeeded: "",
        newDifficulty: "",
        newMaterials: [{
            material: ""
        }],
        newMaterialsArray: [],
        newLearningObjectives: [{
            learningObjective: ""
        }],
        newLearningObjectivesArray: [],
        newInstructionsData: "",
        newDebriefData: "",
        newUserName: "",
        newEmail: "",

        showProcessAddNew: false,

        showNameError: false,
        showUserNameError: false,
        showEmailError: false,
        showDescriptionError: false,
        showTagsError: false,
        showGroupSizeError: false,
        showTimeNeededError: false,
        showDifficultyError: false,
        showMaterialsError: false,
        showLearningObjectivesError: false,
        showInstructionsError: false
        // showDebriefError: false
    }

    closeProcessAddNew = () => {
        this.setState({
            showProcessAddNew: false
        })

        this.props.changePage()
    }

    async componentDidMount() {
        try {
            let response = await axios.get(this.url + "tags")
            let responseData = response.data.tags

            let allTags = []
            for (let t of responseData) {
                for (let tag of t.tags) {
                    // console.log(tag)
                    allTags.push(tag)
                }
            }

            let allUniqueTags = [...new Set(allTags)]
            let tagsData = []
            for (let i = 0; i < allUniqueTags.length; i++) {
                let temp = {
                    label: allUniqueTags[i],
                    value: i + 1
                }
                tagsData.push(temp)
            }

            this.setState({
                tagsData: tagsData
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleCreatableChange = (selectedOptions) => {
        // console.log("selected =>" + selectedOptions)
        let temp = []
        for (let o of selectedOptions) {
            temp.push(o.label)
        }
        console.log("temp" + temp)
        this.setState({
            newTagsArray: temp
        })
    }

    addNewSubmit = async () => {
        //check for name error
        if (!this.state.newName || this.state.newName.length > 100) {
            await this.setState({
                showNameError: true
            })
        } else {
            await this.setState({
                showNameError: false
            })
        }

        //check for username error
        if (!this.state.newUserName || this.state.newUserName.length > 100) {
            await this.setState({
                showUserNameError: true
            })
        } else {
            await this.setState({
                showUserNameError: false
            })
        }

        //check for email error
        if ((!this.state.newEmail.includes("@") && !this.state.newEmail.includes(".")) || !this.state.newEmail) {
            await this.setState({
                showEmailError: true
            })
        } else {
            await this.setState({
                showEmailError: false
            })
        }

        //check for description error
        if (!this.state.newDescription || this.state.newDescription.length > 300) {
            await this.setState({
                showDescriptionError: true
            })
        } else {
            await this.setState({
                showDescriptionError: false
            })
        }

        //check for tags error
        if (!this.state.newTagsArray.length) {
            await this.setState({
                showTagsError: true
            })
        } else {
            await this.setState({
                showTagsError: false
            })
        }

        //check for group size error
        if (!this.state.newGroupSize.length) {
            await this.setState({
                showGroupSizeError: true
            })
        } else {
            await this.setState({
                showGroupSizeError: false
            })
        }

        //check for time needed error
        if (!this.state.newTimeNeeded || this.state.newTimeNeeded < 0 || this.state.newTimeNeeded > 999) {
            await this.setState({
                showTimeNeededError: true
            })
        } else {
            await this.setState({
                showTimeNeededError: false
            })
        }

        //check difficulty error
        if (!this.state.newDifficulty) {
            await this.setState({
                showDifficultyError: true
            })
        } else {
            await this.setState({
                showDifficultyError: false
            })
        }

        //check for materials error
        if (!this.state.newMaterialsArray.length) {
            await this.setState({
                showMaterialsError: true
            })
        } else {
            await this.setState({
                showMaterialsError: false
            })
        }

        //check for learning objectives error
        if (!this.state.newLearningObjectivesArray.length) {
            await this.setState({
                showLearningObjectivesError: true
            })
        } else {
            await this.setState({
                showLearningObjectivesError: false
            })
        }

        //check for instructions error
        if (!this.state.newInstructionsData) {
            await this.setState({
                showInstructionsError: true
            })
        } else {
            await this.setState({
                showInstructionsError: false
            })
        }

        if (!this.state.showNameError && !this.state.showUserNameError && !this.state.showEmailError && !this.state.showDescriptionError && !this.state.showTagsError && !this.state.showGroupSizeError && !this.state.showTimeNeededError && !this.state.showDifficultyError && !this.state.showMaterialsError && !this.state.showLearningObjectivesError && !this.state.showInstructionsError) {
            // set the newmaterialsarray
            let createdBy = {
                userName: this.state.newUserName,
                email: this.state.newEmail
            }
            try {
                await axios.post(this.url + "add-tool", {
                    name: this.state.newName,
                    description: this.state.newDescription,
                    tags: this.state.newTagsArray,
                    groupSize: this.state.newGroupSize,
                    materials: this.state.newMaterialsArray,
                    instructions: this.state.newInstructionsData,
                    debrief: this.state.newDebriefData,
                    timeNeeded: this.state.newTimeNeeded,
                    createdBy: createdBy,
                    learningObjectives: this.state.newLearningObjectivesArray,
                    difficulty: this.state.newDifficulty
                })

            } catch (e) {
                console.log(e)
            }

            this.setState({
                showProcessAddNew: true
            })
        }
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
        let _materials = [...this.state.newMaterials]
        _materials.push({
            material: ""
        })
        // this.setState({
        //     newMaterials: _materials
        // })

        // set inviteMembersArray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray,
            newMaterials: _materials
        })
    }

    removeMaterial = (index, e) => {
        let _materials = [...this.state.newMaterials]

        _materials.splice(index, 1)
        // this.setState({
        //     newMaterials: _materials
        // })
        // console.log(this.state.newMaterials)

        // reset the new materials array
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray,
            newMaterials: _materials
        })
    }

    materialChange = (index, e) => {
        let _materials = [...this.state.newMaterials]
        _materials[index][e.target.name] = e.target.value
        // this.setState({
        //     newMaterials: _materials
        // })

        // set inviteMembersArray
        let _newMaterialsArray = [];
        for (let m of _materials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray,
            newMaterials: _materials
        })
    }

    addLearningObjective = () => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        _learningObjectives.push({
            learningObjective: ""
        })
        // this.setState({
        //     newLearningObjectives: _learningObjectives
        // })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray,
            newLearningObjectives: _learningObjectives
        })
    }

    removeLearningObjective = (index) => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        // _tags = _tags.filter(tag=> tag === tag[index])
        _learningObjectives.splice(index, 1)
        // this.setState({
        //     newLearningObjectives: _learningObjectives
        // })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray,
            newLearningObjectives: _learningObjectives
        })
    }

    learningObjectiveChange = (index, e) => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        _learningObjectives[index][e.target.name] = e.target.value
        // this.setState({
        //     newLearningObjectives: _learningObjectives
        // })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of _learningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray,
            newLearningObjectives: _learningObjectives
        })
    }

    render() {
        return (
            <React.Fragment>
                {/* ADD NEW ENTRY */}
                <h1>Add New</h1>
                <div className="card">
                    <div className="card-title">
                        <h3>Name</h3>
                        <input name="newName" type="text" className="form-control" value={this.state.newName} onChange={this.updateFormField} placeholder="Activity Name" />
                        {this.state.showNameError ? <p>Name error</p> : ""}
                        <div className="card-body">
                            <div>
                                Created By:
                                <div>
                                    <input name="newUserName" type="text" className="form-control" value={this.state.newUserName} onChange={this.updateFormField} placeholder="User Name" />
                                    {this.state.showUserNameError ? <p>Username error</p> : ""}
                                </div>
                                <div>
                                    <input name="newEmail" type="text" className="form-control" value={this.state.newEmail} onChange={this.updateFormField} placeholder="Email" />
                                    {this.state.showEmailError ? <p>Email error</p> : ""}
                                </div>
                            </div>
                            <div>
                                Description:
                                <div>
                                    <textarea rows={4} name="newDescription" type="text" className="form-control" value={this.state.newDescription} onChange={this.updateFormField} placeholder="Brief description of the activity" />
                                    {this.state.showDescriptionError ? <p>Description error</p> : ""}
                                </div>
                                {/* <input name="newDescription" type="text" className="form-control-input" value={this.state.newDescription} onChange={this.updateFormField} /> */}
                            </div>
                            <div>
                                Tags:
                                {/* {this.state.newTags.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <label>Tags</label>
                                            <input name="tag" type="text" value={element.tag} onChange={(e) => this.tagChange(index, e)} />
                                        </div>
                                        <button onClick={this.addTag}>Add New</button>
                                        <button onClick={() => this.removeTag(index)}>Remove</button>
                                    </React.Fragment>
                                ))} */}
                                <React.Fragment>
                                    <CreatableSelect
                                        placeholder="Select or create new tag"
                                        isMulti
                                        onChange={this.handleCreatableChange}
                                        options={this.state.tagsData}
                                    />
                                </React.Fragment>
                                {this.state.showTagsError ? <p>Tags Error</p> : ""}
                            </div>
                            <div>
                                Group Size:
                                {this.state.allGroupSizes.map(g => (
                                    <React.Fragment>
                                        <input name="newGroupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.newGroupSize.includes(g)} onChange={this.updateFormField} />
                                        <label for="groupSize" className="form-check-label">{g}</label>
                                    </React.Fragment>
                                ))}
                                {this.state.showGroupSizeError ? <p>Group size error</p> : ""}
                            </div>
                            <div>
                                Time Needed: <input name="newTimeNeeded" type="number" className="form-control-input" value={this.state.newTimeNeeded} onChange={this.updateFormField} min="0" max="999" /> minutes
                                {this.state.showTimeNeededError ? <p>Time Error</p> : ""}
                            </div>
                            <div>
                                Difficulty:
                                <select className="form-select form-select-sm" name="newDifficulty" onChange={this.updateFormField}>
                                    <option selected>Select One</option>
                                    {this.state.allDifficulty.map(d => (
                                        <React.Fragment>
                                            <option value={d}>{d}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                                {this.state.showDifficultyError ? <p>Difficulty error</p> : ""}
                            </div>
                            <div>
                                Materials:
                                {this.state.newMaterials.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <input name="material" type="text" className="form-control" value={element.material} onChange={(e) => this.materialChange(index, e)} />
                                        </div>
                                        <button onClick={this.addMaterial}>Add New</button>
                                        {this.state.newMaterials.length > 1 && (<button onClick={(e) => this.removeMaterial(index, e)}>Remove</button>)}
                                        {/* <button onClick={(e) => this.removeMaterial(index, e)}>Remove</button> */}
                                    </React.Fragment>
                                ))}
                                {this.state.showMaterialsError ? <p>Materials Error</p> : ""}
                            </div>
                            <div>
                                Learning Objectives:
                                {this.state.newLearningObjectives.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <input name="learningObjective" type="text" className="form-control" value={element.learningObjective} onChange={(e) => this.learningObjectiveChange(index, e)} />
                                        </div>
                                        <button onClick={this.addLearningObjective}>Add New</button>
                                        {this.state.newLearningObjectives.length > 1 && (<button onClick={() => this.removeLearningObjective(index)}>Remove</button>)}
                                        {/* <button onClick={() => this.removeLearningObjective(index)}>Remove</button> */}
                                    </React.Fragment>
                                ))}
                                {this.state.showLearningObjectivesError ? <p>Learning Objectives Error</p> : ''}
                            </div>
                            <div>
                                Instructions:
                                <div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={this.state.newInstructionsData}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                            this.setState({
                                                newInstructionsData: data
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
                                {this.state.showInstructionsError ? <p>Instructions error</p> : ''}
                            </div>
                            <div>
                                Debrief:
                                <div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{placeholder: "Optional"}}
                                        data={this.state.newDebriefData}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                            this.setState({
                                                newDebriefData: data
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
                    </div>
                </div>
                <button onClick={this.addNewSubmit}>Submit</button>
                <ProcessAddNew showProcessAddNew={this.state.showProcessAddNew}
                    closeProcessAddNew={this.closeProcessAddNew} />
            </React.Fragment>
        )
    }
}