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