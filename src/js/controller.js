import API from "@ocdla/salesforce/SalesforceRestApi"


class Controller {

    constructor() {

        this.api = new API(INSTANCE_URL, ACCESS_TOKEN);
        //this.createapi();
        //this.deleteapi("a01bm000007JfZiAAK");
        //this.updateApi();
        this.getapi();
    }
    async getapi() {
        let request = await this.api.query("SELECT name, id,datePosted__c,employer__c,fileURL__c, salary__c  from jobs__c");
        let records = request.records;
        console.log(records);
        
    }
    async createapi(){
        let savedjob = {
            "Name": "Lawyer",
            "DatePosted__c": "2024-04-29",
            "Employer__c": "OCDLATEST",
            "Salary__c": 100000000000
        };
        this.api.create("jobs__c", savedjob);
        //this.getapi();
    }
    async updateApi(){
        let savedjob =  {
            "Name": "Attorney",
            "Salary__c": 1000000000,
            "FileUrl__c": "https://mydomain.com/catpic",
            "Employer__c": "ACME Lawyers Inc.",
            "Id" : "a01bm000007GXP0AAO"
        }
        let temp =  await this.api.update("jobs__c", savedjob);
        console.log(temp)
        if (temp == true ){
            window.alert("it worked!!!!")
        }
        //this.getapi();
    }
    async deleteapi(index) {
        let target ={
            "Id" : index
        }
        await this.api.delete("jobs__c", target);
        //this.getapi();
    }
}
export default Controller;