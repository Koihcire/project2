import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
        newTags: [],
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

    updateFormField = (e) => {
        if (e.target.type === "checkbox"){
            let currentValues = this.state[e.target.name];
            let modifiedValues;
            if (!currentValues.includes(e.target.value)){
                modifiedValues = [...currentValues, e.target.value];
            } else {
                modifiedValues = currentValues.filter((element)=>{
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
                            <input name="tags" type="checkbox" className="form-check-input" value={t} checked={this.state.tags.includes(t)} onChange={this.updateFormField}/>
                            <label for="tags" className="form-check-label">{t}</label>
                        </React.Fragment>

                    ))}
                </div>
                <div>
                    <h6>Group Size</h6>
                    {this.state.allGroupSizes.map(g =>(
                        <React.Fragment>
                            <input name="groupSize" type="checkbox" className="form-check-input" value={g} checked={this.state.groupSize.includes(g)} onChange={this.updateFormField}/>
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
                                    Instructions: {t.instructions}
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
                            <h3><input name="newName" type="text" className="form-control-input" value={this.state.newName} onChange={this.updateFormField} placeholder="Activity Name"/></h3>
                            <div className="card-body">
                                <div>
                                    Description: 
                                    <input name="newDescription" type="text" className="form-control-input" value={this.state.newDescription} onChange={this.updateFormField}/>
                                </div>
                                <div>
                                    Tags: 
                                </div>
                                <div>
                                    Group Size: 
                                </div>
                                <div>
                                    Time Needed:  minutes
                                </div>
                                <div>
                                    Materials: 
                                </div>
                                <div>
                                    Learning Objectives: 
                                </div>
                                <div>
                                    Instructions: 
                                </div>
                                <div>
                                    Debrief: 
                                </div>

                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}