import { Router } from "express";
import { getResults, updateResults, search } from "../services/servers.service";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: getResults() });
});

router.get("/search", async (req, res) => {
  const query = req.query;
  const pageID = parseInt(query.page || 0);
  const result = await search(query, isNaN(pageID) ? 0 : pageID);
  res.json({ data: result });
});

router.get("/stats", (req, res) => {
  res.json({
    data: {
      serversTotal: getResults().total,
      serversOnline: getResults().totalOnline,
      players: getResults().players,
      addresses: process.env.MASK_SCANNED * (256 * 256),
    },
  });
});

router.get("/standalone", (req, res) => {
  res.json({ data: getResults().byStandalone });
});

router.get("/proxies", (req, res) => {
  res.json({ data: getResults().byProxies });
});

router.get("/versions", (req, res) => {
  res.json({ data: getResults().byVersions });
});

router.all("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    statusCode: 404,
  });
});

setTimeout(() => {
  updateResults();
}, 60 * 60 * 1000);

updateResults();

export default router;
