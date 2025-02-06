import { useEffect, useState } from "react";
import personManager from "@/services/person";
import Icon from "@/components/common/Icon"
import { debounce } from "@/util"

export default function PersonPicker({ id, value, onChange, exclude, className, error }) {
    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");

    const fetchPersons = debounce((searchName) => {
        personManager.findAll(searchName).then(items => {
            if (items) {
                const exludeIds = exclude.map(el => el.id)
                setPersons(items.filter(item => !exludeIds.includes(item.id)))
            } else {
                setPersons([])
            }
        })
    }, 250)

    useEffect(() => {
        name && fetchPersons(name)
    }, [name])

    function pickPerson(person) {
        setPersons([])
        setName("")
        onChange(person)
    }

    function reset() {
        onChange(null)
        setName("")
    }

    return (
        <div className={`dropdown ${className}`}>
            {value ? <div className="form-control d-flex align-center justify-content-between gap-2">
                <div>
                    <span>{value.name}, </span>
                    <span>ID: {value.id}</span>
                </div>
                <button onClick={reset} className="btn btn-outline-secondary btn-sm border-0 px-2 py-0">
                    <Icon icon="x-circle" />
                </button>
            </div> : <input value={name} onInput={(e) => setName(e.target.value.trimStart())} type="text" id={id} className={`form-control ${error && 'is-invalid'}`} />}
            {error && <div className="invalid-feedback">{error}</div>}

            <ul className={`dropdown-menu ${name && persons.length ? "show" : ""}`}>
                {name && persons.length && persons.map(person => (
                    <li key={person.id}><a onClick={() => pickPerson(person)} className="dropdown-item d-flex gap-2 align-items-center" href="#">
                        <span>{person.name}, </span>
                        <span>ID: {person.id}</span>
                    </a></li>
                ))}
            </ul>
        </div>
    )
}