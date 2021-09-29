import { Router } from "express";
import { getResults, updateResults } from "../services/servers.service";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: getResults() })
});

router.get("/stats", (req, res) => {
  res.json({ data: {
    serversTotal: getResults().total,
    serversOnline: "Not yet",
    players: "Not yet",
    addresses: process.env.MASK_SCANNED * (256 * 256)
  } })
})

router.get("/standalone", (req, res) => {
  res.json({ data: getResults().byStandalone })
});

router.get("/proxies", (req, res) => {
  res.json({ data: getResults().byProxies })
});

router.get("/versions", (req, res) => {
  res.json({ data: getResults().byVersions })
});

router.all("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    statusCode: 404
  })
});

setTimeout(() => {
  updateResults();
}, 60 * 60 * 1000);

updateResults();

export default router;
