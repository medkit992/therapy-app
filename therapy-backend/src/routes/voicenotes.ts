import { Router, RequestHandler } from "express";
import { validateBody } from "../middleware/validate";
import { AppDataSource } from "../data-source";
import { VoiceNote } from "../entity/VoiceNote";

const repo = AppDataSource.getRepository(VoiceNote);
const router = Router();

const listVN: RequestHandler = async (req, res, next) => {
    try {
        const all = await repo.find({ relations: ["client"] });
        res.json(all);
        return;
    } catch (err) {
        next(err);
    }
};

const getVN: RequestHandler = async (req, res, next) => {
    try {
        const v = await repo.findOne({
            where: { id: req.params.id },
            relations: ["client"],
        });
        if (!v) { res.sendStatus(404); return; }
        res.json(v);
        return;
    } catch (err) {
        next(err);
    }
};

const createVN: RequestHandler = async (req, res, next) => {
    try {
        const v = repo.create(req.body);
        const saved = await repo.save(v);
        res.status(201).json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const updateVN: RequestHandler = async (req, res, next) => {
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

const patchVN: RequestHandler = async (req, res, next) => {
    try {
        const v = await repo.findOneBy({ id: req.params.id });
        if (!v) { res.sendStatus(404); return; }
        repo.merge(v, req.body);
        const saved = await repo.save(v);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const deleteVN: RequestHandler = async (req, res, next) => {
    try {
        const result = await repo.delete(req.params.id);
        if (!result.affected) { res.sendStatus(404); return; }
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

router.get("/", listVN);
router.post("/", validateBody(VoiceNote) as RequestHandler, createVN);
router.get("/:id", getVN);
router.put("/:id", validateBody(VoiceNote) as RequestHandler, updateVN);
router.patch("/:id", validateBody(VoiceNote) as RequestHandler, patchVN);
router.delete("/:id", deleteVN);

export default router;
