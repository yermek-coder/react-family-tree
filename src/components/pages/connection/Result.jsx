import { NavLink, useSearchParams } from "react-router";
import personManager from "@/services/person";
import { useEffect, useState } from "react";
import PersonTree from "@/components/person/Tree";
import { uniqById } from "@/util"
import Loading from "@/components/common/Loading";

export default function ConnectionResult() {
    const [searchParams] = useSearchParams();
    const [persons, setPersons] = useState([]);
    const [error, setError] = useState("");

    async function init() {
        const personsIds = [1, 2].map(idx => searchParams.get("person" + idx)).filter(Boolean);
        const results = await personManager.getAncestor(...personsIds)

        if (results.length) {
            const relatives = await Promise.all(results.map(subarr => subarr.map(async (id, idx, arr) => {
                const nextPerson = arr[idx + 1];
                return { ...(await personManager.getPerson(id)), group: arr.length - idx, parent: nextPerson }
            })).flat())

            setPersons(uniqById(relatives))
        } else {
            setError("Connection not found!")
        }
    }

    useEffect(() => { init() }, []);

    return <div className="container py-5">{error
        ? <div className="w-100 py-5 text-center">
            <div>{error}</div>
            <NavLink to="/connection" className="btn btn-link">Go back</NavLink>
        </div>
        : (persons.length ? <PersonTree persons={persons} /> : <Loading />)}</div>;
}
