const {join}=require('path')
const {readFileSync,writeFileSync}=require('fs')
function stringToId(string){
    return Array.from(string.slice(0,100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase()
}
const array=[
    '{h1 [Docs]}',
]
for(const doc of readFileSync(join(__dirname,'docs'),{encoding:'utf8'}).trim().split('\n')){
    const string=readFileSync(join(__dirname,doc+'.stdn'),{encoding:'utf8'})
    const title=string.match(/title \[(.+?)\]/)[1]
    array.push(`{dt [{src ${doc}.stdn, a [${title}]}]}`,'{dd [')
    for(const [,name] of string.matchAll(/(?:^|\n){h1 \[(.+)\]}\n/g)){
        array.push(`    {src ${doc}.stdn#${stringToId(name)}, a [${name}]}`)
    }
    array.push(']}','[]')
}
writeFileSync(join(__dirname,'docs.stdn'),array.join('\n'))