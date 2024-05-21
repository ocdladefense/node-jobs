/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import JobCard from "./JobCard.js";
import Job from "@ocdla/employment/Job.js";



export default class JobList {
  records;
  useMock = USE_MOCK_RECORDS;

  static actions = ["edit", "delete"];

  constructor() {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    //this.view = View.createRoot(this.selector);
  }

  returnRecords() {
    return this.records;
  }

  listenTo(event) {
    let elem = document.querySelector("#job-container");
    elem.addEventListener(event, this);
  }
  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let id = target.dataset.id;
    let job;
    let nextRender;
    let method;

    // Bail out if we're not interested in the user's interaction.
    if (
      dataset == null ||
      action == null ||
      !JobList.actions.includes(action)
    ) {
      return;
    }

    // Construct a Job object when necessary.

    job = this.getRecord(id);


    method = "onRequest" + this.toTitleCase(action);

    try {
      e.preventDefault();
      nextRender = await this[method](job);
    } catch (e) {
      console.log(e, method);

      window.alert(e.message);
    }

    window.location.assign("");
  }

  async onRequestDelete(job) {
    let message;
    let userId = USER_ID;

    if (!job.isOwner(userId)) {
      throw new Error("You don't have permission to perform this action.");
    }

    try {
      await this.deleteJob(job.id);
      message = "The record was deleted.";
    } catch (e) {
      message = e.message;
    }

    await this.loadData(this.records);

    return <JobList jobs={this.records} message={message} ownerId={userId} />;
  }

  async deleteJob(id) {
    if (this.useMock) {
      this.records = this.records.filter((record) => record.id != id);
    }
    else await this.api.delete("Job__c", id);
  }


  onRequestEdit(job) {
    let userId = USER_ID;
    if (job == null || !job.isOwner(userId)) {
      return (
        <JobList
          jobs={this.records}
          message="You don't have permission to perform this action."
          ownerId={userId}
        />
      );
    } else {
      return <JobForm job={job} />;
    }
  }




  getRecord(recordId) {
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }

  async loadData(records) {
    if (this.useMock) {
      this.records = records || await this.getMockData();
    } else {
      let resp = await this.api.query(QUERY);
      this.records = resp.records.map((record) => Job.fromSObject(record));
    }
  }

  render() {
    let jobs = this.records;
    let userId = USER_ID;
    //let message = props.error || props.message || "";
    let message = "";

    return (
      <div>
        <div style="color:red;" class="error">{message}</div>

        <a href="#new" style="margin-bottom: 15px; display: block;" id="button">Create a Job Posting</a>
        <div class="list-group">
          {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(userId)} />)}
        </div>
      </div>
    );
  }


  

  async getMockData() {
    let j1 = {
      OwnerId: "0",
      Id: "0",
      Name: "Legal Maverick",
      Salary__c: "$80,000",
      PostingDate__c: "4/20/2024",
      ClosingDate__c: "5/29/2024",
      FileUrl__c: "https://my-domain.com/document1",
      Employer__c: "Veritas Law Group",
      Location__c: "Rivertown Junction",
      OpneUntilFilled__c: false,
      Description__c: "Position Overview: Are you a legal trailblazer with an unyielding passion for justice? Look no further! Veritas Law Group is seeking a Legal Maverick to join our dynamic team. As a Legal Maverick, youll redefine the boundaries of legal practice, challenge conventional norms, and fearlessly advocate for our clients. \n \n Responsibilities:\n \n Innovative Case Strategy: As a Legal Maverick, youll craft groundbreaking legal strategies that leave opposing counsel scratching their heads. Think outside the box, disrupt the status quo, and find creative solutions to complex legal puzzles.\n Fearless Representation: Whether in the courtroom or the boardroom, youll fearlessly represent our clients interests. Your confidence, charisma, and unwavering commitment will set you apart. \n Legal Acrobatics: Legal Mavericks dont just walk; they leap, twist, and somersault through legal challenges. Expect to juggle multiple cases, dive into uncharted legal waters, and emerge victorious.\n Rule-Bending Advocacy: Rules are meant to be bent, not broken. As a Legal Maverick, youll navigate the gray areas, push boundaries, and champion justice with flair.\n Veritas Verve: Our Legal Mavericks embody the Veritas spirit—bold, audacious, and relentless. Youll uphold our core values while rewriting legal narratives.\n Qualifications:\n \n\n Juris Doctor (JD): Youve conquered law school, but your hunger for knowledge remains insatiable.\n Trailblazing Spirit: Youre not afraid to forge new paths, challenge precedents, and take calculated risks.\n Charisma and Conviction: Your presence commands attention, and your arguments resonate. Confidence is your secret weapon.\n Fearless Advocacy: You thrive under pressure, turning courtroom drama into your personal stage.\n Legal Agility: You can pivot, pirouette, and pivot again. Adaptability is your middle name.\n Perks:\n \n \n Legal Stunts: Showcase your legal prowess in high-stakes cases.\n Custom Cape: Every Legal Maverick needs a signature cape. Ours is metaphorical, but youll feel invincible.\n Coffee with the Judge: Network with judges, influencers, and fellow Mavericks.\n Veritas Swag: Rock our branded gear and let everyone know youre a Legal Maverick.\n Apply Now: If youre ready to rewrite legal history, break barriers, and leave a lasting impact, submit your application today. Veritas Law Group awaits its next Legal Maverick! \n \n \n Veritas Law Group is an equal opportunity employer. We encourage applications from all legal daredevils, regardless of race, gender, or cape color.",
    };

    let j2 = {
      OwnerId: "1",
      Id: "1",
      Name: "Trial Whisperer",
      Salary__c: "$110,000",
      PostingDate__c: "4/28/2024",
      ClosingDate__c: "5/10/2024",
      FileUrl__c: "https:/this-domain.org/documents/requirements",
      Employer__c: "JusticeShield Attorneys",
      Location__c: "Cedarwood Heights",
      OpenUntilFilled__c: true,
      Description__c: "",
    };

    let j3 = {
      OwnerId: "2",
      Id: "2",
      Name: "Justice Architect",
      Salary__c: "$96,000",
      PostingDate__c: "4/17/2024",
      ClosingDate__c: "6/1/2024",
      FileUrl__c: "https://a-domain.law/justice-architect",
      Employer__c: "Liberty Legal Associates",
      Location__c: "Haborview Bay",
      OpenUntilFilled__c: false,
      Description__c: "",
    };

    let mockJobs = [
      Job.fromSObject(j1),
      Job.fromSObject(j2),
      Job.fromSObject(j3),
    ];

    return Promise.resolve(mockJobs);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
