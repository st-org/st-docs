const {join}=require('path')
const {readFileSync,writeFileSync}=require('fs')
const array=[
    '{id docs, orbit heading, h2 [Docs]}',
    '{dl [',
]
for(const doc of readFileSync(join(__dirname,'docs'),{encoding:'utf8'}).trim().split('\n')){
    const string=readFileSync(join(__dirname,doc+'.stdn'),{encoding:'utf8'})
    const title=string.match(/title \[(.+?)\]/)[1]
    array.push(`    {dt [{src ${doc}.stdn, a [${title}]}]}`,'    {dd [')
    for(const [,id,name] of string.matchAll(/(?:^|\n){id ([a-z-]+).+h2 \[(.+?)\]/g)){
        array.push(`        {src ${doc}.stdn#${id}, a [${name}]}`)
    }
    array.push('    ]}')
}
array.push(']}','[]')
writeFileSync(join(__dirname,'docs.stdn'),array.join('\n'))