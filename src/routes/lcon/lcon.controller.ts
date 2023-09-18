import { Controller, Get, Response, UseGuards, Query, HttpStatus, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { LconService } from './lcon.service';
import { ApiResponse, Filter, Pagination } from '../../@core/models';
import { LconSummaryReport } from '../../entities/lcon-summary-report.entity';

@Controller('lcon')
export class LconController {
  constructor(private lconService: LconService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('postgresdata')
  async getPostgresData(@Query() query: Filter): Promise<ApiResponse<Pagination<LconSummaryReport>>> {
    try {
      return {
        success: true,
        statusCode: HttpStatus.OK,
        result: await this.lconService.getPostgresDataWithRawQuery(query),
      };
    } catch (err) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [err.message],
      };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('postgrescount')
  async getPostgresCount(@Response() res, @Query('query') where) {
    try {
      const count: number = await this.lconService.getPostgresCountWithRawQuery(where);
      res.send({ data: count, error: null });
    } catch (error) {
      res.send({ data: null, error: error });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getLcon(@Param('id') id: number): Promise<ApiResponse<LconSummaryReport>> {
    try {
      const lcon = await this.lconService.getLcon(id);

      if (!lcon) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Lcon summary not found'],
        };
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        result: lcon,
      };
    } catch (err) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [err.message],
      };
    }
  }
}
