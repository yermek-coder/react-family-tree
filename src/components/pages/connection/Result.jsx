import { useSearchParams } from "react-router"
import personManager from "@/services/person";
import { useEffect, useState } from "react";
import PersonTree from "@/components/person/Tree"

export default function ConnectionResult() {
    const [searchParams] = useSearchParams()
    const [persons, setPersons] = useState([])
    const [ancestors, setAncestors] = useState([])

    const ancestorIds = [1, 2].map(idx => searchParams.get("ancestor" + idx)).filter(Boolean)
    const personsIds = [1, 2].map(idx => searchParams.get("person" + idx)).filter(Boolean)

    useEffect(() => {
        Promise.all(ancestorIds.map(id => personManager.getPerson(id))).then(persons => {
            setAncestors(persons)
        })
        Promise.all(personsIds.map(id => personManager.getPerson(id))).then(persons => {
            setPersons(persons)
        })
    }, [])

    return (<div className="container py-5">
        {(persons.length && ancestors.length) ? <PersonTree persons={persons} ancestors={ancestors} /> : "Loading..."}
    </div>)
}