export const extractCustomAttributes = (templateBody) => {
    const regex = /{{([^{}]*)}}/g; // Expresión regular para encontrar contenido entre {{ y }}
    const matches = templateBody.match(regex);
    if (matches) {
      return matches.map(match => match.substring(2, match.length - 2)); // Elimina los corchetes
    } else {
      return [];
    }
  }
  
  export const getTemplateWithSubtitutions = (atributesBody, atributesTemplate, body) => {
    atributesBody.map((item) => {
      const nameAttr = `Attributes.${item.name}`;
      const attr = atributesTemplate.find(a => a === nameAttr);
      if (attr) {
        body = body.replace(`{{${attr}}}`, item.value);
      }
    })
    return body;
  }

  export const formatSubstitutions = (attributes) => {
    // Convertir los atributos en un formato adecuado para Substitutions
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