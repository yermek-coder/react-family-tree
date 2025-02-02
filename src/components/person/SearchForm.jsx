import { useEffect, useState } from "react"
import personManager from "@/services/person";

export default function SearchForm() {
    const [name, setName] = useState("")
    const [persons, setPersons] = useState([])

    useEffect(() => submit(), [name])

    function submit() {
        if (name) {
            personManager.findAll(name).then(items => {
                setPersons(items || [])
            })
        }
    }

    function formatDate(date) {
        return (date && new Date(date).toLocaleDateString(navigator.language, { day: "2-digit", month: "short", year: "numeric" })) || ""
    }

    return (
        <div onChange={submit}>
            <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name:</label>
                <div className="col-sm-10">
                    <input value={name} onChange={(e) => setName(e.target.value.trimStart())} type="text" className="form-control" id="inputName" required />
                </div>
            </div>

            <ul className="list-group">
                {name && persons.map(person => (
                    <li key={person.id} className="list-group-item d-flex align-center justify-content-between"><span>{person.name}</span><span>{formatDate(person?.dob)}</span></li>
                ))}
            </ul>
        </div>
    )
}