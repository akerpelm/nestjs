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
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';

@Controller('report/:type') //Invoke decorator
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  reportType(type) {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  }

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    //extract path parameter using Param decorator
    return this.reportService.getAllReports(this.reportType(type));
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(this.reportType(type), id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportService.createReport(this.reportType(type), {
      amount,
      source,
    });
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportService.updateReport(id, this.reportType(type), body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    this.reportService.deleteReport(id);
  }
}
