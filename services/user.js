import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './formattingData'

export function registration(pseudo, nom, prenom, date_naissance, email, ville, description, situation_couple, password, lien_img) {
    return fetch(ref + 'registration.php', writeServer({pseudo, nom, prenom, date_naissance, email, ville, description, situation_couple, password, lien_img}))
    .then(getResponseJson)
    .catch(getError)
}

export function login(pseudo, pwd) {
    return fetch(ref + 'login.php', writeServer({pseudo, pwd}))
    .then(getResponseJson)
    .catch(getError)
}

export function getUsers(user_id, token) {
    return fetch(ref + 'getUsers.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function getAmourContacts(user_id, token) {
    console.log({user_id, token});
    return fetch(ref + 'getAmourContacts.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function saveReaction(receveur_id, auth_id, type, token) {
    return fetch(ref + 'saveLike.php', writeServer({receveur_id, auth_id, type, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function updateReaction(receveur_id, auth_id, old_type, type, token) {
    return fetch(ref + 'updateReaction.php', writeServer({receveur_id, auth_id, old_type, type, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function updateProfile(user_id, field, value, token) {
    return fetch(ref + 'updateProfile.php', writeServer({user_id, field, value, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function deleteReaction(receveur_id, auth_id, type, token) {
    return fetch(ref + 'delLike.php', writeServer({receveur_id, auth_id, type, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function getReactions(user_id, token) {
    return fetch(ref + 'getReactions.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}
