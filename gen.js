const {join} = require('path')
const {readFileSync, writeFileSync} = require('fs')
function stringToId(string) {
    return Array.from(string.slice(0, 100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase()
}
const array = [
    '{ucs cfr@0.1.2, global []}',
    '{h1 [Docs]}'
]
for (const file of readFileSync(join(__dirname, 'docs'), {encoding: 'utf8'}).trim().split('\n')) {
    const string = readFileSync(join(__dirname, `stdn/${file}.stdn`), {encoding: 'utf8'})
    const title = string.match(/title \[(.+?)\]/)[1]
    array.push(`{dt [{src ${file}.stdn, a [${title}]}]}`, '{dd [')
    for (const [, name] of string.matchAll(/(?:^|\n){h1 \[(.+)\]}\n/g)) {
        array.push(`    {src ${file}.stdn#${stringToId(name)}, a [${name}]}`)
    }
    array.push(']}', '[]')
}
writeFileSync(join(__dirname, 'stdn/docs.stdn'), array.join('\n'))