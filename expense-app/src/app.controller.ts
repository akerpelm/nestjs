import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type') //Invoke decorator
export class AppController {
  constructor(private readonly appService: AppService) {}

  reportType(type) {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  }

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    //extract path parameter using Param decorator
    return this.appService.getAllReports(this.reportType(type));
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getReportById(this.reportType(type), id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    return this.appService.createReport(this.reportType(type), {
      amount,
      source,
    });
  }

  @Put(':id')
  updateReport(
    @Body() body: { amount: number; source: string },
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    return this.appService.updateReport(id, this.reportType(type), body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    this.appService.deleteReport(id);
  }
}
