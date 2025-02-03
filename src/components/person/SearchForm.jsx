import { useState } from "react"
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
            <table className="w-100 table-bordered">
                <thead>
                    <tr>
                        <th className="p-2">
                            Name:
                        </th>
                        <th>
                            <input value={name} onChange={(e) => setName(e.target.value.trimStart())} type="text" className="w-100 h-100 py-2 border-0 bg-body" required />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <tr>
                            <td colSpan={2}>
                                <div className="loading d-flex align-items-center justify-content-center rounded py-5">
                                    <div className="text-center">
                                        <div>
                                            <div className="spinner-border text-primary"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        : persons.map(person => (
                            <tr key={person.id}>
                                <td className="p-2">{person.name}</td>
                                <td className="p-2">{formatDate(person?.dob)}</td>
                            </tr>
                        ))}
                    <tr>
                        <td colSpan={2} className="p-2">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}