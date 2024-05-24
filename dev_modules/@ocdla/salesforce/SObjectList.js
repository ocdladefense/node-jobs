
export default class SObjectList {

  #records;



  constructor(records) {
    this.records = records;
  }

  
  getRecord(recordId) {
    // Job.fromSObject(record))[0];
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }
}