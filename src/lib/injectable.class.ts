import { di, Di } from "./di.lib";

export class Injectable {
    di: Di = di;
    get request() {
        return this.di.request;
    }

    get response() {
        return this.di.response;
    }
}