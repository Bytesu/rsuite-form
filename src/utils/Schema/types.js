class Type {
    constructor(name) {
        this.name = name;
        this.validators = [];
    }

    check(v) {
        for(let i = 0, len = this.validators.length; i < len; i++) {
            let { vd, msg } = this.validators[i];
            if(!vd(v)) {
                return { err: true, msg };
            }
        }
        return { err: false };
    }

    addValidator(vd, msg) {
        msg = msg || this.validators[0].msg;
        this.validators.push({ vd, msg });
    }
}

class Str extends Type {
    constructor(msg = 'no error message') {
        super('string');
        super.addValidator( v => typeof v === 'string', msg);
    }

    isLongerThan(n, msg) {
        super.addValidator( v => v.length > n, msg );
        return this;
    }

    containsLetter(msg) {
        super.addValidator( v => /[a-zA-Z]/.test(v), msg );
        return this;
    }

    containsUppercaseLetter(msg) {
        super.addValidator( v => /[A-Z]/.test(v), msg );
        return this;
    }

    containsLowercaseLetter(msg) {
        super.addValidator( v => /[a-z]/.test(v), msg );
        return this;
    }

    containsLetterOnly(msg) {
        super.addValidator( v => /^[a-zA-Z]+$/.test(v), msg );
        return this;
    }

    containsNumber(msg) {
        super.addValidator( v => /[0-9]/.test(v), msg );
        return this;
    }
}

export const StringType  = (msg) => new Str(msg);
