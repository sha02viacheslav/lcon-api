import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filter, Pagination } from '../../@core/models';
import { LconSummaryReport } from '../../entities/lcon-summary-report.entity';

@Injectable()
export class LconService {
  constructor(
    @InjectRepository(LconSummaryReport)
    private lconSummaryRepo: Repository<LconSummaryReport>,
  ) {}

  async getPostgresDataWithRawQuery(filter: Filter): Promise<Pagination<LconSummaryReport>> {
    const { pageSize, pageIndex, search, sort, order, start, end, rawWhere } = filter;
    const qb = this.lconSummaryRepo.createQueryBuilder('LconSummaryReport');

    if (start) {
      qb.andWhere(`TO_TIMESTAMP(enddate, 'MM/DD/YYYY HH24:MI:SS') >= TO_TIMESTAMP('${start}', 'YYYY-MM-DD')`);
    }
    if (end) {
      qb.andWhere(
        `TO_TIMESTAMP(enddate, 'MM/DD/YYYY HH24:MI:SS') <= TO_TIMESTAMP('${end} 23:59:59', 'YYYY-MM-DD HH24:MI:SS')`,
      );
    }
    if (search) {
      qb.andWhere(
        `(CAST(LconSummaryReport.sr AS text) LIKE '${search}%' OR CAST(LconSummaryReport.serviceorderid AS text) LIKE '${search}%' OR LconSummaryReport.carrier LIKE '%${search}%' OR LconSummaryReport.status LIKE '%${search}%')`,
      );
    }
    if (rawWhere) {
      qb.andWhere(rawWhere);
    }
    if (pageSize != undefined) {
      qb.take(pageSize);
    }
    if (pageIndex != undefined && pageSize != undefined) {
      qb.skip(pageSize * (pageIndex - 1));
    }
    if (sort === 'enddate') {
      qb.orderBy(`TO_TIMESTAMP('LconSummaryReport.enddate', 'MM/DD/YYYY HH24:MI:SS')`, order == 'asc' ? 'ASC' : 'DESC');
    } else if (sort === 'orderacceptancedate') {
      qb.orderBy(
        `TO_TIMESTAMP('LconSummaryReport.orderacceptancedate', 'MM/DD/YYYY HH24:MI:SS')`,
        order == 'asc' ? 'ASC' : 'DESC',
      );
    } else {
      qb.orderBy(`LconSummaryReport.${sort}`, order == 'asc' ? 'ASC' : 'DESC');
    }
    qb.orderBy(`LconSummaryReport.id`, 'DESC');

    const [data, totalCount] = await qb.getManyAndCount();

    const result = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalCount: totalCount,
      data: data,
    };
    return result;
  }

  async getPostgresCountWithRawQuery(where?: string) {
    return await this.lconSummaryRepo.createQueryBuilder('LconSummaryReport').where(where).getCount();
  }

  async getPastWeekSummary(where?: string) {
    const qb = this.lconSummaryRepo
      .createQueryBuilder('LconSummaryReport')
      .select("TO_CHAR(startdate, 'YYYY-MM-DD') AS date")
      .addSelect('count(*) AS count')
      .where(where)
      .andWhere("startdate >= (CURRENT_DATE - interval '1 week')")
      .groupBy('date')
      .orderBy('date');
    return await qb.getRawMany();
  }

  async getPastYearSummary(where?: string) {
    const qb = this.lconSummaryRepo
      .createQueryBuilder('LconSummaryReport')
      .select("TO_CHAR(startdate, 'YYYY-MM') AS date")
      .addSelect("TO_CHAR(startdate, 'YYYY-MM') AS date")
      .addSelect('count(*) AS count')
      .where(where)
      .andWhere('EXTRACT(YEAR FROM startdate) = EXTRACT(YEAR FROM CURRENT_DATE)')
      .groupBy('date')
      .orderBy('date');
    return await qb.getRawMany();
  }

  async getLcon(id: number) {
    return await this.lconSummaryRepo.findOne({ where: { id: id } });
  }
}
