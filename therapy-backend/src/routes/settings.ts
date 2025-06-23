import { Router, RequestHandler } from "express";
import { validateBody } from "../middleware/validate";
import { AppDataSource } from "../data-source";
import { Setting } from "../entity/Setting";

const repo = AppDataSource.getRepository(Setting);
const router = Router();

const listSettings: RequestHandler = async (req, res, next) => {
    try {
        const all = await repo.find();
        res.json(all);
        return;
    } catch (err) {
        next(err);
    }
};

const getSetting: RequestHandler = async (req, res, next) => {
    try {
        const s = await repo.findOneBy({ id: req.params.id });
        if (!s) { res.sendStatus(404); return; }
        res.json(s);
        return;
    } catch (err) {
        next(err);
    }
};

const createSetting: RequestHandler = async (req, res, next) => {
    try {
        const s = repo.create(req.body);
        const saved = await repo.save(s);
        res.status(201).json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const updateSetting: RequestHandler = async (req, res, next) => {
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

const patchSetting: RequestHandler = async (req, res, next) => {
    try {
        const s = await repo.findOneBy({ id: req.params.id });
        if (!s) { res.sendStatus(404); return; }
        repo.merge(s, req.body);
        const saved = await repo.save(s);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const deleteSetting: RequestHandler = async (req, res, next) => {
    try {
        const result = await repo.delete(req.params.id);
        if (!result.affected) { res.sendStatus(404); return; }
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

router.get("/", listSettings);
router.post("/", validateBody(Setting) as RequestHandler, createSetting);
router.get("/:id", getSetting);
router.put("/:id", validateBody(Setting) as RequestHandler, updateSetting);
router.patch("/:id", validateBody(Setting) as RequestHandler, patchSetting);
router.delete("/:id", deleteSetting);

export default router;
