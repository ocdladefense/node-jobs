
sf data query --target-org Sandbox__OCDLA --query \

sf data export tree --target-org Sandbox__OCDLA --query \
      "SELECT Id, Name, Description__c, PostingDate__c, ClosingDate__c, Salary__c, OpenUntilFilled__c FROM Job__c LIMIT 20" \
--prefix export-records --output-dir sfdx-out