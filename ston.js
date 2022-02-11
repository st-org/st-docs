async function createSourcePre(string, compiler) {
    return await compiler.compileUnit({
        tag: 'code',
        options: {
            lang: 'ston',
            block: true
        },
        children: string.split('\n').map(value => value.split(''))
    })
}
async function createResultPre(string, compiler) {
    return await compiler.compileUnit({
        tag: 'code',
        options: {
            lang: 'json',
            block: true
        },
        children: (JSON.stringify(compiler.ston.parse(string), undefined, 4) ?? '').split('\n').map(value => value.split(''))
    })
}
export const ston = async (unit, compiler) => {
    const element = document.createElement('div')
    const source = document.createElement('div')
    const resultEle = document.createElement('div')
    const textarea = document.createElement('textarea')
    source.classList.add('source')
    resultEle.classList.add('result')
    element.append(source)
    element.append(resultEle)
    let string = textarea.value = compiler.base.stdnToPlainString(unit.children)
    let sourcePre
    async function render() {
        if (sourcePre !== undefined && textarea.value === string) {
            textarea.replaceWith(sourcePre)
            return false
        }
        if (textarea.disabled) {
            return false
        }
        textarea.disabled = true
        string = textarea.value
        const pre = await createSourcePre(string, compiler)
        source.innerHTML = ''
        sourcePre = pre
        source.append(pre)
        pre.addEventListener('click', () => {
            pre.replaceWith(textarea)
            textarea.disabled = false
            textarea.focus()
        })
        const df = await createResultPre(string, compiler)
        resultEle.innerHTML = ''
        resultEle.append(df)
        return true
    }
    await render()
    textarea.addEventListener('blur', async () => {
        if (await render()) {
            element.dispatchEvent(new Event('adjust', {bubbles: true, composed: true}))
        }
    })
    return element
}