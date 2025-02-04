import api from "./api";
import { objectToHttpParams } from "@/util";

class PersonManager {
    #cache = {}

    getPerson(id) {
        return this.#cache[id] || api.get("persons/" + id).then(person => this.#cache[person.id] = person);
    }

    findAll(name) {
        return api.get(`persons/search?name=${encodeURIComponent(name)}`);
    }

    add(person) {
        return api.post("persons", person);
    }

    getAncestor(key1, key2) {
        return api.get(`persons/ancestor2?${objectToHttpParams({ key1, key2 })}`);
    }
}

export default new PersonManager();
