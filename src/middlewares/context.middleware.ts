import { REQUEST_ID_HEADER_NAME } from "@/app";

const continuation = require('cls-hooked');

const namespace = 'requestNamespace'

class Context {

    static setupWasCalled = false

    static setup(req, res, next) {
        const session = continuation.createNamespace(namespace);
        Context.setupWasCalled = true
        session.run(() => {
            Context.setReq(req)
            next();
        });
    }

    constructor(req) {
    }

    static getReq() {
        if(this.setupWasCalled) {
            continuation.getNamespace(namespace).get('context');
        }
    }

    static setReq(req) {
        if(this.setupWasCalled) {
            continuation.getNamespace(namespace).set('context', req);
        }
    }

}

export default Context