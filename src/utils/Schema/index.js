class Schema {
    constructor(schema) {
        this.schema = schema;
    }

    checkForField(fieldName, fieldValue) {
        let fieldChecker = this.schema[fieldName];
        return fieldChecker.check(fieldValue);
    }

    check(value, cb) {
        for(let fieldName in this.schema) {
            let fieldValue = value[fieldName];
            if(!fieldValue || !checkForField(fieldName, fieldValue)) {
                return false;
            }
        }
    }
}

export const SchemaBuilder = (o) => new Schema(o);
export * from './types.js';

