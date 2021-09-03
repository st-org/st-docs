export async function a(unit,Compiler){
    const element=document.createElement('a')
    element.target='_blank'
    const {src}=unit.options
    if(typeof src==='string'){
        const [src0,hash]=src.split('#')
        element.href='?src='+encodeURIComponent(src0)+'#'+encodeURIComponent(hash??'')
    }
    element.append(await Compiler.compileInlineSTDN(unit.children))
    return element
}