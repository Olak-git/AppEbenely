export const chart_graph = {
    first: '#F38C8C',
    first_op: '#F38C8C8A',
    second: '#D2CCFC'
}

export const logo = {
    img_default: 'https://ebenely.com/wp-content/uploads/2023/07/Untitled-design-2023-07-07T131253.443.png',
    img_480x199: 'https://ebenely.com/wp-content/uploads/2023/07/Untitled-design-2023-07-07T131253.443-480x199.png'
}

export const PRODUCTION = true
export const HOST = 'http://192.168.8.113:8888'




const verify_exists = async (A, B) => {
    // A: le mot recherché
    // B: le mot principal
    let _A = await translate_character(A)
    let _B = await translate_character(B)

    if(A.startsWith("") && A.endsWith('"')) {

        _A = _A.replace(/"/g, '');
        return _B.includes(_A);

    } else {

        let C = _A.split(' ')
        let include = true;
        C.map(c => {
            if(!_B.includes(c)) {
                include = false
            }
        })
        return include;
    }
}

const translate_character = (str) => {
    let new_str = '';

    // str = str.replace(/[äæ]/ig, 'ae');
    // str = str.replace(/[å]/ig, 'aa');
    // str = str.replace(/[öœ]/ig, 'oe');
    // str = str.replace(/[ü]/ig, 'ue');
    // str = str.replace(/[ß]/g, 'ss');

    str = str.replace(/(ĳ)/ig, 'ij');
    str = str.replace(/[àáâäæãåā]/ig, 'a');
    str = str.replace(/[çćč]/ig, 'c');
    str = str.replace(/[èéêëēėę]/ig, 'e');
    str = str.replace(/[îïíīįì]/ig, 'i');
    str = str.replace(/[ł]/ig, 'l');
    str = str.replace(/[ñń]/ig, 'n');
    str = str.replace(/[ôöòóœøōõ]/ig, 'o');
    str = str.replace(/[ßśš]/ig, 's');
    str = str.replace(/[ûüùúū]/ig, 'u');
    str = str.replace(/[ÿ]/ig, 'y');
    str = str.replace(/[žźż]/ig, 'z');

    str = str.replace(/[£]/ig, '');

    return str.toLowerCase();
}