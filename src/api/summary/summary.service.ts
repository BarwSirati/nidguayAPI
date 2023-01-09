import { Injectable } from '@nestjs/common';
import { creditSum } from 'src/shared/class/creditSum.class';
import { SummaryClass } from 'src/shared/class/summary.class';
import { SummaryByEducation } from 'src/shared/class/summaryByEducation.class';

import { CreditService } from '../credit/credit.service';
import { EducationService } from '../education/education.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SummaryService {
  constructor(
    private educationService: EducationService,
    private creditService: CreditService,
    private userService: UserService,
  ) {}
  async findAll(userId: string): Promise<SummaryByEducation[]> {
    const educations = await this.educationService.findByUserId(userId);
    const results = [];
    for (let i = 0; i < educations.length; i++) {
      const creditSum: creditSum = await this.creditService.creditSumByYear(
        educations[i].id,
      );
      results[i] = {
        educationId: educations[i].id,
        total: creditSum.totalCredit ? +creditSum.totalCredit : 0,
      };
    }
    return results;
  }

  async summary(userId: string): Promise<SummaryClass[]> {
    const user = await this.userService.findOne(userId);
    if (user) {
      const credits = await this.creditService.findAll(userId);

      const summaryCredit = [];
      for (let i = 0; i < credits.length; i++) {
        const credit = credits[i];
        const newCredit: SummaryClass = {
          typeCourse: credit.credit_typeCourse,
          note: credit.credit_note,
          credit: +credit.sum,
          total:
            credit.credit_typeCourse === 'free_electives'
              ? user.credit[credit.credit_typeCourse]
              : user.credit[credit.credit_typeCourse][credit.credit_note],
        };
        summaryCredit[i] = newCredit;
      }
      return summaryCredit;
    }
  }
}
