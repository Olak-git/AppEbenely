import { HOST, PRODUCTION } from "../constants/data"

const ref = PRODUCTION ? "https://ebenely.project.utechaway.com/api_ebenely/" : `${HOST}/projects/ebenely/api_ebenely/`;

export default ref