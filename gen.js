const {join}=require('path')
const {readFileSync,writeFileSync}=require('fs')
function stringToId(string){
    return string.replace(/[^\s\w-]/g,'').toLowerCase().trim().split(/[\s_-]+/).join('-')
}
const array=[
    '{h2 [Docs]}',
    '{dl [',
]
for(const doc of readFileSync(join(__dirname,'docs'),{encoding:'utf8'}).trim().split('\n')){
    const string=readFileSync(join(__dirname,doc+'.stdn'),{encoding:'utf8'})
    const title=string.match(/title \[(.+?)\]/)[1]
    array.push(`    {dt [{src ${doc}.stdn, a [${title}]}]}`,'    {dd [')
    for(const [,name] of string.matchAll(/(?:^|\n){h2 \[(.+)\]}\n/g)){
        array.push(`        {src ${doc}.stdn#${stringToId(name)}, a [${name}]}`)
    }
    array.push('    ]}')
}
array.push(']}','[]')
writeFileSync(join(__dirname,'docs.stdn'),array.join('\n'))