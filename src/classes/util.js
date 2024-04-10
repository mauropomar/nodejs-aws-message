  export const getFormatSubstitutionsApiRest = (attributes) => {
    const substitutions = {};
    for (const key in attributes) {
        if (Array.isArray(attributes[key])) {
            substitutions[key] = attributes[key]; 
        } else {
            substitutions[key] = [attributes[key].toString()];
        }
    }
    return substitutions;
};