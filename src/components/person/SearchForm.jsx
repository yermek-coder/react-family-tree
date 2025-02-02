import { useEffect, useState } from "react"
import personManager from "@/services/person";

export default function SearchForm() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [persons, setPersons] = useState([])

    function submit(e) {
        e.preventDefault()
        if (name) {
            setLoading(true)
            personManager.findAll(name).then(items => {
                setPersons(items || [])
                setLoading(false)
            })
        }
    }

    function formatDate(date) {
        return (date && new Date(date).toLocaleDateString(navigator.language, { day: "2-digit", month: "short", year: "numeric" })) || ""
    }

    return (
        <form onSubmit={submit}>
            <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name:</label>
                <div className="col-sm-10">
                    <div className="d-flex gap-3 align-items-center">
                        <input value={name} onChange={(e) => setName(e.target.value.trimStart())} type="text" className="form-control" id="inputName" required />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </div>

            <ul className="list-group">
                {!loading && (persons.length ? persons.map(person => (
                    <li key={person.id} className="list-group-item d-flex align-center justify-content-between"><span>{person.name}</span><span>{formatDate(person?.dob)}</span></li>
                )) : <div className="py-5 text-center text-secondary nothing-found">Nothing found</div>)}
            </ul>

            {loading && <div className="loading d-flex align-items-center justify-content-center rounded py-5">
                <div className="text-center">
                    <div>
                        <div className="spinner-border text-primary"></div>
                    </div>
                </div>
            </div>}
        </form>
    )
}