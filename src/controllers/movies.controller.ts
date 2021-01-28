import { isNumberString, validate } from "class-validator";
import { Request, Response } from "express";
import { FindOperator } from "typeorm";
import { Category } from "../entity/Category";
import { Movie } from "../entity/Movie";
import jwt from 'jsonwebtoken';

export async function getMovies(
    req: Request,
    res: Response
): Promise<any> {
    // const a = new Movie();
    // a.title = 'KETI';
    // a.imageSrc = 'd';
    // a.videoSrc = 'd';
    // a.year = 2021;
    // a.cast = 'kupat';
    // a.director = 'bublik';
    // await a.save();

    const movies = await Movie.find();

    return res.json(movies);
}


export async function getMovieById(
    req: Request,
    res: Response
): Promise<any> {
    const id = req.params.id;
    if (!isNumberString(id)) {
        return res.sendStatus(400);
    }
    const movie = await Movie.findOne(id, { relations: ['categories'] });

    return movie ? res.json(movie) : res.sendStatus(404);
}

export async function searchMovie(
    req: Request,
    res: Response
): Promise<any> {

    const searchTerm = `%${req.params.term.toLowerCase()}%`

    const movies = await Movie.find({
        where: [{ title: new FindOperator("like", searchTerm) },
        { director: new FindOperator("like", searchTerm) },
        { cast: new FindOperator("like", searchTerm) }]
    });

    return res.json(movies);
}

export async function addMovie(
    req: Request,
    res: Response
): Promise<any> {
    const token = req.headers.authorization;//?.split(' ')[1];
    if (!token) {
        return res.sendStatus(460);
    }
    const verify = jwt.verify(token, "I'm Perfect") as any;
    if (!verify || verify.role !== 2 && verify.role !== 3) {
        return res.sendStatus(460);
    }

    const data = req.body;
    if (data.cast && !Array.isArray(data.cast)) {
        return res.sendStatus(400);
    }
    data.cast = data.cast.join(',');

    let a = new Movie();
    Object.assign(a, data);
    let c = await Category.findByIds(data.categorieIds);
    a.categories = c;
    const errors = await validate(a);
    if (errors.length > 0) {
        return res.sendStatus(400);
    }
    await a.save();
    return res.json(a);
}

export async function changeRate(
    req: Request,
    res: Response
): Promise<any> {
    const id = req.params.id;
    const rate = req.body.rate;

    if (!id || !rate) {
        return res.sendStatus(400);
    }

    const movie = await Movie.findOne(id);

    if (!movie) {
        return res.sendStatus(404);
    }

    const rateCount = movie.rateCount || 0;
    movie.rateCount = rateCount + 1;
    movie.rating = (movie.rating * rateCount + rate) / movie.rateCount


    await movie.save();

    return res.json(movie.rating);

}
export async function editMovie(
    req: Request,
    res: Response
): Promise<any> {
    const id = req.params.id;
    const data = req.body;
    if (!id || !data) {
        return res.sendStatus(400);
    }
    if (data.cast && !Array.isArray(data.cast)) {
        return res.sendStatus(400);
    }
    data.cast = data.cast.join(',');


    const a = await Movie.findOne(id);

    if (!a) {
        return res.sendStatus(404);
    }

    Object.assign(a, data);
    let c = await Category.findByIds(data.categorieIds);
    a.categories = c;
    const errors = await validate(a);
    if (errors.length > 0) {
        return res.sendStatus(400);
    }
    await a.save();
    return res.json(a);
}


// editMovie(id: number, movie: Partial<Movie>): void {
//     let editMovie = this.getMovieById(id);
//     editMovie.title = movie.title;
//     editMovie.videoSrc = movie.videoSrc;
//     editMovie.imageSrc = movie.imageSrc;
//     editMovie.year = movie.year;
//     editMovie.cast = movie.cast;
//     editMovie.director = movie.director;
//     editMovie.description = movie.description;
//     editMovie.categorieIds = movie.categorieIds;

//     this.localStorageService.setItem("movies", this.movies);
// }



