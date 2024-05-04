
/**
 * @module SalesforceRestApi
 * @classdesc This module is to be used to interface with the Salesforce API using a RESTful architecture. 
 */
class SalesforceRestApi {
    instanceUrl;
    accessToken;
    method;
    body;
    /**
     * Represents the Salesforce API version being used.
     * @static
     * */
    static API_VERSION = 'v60.0';
    /**
     * Represents the base Salesforce API endpoint used for http requests.
     * @static
     * */
    static BASE_URL = '/services/data/' + SalesforceRestApi.API_VERSION + '/';

    /** 
     * Represents this API that interfaces with the Salesforce API.
     * @constructor 
     * @param {string} instanceUrl - The
     * @param {string} accessToken - The
    */
    constructor(instanceUrl, accessToken) {
        this.instanceUrl = instanceUrl;
        this.accessToken = accessToken;
        this.headers = new Headers();
        this.authHeader = "Bearer " + this.accessToken; 
        this.headers.append("Authorization", this.authHeader);
        this.headers.append('Content-Type', 'application/json');
    }

    /** 
     * @param {string} queryString - The SQL query.
     * @returns {object}
     * @example
     * "SELECT Name,Id FROM Object_Name"
    */
    query(queryString) {
        this.method = 'GET';
        this.path = SalesforceRestApi.BASE_URL + 'query?q=' + queryString;
        return this.send();
    }

    /** 
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    create(objectName, record) {
        this.method = 'POST';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName; 
        this.body = JSON.stringify(record);

        return this.send();
    }

    /** 
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    update(objectName, record) {
        this.method = 'PATCH';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record.Id}`;
        delete record.Id;
        this.body = JSON.stringify(record);

        return this.send();
    }

    /** 
     * @param {string} objectName
     * @param {object} record
     * @returns {object}
    */
    delete(objectName, record) {
        this.method = 'DELETE';
        this.path = SalesforceRestApi.BASE_URL + 'sobjects/' + objectName + `/${record.Id}`;
        
        return this.send();
    }

    /** 
     * @returns {object}
    */
    send() {
        let config = {
            method: this.method,
            headers: this.headers
        };

        if (this.method != 'GET' && this.method != 'DELETE') {
            config.body = this.body;
        }

        return fetch(`${this.instanceUrl}${this.path}`, config)
        .then((resp) => {
            if((resp.status >= 200 && resp.status <= 299 ) && (this.method == "PATCH" || this.method == "DELETE")){
                return true;
            }
            else{
                return resp.json();
            }
        })
        .then((json) => {

            if(json == undefined){
                return true;
            }
            if(json == true){
                return true;
            } 
            if(json.errorCode != null){
                console.log(json.errorCode)
            }
            return json;


        })
        .catch((err) => {
            console.error('Error:', err);
        });
    }
}

export default SalesforceRestApi;
