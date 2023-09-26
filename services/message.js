import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './formattingData'

export function getCoachMessages(users_id, destinataire_id, token) {
    return fetch(ref + 'getCoachMessages.php', writeServer({users_id, destinataire_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function saveCoachMessage(author_id, contenu, destinataire_id, type_author, token) {
    return fetch(ref + 'saveCoachMessage.php', writeServer({author_id, contenu, destinataire_id, type_author, token}))
    .then(getResponseText)
    .catch(getError)
}

export function getMessages(users_id, destinataire_id, token) {
    return fetch(ref + 'getMessages.php', writeServer({users_id, destinataire_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function saveMessage(author_id, contenu, destinataire_id, token) {
    return fetch(ref + 'saveMessage.php', writeServer({author_id, contenu, destinataire_id, token}))
    .then(getResponseText)
    .catch(getError)
}