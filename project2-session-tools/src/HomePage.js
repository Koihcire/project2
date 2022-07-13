import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from "html-react-parser"


export default class HomePage extends React.Component {

    url = "https://tgc-session-tools.herokuapp.com/"

    state = {
        data: [],
        allUniqueTags: [],
        searchName: "",
        searchRecent: "",
        minTimeNeeded: "",
        maxTimeNeeded: "",
        tags: [],
        groupSize: [],
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

    async componentDidMount() {
        try {
            let response = await axios.get(this.url + "tools")
            this.setState({
                data: response.data.tools
            })
            let allTags = []
            for (let d of this.state.data) {
                for (let tag of d.tags) {
                    // console.log(tag)
                    allTags.push(tag)
                }
            }
            let allUniqueTags = [...new Set(allTags)]
            this.setState({
                allUniqueTags: allUniqueTags
            })

        } catch (e) {
            console.log(e)
        }
    }

    search = async (e) => {
        try {
            let response = await axios.get(this.url + "tools", {
                params: {
                    "name": this.state.searchName,
                    "dateCreated": this.state.searchRecent,
                    "minTimeNeeded": this.state.minTimeNeeded,
                    "maxTimeNeeded": this.state.maxTimeNeeded,
                    "tags": this.state.tags,
                    "groupSize": this.state.groupSize
                }
            }
            )
            this.setState({
                data: response.data.tools
            })
        } catch (e) {
            console.log(e)
        }
    }

    addNewSubmit = async () => {
        try {
            let response = await axios.post(this.url + "add-tool", {
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

            this.setState({
                data: [...this.state.data, newTool]
            })
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
                {/* SEARCH */}
                <div>
                    <input name="searchName" type="text" className="form-control-input" value={this.state.searchName} onChange={this.updateFormField} placeholder="Search by Activity Name" />
                </div>
                <div>
                    <input name="searchRecent" type="checkbox" className="form-check-input" value="true" checked={this.state.searchRecent.includes("true")} onChange={this.updateFormField} />
                    <label for="searchRecent">Recently Added</label>
                </div>
                <div>
                    <input name="minTimeNeeded" type="number" className="form-control.input" value={this.state.minTimeNeeded} onChange={this.updateFormField} placeholder="Min Time in minutes" />
                    <input name="maxTimeNeeded" type="number" className="form-control.input" value={this.state.maxTimeNeeded} onChange={this.updateFormField} placeholder="Max Time in minutes" />
                </div>
                <div>
                    <h6>Tags</h6>
                    {this.state.allUniqueTags.map(t => (
                        <React.Fragment>
                            <input name="tags" type="checkbox" className="form-check-input" value={t} checked={this.state.tags.includes(t)} onChange={this.updateFormField} />
                            <label for="tags" className="form-check-label">{t}</label>
                        </React.Fragment>

                    ))}
                </div>
                <div>
                    <h6>Group Size</h6>
                    {this.state.allGroupSizes.map(g => (
                        <React.Fragment>
                            <input name="groupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.groupSize.includes(g)} onChange={this.updateFormField} />
                            <label for="groupSize" className="form-check-label">{g}</label>
                        </React.Fragment>
                    ))}

                </div>
                <button onClick={this.search}>Search</button>
                {/* SEARCH RESULTS */}
                <h1>Search Results</h1>
                {this.state.data.map(t => (
                    <div className="card">
                        <div className="card-title">
                            <h3>{t.name}</h3>
                            <div className="card-body">
                                <div>
                                    Created By: {t.createdBy}
                                </div>
                                <div>
                                    Date Created: {t.dateCreated}
                                </div>
                                <div>
                                    Description: {t.description}
                                </div>
                                <div>
                                    Likes: {t.likes} *heart*
                                </div>
                                <div>
                                    Tags: {t.tags.map(tags => (
                                        tags
                                    ))}
                                </div>
                                <div>
                                    Group Size: {t.groupSize.map(g => (
                                        g
                                    ))}
                                </div>
                                <div>
                                    Time Needed: {t.timeNeeded} minutes
                                </div>
                                <div>
                                    Materials: {t.materials.map(materials => (
                                        materials
                                    ))}
                                </div>
                                <div>
                                    Learning Objectives: {t.learningObjectives}
                                </div>
                                <div>
                                    Instructions: {parse(t.instructions)}
                                </div>
                                <div>
                                    Debrief: {t.debrief}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
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