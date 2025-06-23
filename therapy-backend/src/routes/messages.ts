import { Router, RequestHandler } from "express";
import { validateBody } from "../middleware/validate";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";

const repo = AppDataSource.getRepository(Message);
const router = Router();

const listMessages: RequestHandler = async (req, res, next) => {
    try {
        const all = await repo.find();
        res.json(all);
        return;
    } catch (err) {
        next(err);
    }
};

const getMessage: RequestHandler = async (req, res, next) => {
    try {
        const m = await repo.findOneBy({ id: req.params.id });
        if (!m) { res.sendStatus(404); return; }
        res.json(m);
        return;
    } catch (err) {
        next(err);
    }
};

const createMessage: RequestHandler = async (req, res, next) => {
    try {
        const m = repo.create(req.body);
        const saved = await repo.save(m);
        res.status(201).json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const updateMessage: RequestHandler = async (req, res, next) => {
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

const patchMessage: RequestHandler = async (req, res, next) => {
    try {
        const m = await repo.findOneBy({ id: req.params.id });
        if (!m) { res.sendStatus(404); return; }
        repo.merge(m, req.body);
        const saved = await repo.save(m);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const deleteMessage: RequestHandler = async (req, res, next) => {
    try {
        const result = await repo.delete(req.params.id);
        if (!result.affected) { res.sendStatus(404); return; }
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

router.get("/", listMessages);
router.post("/", validateBody(Message) as RequestHandler, createMessage);
router.get("/:id", getMessage);
router.put("/:id", validateBody(Message) as RequestHandler, updateMessage);
router.patch("/:id", validateBody(Message) as RequestHandler, patchMessage);
router.delete("/:id", deleteMessage);

export default router;
