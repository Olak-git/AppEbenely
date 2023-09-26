import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './formattingData'

export function getAllCoach(user_id, token) {
    return fetch(ref + 'getAllCoach.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function chooseCoach(user_id, coach_id, token) {
    return fetch(ref + 'chooseCoach.php', writeServer({user_id, coach_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function delFromChooseCoach(user_id, coach_id, token) {
    return fetch(ref + 'delFromChooseCoach.php', writeServer({user_id, coach_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function getCoachById(user_id, coach_id, token) {
    return fetch(ref + 'getCoachById.php', writeServer({user_id, coach_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

export function getAllSelectedCoach(user_id, token) {
    return fetch(ref + 'getAllSelectedCoach.php', writeServer({user_id, token}))
    .then(getResponseJson)
    .catch(getError)
}

