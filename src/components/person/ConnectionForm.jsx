import { useState } from "react";
import PersonPicker from "./Picker";
import personManager from "@/services/person";
import { useNavigate } from "react-router";
import { objectToHttpParams } from "@/util"

export default function ConnectionForm() {
    const [person1, setPerson1] = useState(null)
    const [person2, setPerson2] = useState(null)
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    async function submit(e) {
        e.preventDefault();
        if (validate()) {
            e.preventDefault()
            const results = await personManager.getAncestor(person1.id, person2.id)
            const ancestors = Object.fromEntries(results.filter(Boolean).map((id, idx) => ["ancestor" + (idx + 1), id]))
            if (Object.keys(ancestors).length) {
                navigate(`/connection/result?${objectToHttpParams({ ...ancestors, person1: person1.id, person2: person2.id })}`)
            } else {
                setErrors({ ...errors, notFound: "No Ancestor Found" })
            }
        }
    }

    function validate() {
        const newErrors = { ...errors }
        if (!person1) {
            newErrors.person1 = "Pick First Person"
        }
        if (!person2) {
            newErrors.person2 = "Pick Second Person"
        }
        setErrors(newErrors)
        return !Object.keys(newErrors).length
    }

    return (
        <form onSubmit={submit} onChange={() => setErrors({})}>
            <div className="row mb-3">
                <label htmlFor="inputPerson1" className="col-sm-2 col-form-label">Family Member 1:</label>
                <div className="col-sm-10">
                    <div className="input-group w-100">
                        <PersonPicker id="inputPerson1" value={person1} onChange={setPerson1} exclude={[person2].filter(Boolean)} error={errors.person1} className="w-100" />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPerson2" className="col-sm-2 col-form-label">Family Member 2:</label>
                <div className="col-sm-10">
                    <div className="input-group w-100">
                        <PersonPicker id="inputPerson2" value={person2} onChange={setPerson2} exclude={[person1].filter(Boolean)} error={errors.person2} className="w-100" />
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary" type="submit">Find</button>
                {errors.notFound && <div className="text-danger">{errors.notFound}</div>}
            </div>
        </form>
    )
}