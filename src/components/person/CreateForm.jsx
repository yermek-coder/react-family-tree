import { useState } from "react";
import PersonPicker from "./Picker";
import personManager from "@/services/person";

export default function CreateForm() {
    const [mother, setMother] = useState("")
    const [father, setFather] = useState("")
    const [dob, setDob] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    async function submit(e) {
        e.preventDefault()
        await personManager.add({ name, father_id: father, mother_id: mother, dob })
        setMessage("Created Successfully!")
        setName("")
        setDob("")
        setFather(null)
        setMother(null)
    }

    return (
        <form onSubmit={submit} onChange={() => message && setMessage("")}>
            <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name:</label>
                <div className="col-sm-10">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="inputName" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputDoB" className="col-sm-2 col-form-label">DoB:</label>
                <div className="col-sm-10">
                    <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className="form-control" id="inputDoB" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputFather" className="col-sm-2 col-form-label">Father ID:</label>
                <div className="col-sm-10">
                    <input id="inputFather" value={father} onChange={(e) => setFather(e.target.value)} className="form-control" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputMother" className="col-sm-2 col-form-label">Mother ID:</label>
                <div className="col-sm-10">
                    <input id="inputMother" value={mother} onChange={(e) => setMother(e.target.value)} className="form-control" />
                </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
                <button className="btn btn-primary" type="submit">Add</button>
                {message && <div className="text-info">{message}</div>}
            </div>
        </form>
    )
}