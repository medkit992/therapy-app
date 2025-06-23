import { Router, RequestHandler } from "express";
import { validateBody } from "../middleware/validate";
import { AppDataSource } from "../data-source";
import { History } from "../entity/History";

const repo = AppDataSource.getRepository(History);
const router = Router();

const listHistory: RequestHandler = async (req, res, next) => {
    try {
        const all = await repo.find();
        res.json(all);
        return;
    } catch (err) {
        next(err);
    }
};

const getHistory: RequestHandler = async (req, res, next) => {
    try {
        const h = await repo.findOneBy({ id: req.params.id });
        if (!h) { res.sendStatus(404); return; }
        res.json(h);
        return;
    } catch (err) {
        next(err);
    }
};

const createHistory: RequestHandler = async (req, res, next) => {
    try {
        const h = repo.create(req.body);
        const saved = await repo.save(h);
        res.status(201).json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const updateHistory: RequestHandler = async (req, res, next) => {
    try {
        const loaded = await repo.preload({ id: req.params.id, ...req.body });
        if (!loaded) { res.sendStatus(404); return; }
        const saved = await repo.save(loaded);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const patchHistory: RequestHandler = async (req, res, next) => {
    try {
        const h = await repo.findOneBy({ id: req.params.id });
        if (!h) { res.sendStatus(404); return; }
        repo.merge(h, req.body);
        const saved = await repo.save(h);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const deleteHistory: RequestHandler = async (req, res, next) => {
    try {
        const result = await repo.delete(req.params.id);
        if (!result.affected) { res.sendStatus(404); return; }
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

router.get("/", listHistory);
router.post("/", validateBody(History) as RequestHandler, createHistory);
router.get("/:id", getHistory);
router.put("/:id", validateBody(History) as RequestHandler, updateHistory);
router.patch("/:id", validateBody(History) as RequestHandler, patchHistory);
router.delete("/:id", deleteHistory);

export default router;
