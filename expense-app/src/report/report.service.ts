import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from '../dtos/report.dto';

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(
    id: string,
    type: ReportType,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;

    const reportToUpdate = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    data.report[reportIndex] = reportToUpdate;
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    console.log('Report index', reportIndex);

    if (reportIndex === -1) return 'No report to delete';

    data.report.splice(reportIndex, 1);
    return 'Success';
  }
}
