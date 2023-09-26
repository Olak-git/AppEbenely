export function getResponseJson(response)
{ return response.json() }

export function getResponseText(response)
{ return response.text() }

export function getError(response)
{ console.log(response) }

export function writeServer(data = {})
{ return { method: 'post', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data.token}, body: JSON.stringify(data) } }