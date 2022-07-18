import React from "react";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CreatableSelect from 'react-select/creatable';
import ProcessAddNew from "./ProcessAddNew";


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

        showProcessAddNew: false
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
                learningObjectives: this.state.newLearningObjectivesArray
            })

        } catch (e) {
            console.log(e)
        }

        this.setState({
            showProcessAddNew: true
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
                        <h3><input name="newName" type="text" className="form-control-input" value={this.state.newName} onChange={this.updateFormField} placeholder="Activity Name" /></h3>
                        <div className="card-body">
                            <div>
                                Created By:
                                <input name="newUserName" type="text" className="form-control-input" value={this.state.newUserName} onChange={this.updateFormField} placeholder="User Name" />
                                <input name="newEmail" type="text" className="form-control-input" value={this.state.newEmail} onChange={this.updateFormField} placeholder="Email" />
                            </div>
                            <div>
                                Description:
                                <input name="newDescription" type="text" className="form-control-input" value={this.state.newDescription} onChange={this.updateFormField} />
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
                            </div>
                            <div>
                                Group Size:
                                {this.state.allGroupSizes.map(g => (
                                    <React.Fragment>
                                        <input name="newGroupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.newGroupSize.includes(g)} onChange={this.updateFormField} />
                                        <label for="groupSize" className="form-check-label">{g}</label>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div>
                                Time Needed: <input name="newTimeNeeded" type="number" className="form-control-input" value={this.state.newTimeNeeded} onChange={this.updateFormField} /> minutes
                            </div>
                            <div>
                                Difficulty:
                                <select className="form-select form-select-sm" name="newDifficulty" onChange={this.updateFormField}>
                                    <option selected>Select One</option>
                                    {this.state.allDifficulty.map(d=>(
                                        <React.Fragment>
                                            <option value={d}>{d}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                            </div>
                            <div>
                                Materials:
                                {this.state.newMaterials.map((element, index) => (
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
                                {this.state.newLearningObjectives.map((element, index) => (
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
                            </div>
                            <div>
                                Debrief:
                                <div>
                                    <CKEditor
                                        editor={ClassicEditor}
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