# Scripts 
### To push the data to the org
sf data import tree --files data/Job__c.json

### To pull data from the org 
sf data export tree --query "SELECT Name, Id, PostingDate__c, ClosingDate__c, Description__c, Location__c, Employer__c, AttachmentUrl__c, Salary__c  FROM Job__c" --output-dir data

### 