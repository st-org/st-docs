function stringToId(string) {
    return Array.from(string.slice(0, 100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase()
}
const baseId = stringToId(typeof unit.options.id === 'string' ? unit.options.id : stdnToInlinePlainString(unit.children))
const count = baseIdToCount[baseId] = (baseIdToCount[baseId] ?? 0) + 1
const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId