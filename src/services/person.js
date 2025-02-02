import api from "./api"
import { objectToHttpParams } from "@/util"

class PersonManager {
    getPerson(id) {
        return api.get("persons/" + id)
    }

    findAll(name) {
        return api.get(`persons/search?name=${encodeURIComponent(name)}`)
    }

    add(person) {
        return api.post("persons", person)
    }

    getAncestor(key1, key2) {
        return api.get(`persons/ancestor?${objectToHttpParams({ key1, key2 })}`)
    }
}

export default new PersonManager()