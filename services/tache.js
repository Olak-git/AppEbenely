import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './formattingData'

export function getTaches(user_id, token) {
    return fetch(ref + 'getTaches.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}