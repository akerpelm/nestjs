import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  source: string;
  amount: number;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    return report ? report : 'Cannot find report';
  }

  createReport(type: ReportType, { source, amount }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);

    return newReport;
  }

  updateReport(id: string, type: ReportType, body: Report) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;

    const reportToUpdate = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    data.report[reportIndex] = reportToUpdate;
    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    console.log('Report index', reportIndex);

    if (reportIndex === -1) return 'No report to delete';

    data.report.splice(reportIndex, 1);
    return 'Success';
  }
}
