class Validations {
    constructor() {
        this.required = {
            regex: /^$|\s+/,
            message: "Campo obrigatório",
            validate: (value) => {
                if (Array.isArray(value) && value.length === 0)
                    return this.required.message

                if (value === "" || value === null)
                    return this.required.message

                return null
            }
        };

        this.cep = {
            regex: /^\d{5}-?\d{3}$/,
            message: "CEP inválido",
            validate: (value) => {
                if (!this.cep.regex.test(value)) return this.cep.message
                return null
            }
        };

        this.email = {
            regex: /\S+@\S+\.\S+/,
            message: "Email inválido",
            validate: (value) => {
                if (!this.email.regex.test(value)) return this.email.message
                return null
            }
        };

        this.phone = {
            regex: /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/,
            message: "Telefone inválido",
            validate: (value) => {
                if (!this.phone.regex.test(value)) return this.phone.message
                return null
            }
        };

        this.cpf = {
            regex: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
            message: "CPF inválido",
            validate: (value) => {
                if (!this.cpf.regex.test(value)) return this.cpf.message
                if (!isCpfValid(value)) return "CPF inválido."
                return null
            }
        };

        this.cnpj = {
            regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
            message: "CNPJ inválido",
            validate: (value) => {
                if (!this.cnpj.regex.test(value)) return this.cnpj.message
                if (!isCnpjValid(value)) return this.cnpj.message
                return null
            }
        };

        this.min = {
            message: "Quantidade de caractéres incorreto.",
            validate: (value, minValue) => {
                if (value.length < minValue) {
                    return `${this.min.message} O mínimo deve ser ${minValue}.`;
                }
                return null;
            }
        }

        this.max = {
            message: "Quantidade de caractéres incorreto.",
            validate: (value, maxValue) => {
                if (value.length > maxValue) {
                    return `${this.max.message} O máximo deve ser ${maxValue}.`;
                }
                return null;
            }
        },
            this.validateDateBr = {
                message: "Data inválida",
                validate: (value) => {
                    if (value) {
                        if (value.length !== 10) return this.validateDateBr.message;

                        const newDate = value.split("/").reverse().join("-");
                        const dateParsed = Date.parse(newDate);

                        if (isNaN(dateParsed)) return this.validateDateBr.message;

                        return null;
                    }
                }
            }
    }


}


function isCpfValid(value) {
    let cpf = value.trim();

    cpf = cpf.replace(/\./g, "");
    cpf = cpf.replace("-", "");
    cpf = cpf.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
        v1 += cpf[i] * p;
    }

    v1 = (v1 * 10) % 11;

    if (v1 == 10) {
        v1 = 0;
    }

    if (v1 != cpf[9]) {
        return false;
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
        v2 += cpf[i] * p;
    }

    v2 = (v2 * 10) % 11;

    if (v2 == 10) {
        v2 = 0;
    }

    if (v2 != cpf[10]) {
        return false;
    } else {
        return true;
    }
};


function isCnpjValid(value) {
    let cnpj = value.trim();

    cnpj = cnpj.replace(/\./g, "");
    cnpj = cnpj.replace("-", "");
    cnpj = cnpj.replace("/", "");
    cnpj = cnpj.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cnpj.length > i; i++) {
        if (cnpj[i - 1] != cnpj[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
            v1 += cnpj[i] * p1;
        } else {
            v1 += cnpj[i] * p2;
        }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
        v1 = 0;
    } else {
        v1 = 11 - v1;
    }

    if (v1 != cnpj[12]) {
        return false;
    }

    for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
            v2 += cnpj[i] * p1;
        } else {
            v2 += cnpj[i] * p2;
        }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
        v2 = 0;
    } else {
        v2 = 11 - v2;
    }

    if (v2 != cnpj[13]) {
        return false;
    } else {
        return true;
    }
};

class Validator {
    constructor(validationsArr) {
        this.validations = validationsArr;
        this.value = null;
        this.isValid = null;
        this.messageError = null;
    }
}


const runValidations = (field, feedback = true) => {

    let msg = null;

    const validations = new Validations();

    if (field.validations) {

        for (let item of field.validations) {
            if (item.indexOf("|") !== -1) {
                const arr = item.split("|");
                const type = arr[0];
                const value = Number(arr[1]);

                const message = validations[type].validate(field.value, value);

                if (message) {
                    msg = message
                    break;
                }

            } else {
                const message = validations[item].validate(field.value);
                if (message) {
                    msg = message
                    break;
                }
            }
        }
    }


    if (feedback) {
        field.isValid = (msg === null);
        field.messageError = msg;
    }

    return msg;
}


const keyValue = objForm => {

    if (objForm === undefined) throw "Informe o objeto FORM para keyValue."

    let obj = {};

    Object.entries(objForm).forEach(([key, value]) => {
        obj[key] = value.value ? value.value : null;
    });

    return obj;
}

/**
 * 
 * @param object
 * @returns boolean
 */
const validateForm = (obj, feedback = true) => {

    if (obj === undefined) throw "Informe o objeto FORM no validateForm."

    let isValidFields = true;

    Object.entries(obj).forEach(([key, value]) => {

        let msg = null;

        if (value.validations) {

            msg = runValidations(value, feedback)

            if (isValidFields !== false) isValidFields = (msg === null)

            if (feedback) {
                value.isValid = msg === null;
                value.messageError = msg;
            }
        }
    });

    return isValidFields;
}


const onActions = {
    onInput: function (field, callback) {
        if (field.isValid != null) runValidations(field);
        if (typeof callback === 'function') callback(field)
    },
    onBlur: function (field, callback) {
        runValidations(field);
        if (typeof callback === 'function') callback(field)
    },
    onChange: function (field, callback) {
        runValidations(field);
        if (typeof callback === 'function') callback(field)
    },
}

module.exports = { Validator, runValidations, onActions, validateForm, keyValue };
