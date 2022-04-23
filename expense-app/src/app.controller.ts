import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { data, ReportType } from './data';

@Controller('report/:type') //Invoke decorator
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    //extract path parameter using Param decorator
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport() {
    return 'created';
  }

  @Put(':id')
  updateReport() {
    return 'updated';
  }

  @Delete(':id')
  deleteReport() {
    return 'deleted';
  }
}

// data.report.push({
//   id: 'hi',
//   source: 'hi',
//   amount: 2000,
//   created_at: new Date(),
//   updated_at: new Date(),
//   type: ReportType.INCOME,
// });
