import { Users } from '../entity/Users';
import { Earnings } from '../entity/Earnings';

import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

class EarningsController {
	public async store(req: Request, res: Response): Promise<Response> {
		const { user_id, earning_date, type, category, value } = req.body;

		try {
			const new_earning = getRepository(Earnings).create({
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

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const { earning_id, earning_date, type, category, value } = req.body;
			const { user_id } = req.params;

			// check if user exists
			await getRepository(Users).findOneOrFail({ id: user_id });

			await getRepository(Earnings).update(earning_id, {
				earning_date, type, category, value
			})

			const earning_updated = await getRepository(Earnings).findOne({ id: earning_id })

			return res.json(earning_updated);

		} catch (error) {
			return res.status(422).json({ message: "An error ocurred" })
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { user_id, earning_id } = req.params;

			//check if user exists
			await getRepository(Users).findOneOrFail({ id: user_id })

			await getRepository(Earnings).delete({ id: earning_id })

			return res.json({ message: 'Successfuly removed' })

		} catch (error) {
			return res.status(422).json({ message: "An error ocurred" })
		}
	}
}

export default new EarningsController();