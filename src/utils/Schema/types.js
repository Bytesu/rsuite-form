class Type {
    constructor(name) {
        this.name = name;
        this.validators = [];
    }

    check(v) {
        for(let i = 0, len = this.validators.length; i < len; i++) {
            let vldr = this.validators[i];
            if(!vldr(v)) {
                return false;
            }
        }
        return true;
    }

    addValidator(vd) {
        this.validators.push(vd);
    }
}

class Str extends Type {
    constructor() {
        super('string');
        super.addValidator( v => typeof v === 'string');
    }

    isLongerThan(n) {
        super.addValidator( v => v.length > n );
        return this;
    }

    containsLetter() {
        super.addValidator( v => /[a-zA-Z]/.test(v) );
        return this;
    }

    containsUppercaseLetter() {
        super.addValidator( v => /[A-Z]/.test(v) );
        return this;
    }

    containsLowercaseLetter() {
        super.addValidator( v => /[a-z]/.test(v) );
        return this;
    }

    containsLetterOnly() {
        super.addValidator( v => /^[a-zA-Z]+$/.test(v) );
        return this;
    }

    containsNumber() {
        super.addValidator( v => /[0-9]/.test(v) );
        return this;
    }
}

export const StringType  = () => new Str();
