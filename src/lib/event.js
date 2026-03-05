export let eventName = "Campfire"

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