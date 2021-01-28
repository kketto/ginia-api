import { validate } from "class-validator";
import { Request, Response } from "express";
import { Slide } from "../entity/Slide";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {

    const data = req.body;

    let user = new User();

    Object.assign(user, data);

    const errors = await validate(user);
    if (errors.length > 0) {
        return res.sendStatus(400);
    }
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    delete (user as any).password;
    return res.json(user);

}

export async function login(req: Request, res: Response) {

    const { userName, password } = req.query as any;
    if (!userName || !password) {
        return res.sendStatus(400);
    }

    let user = await User.findOne({ userName });
    if (!user) {
        return res.sendStatus(400);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        console.log(333333333333, match, user);

        return res.sendStatus(400);

    }
    const accessToken = jwt.sign({ userName: user.userName, fullName: user.fullName, role: user.role }, "I'm Perfect");


    return res.json(accessToken);
}