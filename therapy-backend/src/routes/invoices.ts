import { Router, RequestHandler } from "express";
import { validateBody } from "../middleware/validate";
import { AppDataSource } from "../data-source";
import { Invoice } from "../entity/Invoice";

const repo = AppDataSource.getRepository(Invoice);
const router = Router();

const listInv: RequestHandler = async (req, res, next) => {
    try {
        const all = await repo.find({ relations: ["client"] });
        res.json(all);
        return;
    } catch (err) {
        next(err);
    }
};

const getInv: RequestHandler = async (req, res, next) => {
    try {
        const i = await repo.findOne({
            where: { id: req.params.id },
            relations: ["client"],
        });
        if (!i) { res.sendStatus(404); return; }
        res.json(i);
        return;
    } catch (err) {
        next(err);
    }
};

const createInv: RequestHandler = async (req, res, next) => {
    try {
        const inv = repo.create(req.body);
        const saved = await repo.save(inv);
        res.status(201).json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const updateInv: RequestHandler = async (req, res, next) => {
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

const patchInv: RequestHandler = async (req, res, next) => {
    try {
        const i = await repo.findOneBy({ id: req.params.id });
        if (!i) { res.sendStatus(404); return; }
        repo.merge(i, req.body);
        const saved = await repo.save(i);
        res.json(saved);
        return;
    } catch (err) {
        next(err);
    }
};

const deleteInv: RequestHandler = async (req, res, next) => {
    try {
        const result = await repo.delete(req.params.id);
        if (!result.affected) { res.sendStatus(404); return; }
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

router.get("/", listInv);
router.post("/", validateBody(Invoice) as RequestHandler, createInv);
router.get("/:id", getInv);
router.put("/:id", validateBody(Invoice) as RequestHandler, updateInv);
router.patch("/:id", validateBody(Invoice) as RequestHandler, patchInv);
router.delete("/:id", deleteInv);

export default router;
