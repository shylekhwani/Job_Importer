import { parseStringPromise } from "xml2js";

export const parseXML = async (xml) => {
  return parseStringPromise(xml, {
    explicitArray: false,
    trim: true,
    strict: false,
    normalizeTags: true,
    normalize: true,
    ignoreAttrs: false,
    attrkey: "attributes",
    charkey: "value",
  });
};
