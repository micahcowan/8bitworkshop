import { byteArrayToString, stringToByteArray } from "../../common/util";
import { WorkerFileUpdate, isErrorResult, isOutputResult, isUnchanged } from "../../common/workertypes";
import { BuildStep, BuildStepResult, gatherFiles, staleFiles, store } from "../workermain";

// TODO: are we running from 8bitworkshop.com in this worker?
const REMOTE_URL = "http://localhost:3009/build";

// create random UID
const sessionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export async function buildRemote(step: BuildStep): Promise<BuildStepResult> {
    gatherFiles(step); // TODO?
    var binpath = "a.out"; // TODO?
    if (staleFiles(step, [binpath])) {
        // grab files from store
        let updates : WorkerFileUpdate[] = [];
        for (var i = 0; i < step.files.length; i++) {
            let path = step.files[i];
            let entry = store.workfs[path];
            // convert to base64
            let data = typeof entry.data === 'string' ? entry.data : btoa(byteArrayToString(entry.data));
            updates.push({ path, data });
        }
        // build the command
        let cmd = { buildStep: step, updates, sessionID };
        // do a POST to the remote server, sending step as JSON
        console.log('POST', cmd);
        let result = await fetch(REMOTE_URL, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(cmd),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // return the result as JSON
        let json = await result.json();
        // parse the result as JSON
        if (isUnchanged(json)) return json;
        if (isErrorResult(json)) return json;
        if (isOutputResult(json)) {
            json.output = stringToByteArray(atob(json.output));
            return json;
        }
        throw new Error(`Unexpected result from remote build: ${JSON.stringify(json)}`);
    }
}
