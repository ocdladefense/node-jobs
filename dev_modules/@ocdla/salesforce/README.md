# Version 1.0

# Installation
```npm install salesforcerestapi```

Note: This uses 2 global variables from a .env file.
**ACCESS_TOKEN**: Used for the authorization header. See [documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/quickstart_oauth.htm) on how to obtain an access token.
**INSTANCE_URL**: The domain of the org you are trying to make calls to.



# SalesforceRestApi
Contains the 4 CRUD methods: Create, Read, Update, Delete.

#### **To Add Headers**:
<code>
let sfRestApi = new SalesforceRestApi(); //new instance  
sfRestApi.headers.append(headers_you_want_to_append);
</code>


## Create
**Parameters**:  
objectName  
requestBody (as a JSON object)  
**Returns**:  
An object with a boolean attribute of `success`  

##### **Example Code**
<code>
let dataToSend = 
{
    name: "test Name",
    coursecode__c: "1234",
    instructor__c: "test instructor",
    courseschedule__c: "fakeSchedule"
}
        
let sfRestApi = new SalesforceRestApi(); //new instance of the class  
let data = await sfRestApi.create("CourseInfo__c", dataToSend); 
console.log(data); //displaying in console  
</code>


## Read
**Parameters**:  
queryString   
**Returns**:   
json object with an array attribute `records`   

##### **Example Code**
<code>
let sfRestApi = new SalesforceRestApi(); //new instance <br>
let data = await sfRestApi.read("query?q=SELECT+name,id+from+CourseInfo__c"); //asynchronous fetching of data  <br>
console.log(data); //displaying in console <br> 
</code>


## Update
**Parameters**:  
objectName  
recordId  
requestBody (as a JSON object)  
**Returns**:  
An object with a boolean attribute of `success`  

##### **Example Code**
<code>
let dataToSend = {  
    Name: "updated test Name",  
    coursecode__c: "0000",  
    instructor__c: " new instructor",  
    courseschedule__c: "updated fakeSchedule",  
}  

let sfRestApi = new SalesforceRestApi(); //new instance of the class    

//getting the old record id  
let data1 = await sfRestApi.read("query?q=SELECT+name,id+from+CourseInfo__c");  
data1 = data1.records;  
let theRecord = {};  
for (let i = 0; i < data1.length; i++) {  
    if (data1[i].Name == "test Name") {  
        theRecord = data1[i];  
    }}  
let recordId = theRecord.Id;  

let data = await sfRestApi.update("CourseInfo__c", recordId,dataToSend);   
console.log(data); //displaying in console   
</code>

## Delete
**Parameters**:  
objectName  
recordId  
**Returns**:  
An object with a boolean attribute of `success`  

##### **Example Code**
<code>
//deleting a record    
let sfRestApi = new SalesforceRestApi(); //new instance of the class    

//getting the old record id    
let data1 = await sfRestApi.read("query?q=SELECT+name,id+from+CourseInfo__c");  
data1 = data1.records;  
let theRecord = {};  
for (let i = 0; i < data1.length; i++) {  
    if (data1[i].Name == "updated test Name") {  
        theRecord = data1[i];   
    }}    
let recordId = theRecord.Id;  

let data = await sfRestApi.delete("CourseInfo__c", recordId);   
console.log(data); //displaying in console   
</code>



