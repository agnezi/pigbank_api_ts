import { Users } from '../entity/Users';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authConfig from '../config/auth.json';


class UsersController {

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, username, email, phone } = req.body;
    let { password } = req.body;
    try {
      if (name && username && email && phone) {
        const checkUserExistence = await getRepository(Users).findOne({ username }) || await getRepository(Users).findOne({ phone }) || await getRepository(Users).findOne({ email })

        if (checkUserExistence) {
          return res.status(406).json({ error: 'Username, email or phone already exists ' })
        }

        const hash = await bcrypt.hash(password, 10);
        password = hash;

        const new_user = getRepository(Users).create({
          name,
          username,
          email,
          phone,
          password,
        })

        await getRepository(Users).save(new_user);
        const token = jwt.sign({ id: new_user.id }, authConfig.secret, {
          expiresIn: 864000
        });

        const user = await getRepository(Users).findOne({ id: new_user.id })

        return res.status(200).json({ user, token });
      } else {
        return res.status(500).json({ error: 'A internal error ocurred' })
      }

    } catch (error) {
      return res.status(500).json({ error: "Ocurred an internal error" })
    }
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      let { password } = req.body;
      const user = await getRepository(Users).findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const userPassword = await getRepository(Users).query(
        `SELECT password FROM users WHERE id='${user.id}'`)

      if (!(await bcrypt.compare(password, userPassword[0].password))) {
        return res.status(400).send({ error: "Invalid email or password" })
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
      });

      return res.json({ user, token })

    } catch (error) {
      return res.status(400).json({ error: "Siging failure" })
    }
  }

}

export default new UsersController();