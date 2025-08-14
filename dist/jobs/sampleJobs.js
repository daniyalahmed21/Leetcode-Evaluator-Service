"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleJob = void 0;
class SampleJob {
    constructor(payload) {
        this.handle = (job) => {
            console.log("Handler of the job");
            console.log(job);
            console.log(this.payload);
        };
        this.failed = (job) => {
            console.log("Job failed");
            if (job) {
                console.log(job.id);
            }
        };
        this.name = this.constructor.name;
        this.payload = payload;
    }
}
exports.SampleJob = SampleJob;
