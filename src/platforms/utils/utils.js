export const isVersionGreaterThanOrEqualTo = (versionA, versionB) => {
    const isValidVersion = (version) => {
        return version !== null && version !== undefined && version !== "";
    };

    if (!isValidVersion(versionA)) {
        return false;
    }

    const normalizeVersion = (v) => v.split('.').map(part => parseInt(part, 10)); // Normalize version string

    const compareVersions = (partsA, partsB) => {
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

    const partsA = normalizeVersion(typeof versionA === 'number' ? versionA.toString() : versionA);
    const partsB = normalizeVersion(versionB);

    return compareVersions(partsA, partsB);
};