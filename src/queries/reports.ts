import { Report } from "@/model/report-model";
import { Assessment } from "@/model/assessment-model";

import { replaceMongoIdInObject } from "@/lib/convertData";

export async function getAReport(filter:any) {
    if (!filter) {
        throw new Error("Invalid filter")
    }
    console.log("filter is 10:",filter);

    try {
        const report = await Report.findOne(filter)
        .populate({
            path: "quizAssessment",
            model: Assessment,
        }).lean();
        console.log("report is 18:",report);
        
        return replaceMongoIdInObject(report);
    } catch(error:any) {
        throw new Error(error.message)
    }
}