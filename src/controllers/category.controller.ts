import { isNumberString, validate } from "class-validator";
import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { Movie } from "../entity/Movie";

export async function getCategories(
    req: Request,
    res: Response
): Promise<any> {
    const categories = await Category.find();
    return res.json(categories);
};


export async function getCategoryBySlug(
    req: Request,
    res: Response) {
    const category = await Category.findOne({ slug: req.params.slug }, { relations: ['movies'] });
    return category ? res.json(category) : res.sendStatus(404);
}

export async function getCategoryLabelsByID(
    req: Request,
    res: Response
) {
    if (!Array.isArray(req.query.ids)) {
        return res.sendStatus(403);
    }

    const ids = (req.query.ids as any).map((id: any) => { return +id })
    for (const id of ids) {
        if (!id || id < 0) {
            return res.sendStatus(403);
        }
    }

    try {
        const categoriesLabels = (await Category.findByIds(ids)).map(c => c.label);
        return categoriesLabels.length ? res.json(categoriesLabels) : res.sendStatus(404);
    } catch {
        return res.sendStatus(500);//todo: must become globally
    }
}


export async function moviesByCategoryId(
    req: Request,
    res: Response
): Promise<any> {

    const id = req.params.id;
    if (!isNumberString(id)) {
        return res.sendStatus(400);
    }

    const category = await Category.findOne(id, { relations: ["movies"] })
    if (!category) {
        return res.sendStatus(404);
    }

    return res.json(category.movies);

}

export async function addCategory(
    req: Request,
    res: Response
): Promise<any> {
    const data = req.body;


    let a = new Category();
    Object.assign(a, data);
    const errors = await validate(a);
    if (errors.length > 0) {
        return res.sendStatus(400);
    }
    await a.save();
    return res.json(a);
}

export async function editCategory(
    req: Request,
    res: Response
): Promise<any> {
    const id = req.params.id;
    const data = req.body;
    if (!id || !data) {
        return res.sendStatus(400);
    }

    const a = await Category.findOne(id);

    if (!a) {
        return res.sendStatus(404);
    }

    Object.assign(a, data);
    const errors = await validate(a);
    if (errors.length > 0) {
        return res.sendStatus(400);
    }
    await a.save();
    return res.json(a);
}