import API from "@ocdla/salesforcerestapi/SalesforceRestApi"


class Controller {

    constructor() {

        this.api = new API();
        //this.createapi();
        //this.deleteapi("a01bm000007Jo6jAAC");
        //this.getapi();
        //this.updateApi();
    }
    async getapi() {
        let request = await this.api.read("query?q=SELECT name, id,datePosted__c,employer__c,fileURL__c, salary__c  from jobs__c");
        let records = request.records;
        console.log(records);
        
    }
    async createapi(){
        let savedjob = {
            "Name": "Lawyer",
            "datePosted__c": "2024-04-29",
            "employer__c": "OCDLATEST",
            "salary__c": 100000000000
        };
        this.api.create("jobs__c", savedjob);
        this.getapi();
    }
    async updateApi(){
        let savedjob =  {
            "Name": "Attorney",
            "salary__c": 1000000000,
            "datePosted__c" : "4/3/2024",
            "fileUrl__c": "https://mydomain.com/catpic",
            "employer__c": "ACME Lawyers Inc."
        }
        //recordID = "a01bm000007GXP0AAO";

        await this.api.update("jobs__c","a01bm000007GXP0AAO", savedjob);
        this.getapi();
    }
    async deleteapi(index) {
        await this.api.delete("jobs__c", index);
        this.getapi();
    }
}
export default Controller;