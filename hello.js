export function hello(unit){
    const element=document.createElement('div')
    element.textContent='Hello '+unit.options.name
    return element
}