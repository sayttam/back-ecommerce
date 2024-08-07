import { Router } from 'express';

const router = Router();

router.get("/setCookie", (req, res) => {
    res.cookie("userData", "Welcome Joel", { maxAge: 100000, signed: true }).send("Cookies setted");
});

router.get("/getCookie", (req, res) => {
    res.send(req.signedCookies.userData);
});

router.get("/deleteCookie", (req, res) => {
    res.clearCookie("userData").send("Cookie deleted");
});

router.post("/setData", (req, res) => {
    const { user, email } = req.body;
    res.cookie("appUser", { user, email }, { maxAge: 100000, signed: true }).send("User data setted");
});

router.get("/getData", (req, res) => {
    res.send(req.signedCookies.appUser || {});
});

export default router;