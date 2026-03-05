export let eventName = "Campfire" // Used to change the name of the Satellite event across Jumbotron and to make updating the UI between events easier

export function proccessCity(name) {
    name = name.trim();
    if (name == "nyc") {
        return "NYC";
    }
    // Additional special cases can follow; however, I don't think there are others
    else {
        if (name.indexOf("-") == -1) {
            return name.substring(0,1).toUpperCase() + name.substring(1);
        }
        else {
            let rtn = name.substring(0,1).toUpperCase();
            for (let i = 1; i < name.length; i++) {
                if (name.substring(i, i+1) == "-") {
                    rtn += " ";
                    i++;
                    rtn += name.substring(i, i+1).toUpperCase();
                }
                else {
                    rtn += name.substring(i, i+1);
                }
            }
            return rtn;
        }
    }
}

export function proccessEventCity(name) {
    return eventName + " " + proccessCity(name);
}

export async function checkCity(name) {
    let rawData = await fetch("https://raw.githubusercontent.com/lynn89-eefje/jumbotron-events/refs/heads/main/data.json");
    let data = await rawData.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].eventName == name) {
            return true;
        }
    }
    return false;
}