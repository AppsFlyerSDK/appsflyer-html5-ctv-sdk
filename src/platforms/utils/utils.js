export const isVersionGreaterThanOrEqualTo = (versionA, versionB) => {
  const normalizeVersion = (v) => v.split('.').map(part => parseInt(part, 10)); // Normalize version string

  const partsA = normalizeVersion(versionA);
  const partsB = normalizeVersion(versionB);

  const maxLength = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < maxLength; i++) {
      const partA = partsA[i] || 0; // Use 0 if no more parts in version
      const partB = partsB[i] || 0; // Use 0 if no more parts in version

      if (partA > partB) {
          return true;
      } else if (partA < partB) {
          return false;
      }
  }

  return true; // Versions are equal
};