import { Users } from '../entity/Users';
import { Earnings } from '../entity/Earnings';

import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

class EarningsController {
  public async store(req: Request, res: Response) {
    const { user_id, earning_date, type, category, value } = req.body;

    try {


      const new_earning = await getRepository(Earnings).create({
        registered_at: new Date(),
        earning_date,
        type,
        category,
        value,
      });

      const earning = await getRepository(Earnings).save(new_earning);

      await getConnection().createQueryBuilder().relation(Users, "earnings").of(user_id).add(earning.id);

      const user = await getRepository(Users).findOne({ id: user_id });

      return res.json(user?.earnings)
    } catch (error) {
      return res.status(500).json({ error: "Ocurred an internal error" })
    }
  }
}


export default new EarningsController();