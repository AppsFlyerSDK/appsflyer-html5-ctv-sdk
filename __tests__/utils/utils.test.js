import {isVersionGreaterThanOrEqualTo} from "../../src/platforms/utils/utils.js"

const MINIMUM_OS_VERSION_SUPPORTED = "4.0.0"
let falseDataSet = ["1.0.0", "1.0", "2.0", "3.99", "3.9", "0", "0.0", null, undefined, "", 0,  2]
let trueDataSet = ["4", "4.0.0", "4.1", "4.0.1", "5", "5.0", "5.0.0", 4, 4.1, 5, 5.5, 44]


it.each(falseDataSet)("false response for isVersionGreaterThanOrEqualTo", async (version) => {
    console.log(version)
    expect(isVersionGreaterThanOrEqualTo(version, MINIMUM_OS_VERSION_SUPPORTED)).toEqual(false);
})

it.each(trueDataSet)("true response for isVersionGreaterThanOrEqualTo", async (version) => {
    console.log(version)
    expect(isVersionGreaterThanOrEqualTo(version, MINIMUM_OS_VERSION_SUPPORTED)).toEqual(true);
})



