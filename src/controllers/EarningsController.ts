import { Users } from '../entity/Users';
import { Earnings } from '../entity/Earnings';

import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

class EarningsController {
  public async store(req: Request, res: Response): Promise<Response> {
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
      return res.json(earning)
    } catch (error) {
      return res.status(500).json({ error: "Ocurred an internal error" })
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    try {
      const user = await getRepository(Users).findOne({ id: user_id })
      const earnings = await getConnection().createQueryBuilder().relation(Users, 'earnings').of(user).loadMany();
      return res.json({ earnings });
    } catch (error) {
      return res.status(422).json({ message: "A error ocurred" })
    }

  }
}


export default new EarningsController();