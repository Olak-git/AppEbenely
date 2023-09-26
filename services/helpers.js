import { PermissionsAndroid, Platform } from "react-native"

export const storagePermission = () => new Promise(async (resolve, reject) => {
    if(Platform.OS == 'ios') {
        return resolve('granted')
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // {
        //     title: 'File',
        //     message:
        //         'App needs access to your Storage Memory... ',
        //     buttonNeutral: 'Ask Me Later',
        //     buttonNegative: 'Cancel',
        //     buttonPositive: 'OK',
        // },
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted')
        }
        return reject('Storage Permission denied')
    }).catch((error) => {
        console.log('Ask Storage permission error: ', error)
    })
})

export const validatePassword = (v) => {
    const reg_pwd_str = /(?=\S*[a-zA-Z0-9]{8,})/g
    const reg_pwd = /(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])/g;
    return reg_pwd_str.test(v);
    // Le mot de passe doit contenir minimum 8 caractères dont des minuscules a-z, des majuscules A-Z et des chiffres 0-9 et/ou des caractères spéciaux(+,=,@,...)

    // let errors = '';

    // if(!pseudo.trim()) {
    //     n++
    //     continuous = false
    //     errors += 'Votre pseudo est requis';
    // }

    // if(!mail) {
    //     n++
    //     continuous = false
    //     errors += (errors!=''?"\n- ":'')+'Adresse email requis';
    // } else if(!reg_em.test(mail.trim())) {
    //     n++
    //     continuous = false
    //     errors += (errors!=''?"\n- ":'')+'Format adresse email incorrect';
    // }

    // if(!pwd) {
    //     n++
    //     continuous = false
    //     errors += (errors!=''?"\n- ":'')+'Mot de passe requis';
    // } else if(!reg_pwd.test(pwd)) {
    //     n++
    //     continuous = false
    //     errors += (errors!=''?"\n- ":'')+'Le mot de passe doit contenir minimum 8 caractères dont des minuscules a-z, des majuscules A-Z et des chiffres 0-9 et/ou des caractères spéciaux(+,=,@,...)';
    // } else if(confirmPwd != pwd) {
    //     n++
    //     continuous = false
    //     errors += (errors!=''?"\n- ":'')+'Veuillez confirmer votre mot de passe';
    // }

    // if(n>1) {
    //     errors = '- ' + errors
    // }

    // if (typeof region !== "number") {
    //     errors += (errors!=''?"\n- ":'')+'Sélectionnez votre région svp !';
    // }
}

export const validateEmeil = (v) => {
    const reg_em = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    return reg_em.test(v.trim())
}