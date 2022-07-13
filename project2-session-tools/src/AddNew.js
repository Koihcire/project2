import React from "react";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class AddNew extends React.Component {
    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        allGroupSizes: ["small", "medium", "large"],
        newName: "",
        newDescription: "",
        newTags: [{
            tag: ""
        }],
        newTagsArray: [],
        newGroupSize: [],
        newTimeNeeded: "",
        newMaterials: [{
            material: ""
        }],
        newMaterialsArray: [],
        newLearningObjectives: [{
            learningObjective: ""
        }],
        newLearningObjectivesArray: [],
        newInstructionsData: "",
        newDebriefData: ""

    }

    addNewSubmit = async () => {
        try {
            await axios.post(this.url + "add-tool", {
                name: this.state.newName,
                description: this.state.newDescription,
                tags: this.state.newTagsArray,
                groupSize: this.state.newGroupSize,
                materials: this.state.newMaterialsArray,
                instructions: this.state.newInstructionsData,
                debrief: this.state.newDebriefData
            })

            const newTool = {
                name: this.state.newName,
                description: this.state.newDescription,
                tags: this.state.newTagsArray,
                groupSize: this.state.newGroupSize,
                materials: this.state.newMaterialsArray,
                instructions: this.state.newInstructionsData,
                debrief: this.state.newDebriefData
            }

            // this.setState({
            //     data: [...this.state.data, newTool]
            // })
        } catch (e) {
            console.log(e)
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

    addTag = () => {
        let _tags = [...this.state.newTags]
        _tags.push({
            tag: ""
        })
        this.setState({
            newTags: _tags
        })

        // set inviteMembersArray
        let _newTagsArray = [];
        for (let m of this.state.newTags) {
            _newTagsArray.push(m.tag)
        }
        this.setState({
            newTagsArray: _newTagsArray
        })
    }

    addMaterial = () => {
        let _materials = [...this.state.newMaterials]
        _materials.push({
            material: ""
        })
        this.setState({
            newMaterials: _materials
        })

        // set inviteMembersArray
        let _newMaterialsArray = [];
        for (let m of this.state.newMaterials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray
        })
    }

    addLearningObjective = () => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        _learningObjectives.push({
            learningObjective: ""
        })
        this.setState({
            newLearningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of this.state.newLearningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray
        })
    }

    removeTag = (index) => {
        let _tags = [...this.state.newTags]
        // _tags = _tags.filter(tag=> tag === tag[index])
        _tags.splice(index, 1)
        this.setState({
            newTags: _tags
        })

        // set inviteMembersArray
        let _newTagsArray = [];
        for (let m of this.state.newTags) {
            _newTagsArray.push(m.tag)
        }
        this.setState({
            newTagsArray: _newTagsArray
        })
    }

    removeMaterial = (index) => {
        let _materials = [...this.state.newMaterials]
        // _tags = _tags.filter(tag=> tag === tag[index])
        _materials.splice(index, 1)
        this.setState({
            newMaterials: _materials
        })

        // set inviteMembersArray
        let _newMaterialsArray = [];
        for (let m of this.state.newMaterials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray
        })
    }

    removeLearningObjective = (index) => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        // _tags = _tags.filter(tag=> tag === tag[index])
        _learningObjectives.splice(index, 1)
        this.setState({
            newLearningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of this.state.newLearningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray
        })
    }

    tagChange = (index, e) => {
        let _tags = [...this.state.newTags]
        _tags[index][e.target.name] = e.target.value
        this.setState({
            tags: _tags
        })

        // set inviteMembersArray
        let _newTagsArray = [];
        for (let m of this.state.newTags) {
            _newTagsArray.push(m.tag)
        }
        this.setState({
            newTagsArray: _newTagsArray
        })
    }

    materialChange = (index, e) => {
        let _materials = [...this.state.newMaterials]
        _materials[index][e.target.name] = e.target.value
        this.setState({
            newMaterials: _materials
        })

        // set inviteMembersArray
        let _newMaterialsArray = [];
        for (let m of this.state.newMaterials) {
            _newMaterialsArray.push(m.material)
        }
        this.setState({
            newMaterialsArray: _newMaterialsArray
        })
    }

    learningObjectiveChange = (index, e) => {
        let _learningObjectives = [...this.state.newLearningObjectives]
        _learningObjectives[index][e.target.name] = e.target.value
        this.setState({
            newLearningObjectives: _learningObjectives
        })

        // set inviteMembersArray
        let _newLearningObjectivesArray = [];
        for (let m of this.state.newLearningObjectives) {
            _newLearningObjectivesArray.push(m.learningObjective)
        }
        this.setState({
            newLearningObjectivesArray: _newLearningObjectivesArray
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
                                Description:
                                <input name="newDescription" type="text" className="form-control-input" value={this.state.newDescription} onChange={this.updateFormField} />
                            </div>
                            <div>
                                Tags:
                                {this.state.newTags.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <label>Tags</label>
                                            <input name="tag" type="text" value={element.tag} onChange={(e) => this.tagChange(index, e)} />
                                        </div>
                                        <button onClick={this.addTag}>Add New</button>
                                        <button onClick={() => this.removeTag(index)}>Remove</button>
                                    </React.Fragment>
                                ))}
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
                                Materials:
                                {this.state.newMaterials.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <label>Tags</label>
                                            <input name="material" type="text" value={element.material} onChange={(e) => this.materialChange(index, e)} />
                                        </div>
                                        <button onClick={this.addMaterial}>Add New</button>
                                        <button onClick={() => this.removeMaterial(index)}>Remove</button>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div>
                                Learning Objectives:
                                {this.state.newLearningObjectives.map((element, index) => (
                                    <React.Fragment>
                                        <div key={index}>
                                            <label>Tags</label>
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
                                    <h2>Using CKEditor 5 for Instructions</h2>
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
                                    <h2>Using CKEditor 5 for Debrief</h2>
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
            </React.Fragment>
        )
    }
}