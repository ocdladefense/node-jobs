/** @jsx vNode */
import { vNode, View } from "@ocdla/view";

const Intro = function() {
    return (
        <div>
            <h1>OCDLA Jobs</h1>

            <p>
            Welcome to OCDLA's Job Board. Job postings are removed three days
            after the Closing Date. Postings that are marked as "Open Until
            Filled" are removed six weeks after the Posting Date.
            </p>

            <p>
            You may also email your posting description to cpainter@ocdla.org
            and we will post the job. Include the job, title, salary, location,
            and closing date.
            </p>
        </div>
    );
};

export default Intro;