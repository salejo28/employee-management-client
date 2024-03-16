import { equalsCheck } from "./array";

export function getModifiedFields(original, modified) {
  const lastModified = {};

  Object.keys(original).forEach((key) => {
    const originalValue = original[key];
    const modifiedValue = modified[key];
    if (modifiedValue) {
      if (Array.isArray(modifiedValue) && Array.isArray(originalValue)) {
        if (!equalsCheck(modifiedValue, originalValue)) {
          lastModified[key] = modifiedValue;
        }
      } else {
        if (originalValue instanceof Date || modifiedValue instanceof Date) {
          if (new Date(originalValue).getTime() !== new Date(modifiedValue).getTime()) {
            lastModified[key] = new Date(modifiedValue)
          }
        } else {
          if (
            originalValue.toString().toLowerCase() !==
            modifiedValue.toString().toLowerCase()
          ) {
            lastModified[key] = key.includes("id")
              ? +modifiedValue
              : modifiedValue;
          }
        }
        
      }
    }
  });

  return lastModified;
}
