export async function a(unit,Compiler){
    const element=document.createElement('a')
    element.target='_blank'
    element.append(await Compiler.compileInlineSTDN(unit.children))
    return element
}