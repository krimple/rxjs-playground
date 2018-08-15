const Database = require('./db');
const seedData = require('./seed');
const Router = require('express').Router;
const db = new Database(seedData);
const createRoutes = () => {
  const router = Router();

  router.get('/chotchkies/:id', async (req, res) => {
    const chotchkieId = parseInt(req.params.id);
    try {
      const chotchkie = await db.getChotchkieById(chotchkieId);
      if (chotchkie) {
        res.status(200).send(chotchkie);
      } else {
        res.status(404).send(`Chotchkie ${chotchkieId} not found.`);
      }
    } catch (e) {
      res.status(500).send(e.toString());
    }
  });

  router.post('/chotchkies', async (req, res) => {
    const candidate = req.body;
    if (candidate) {
      const chotchkie = await db.addChotchkie(candidate);
      res.status(201).send(chotchkie);
    } else {
      res.status(500).send('No Chotchkie passed.');
    }
  });

  router.put('/chotchkies/:id', async (req, res) => {
    try {
      const chotchkie = await db.updateChotchkie(getChotchkieId(req));
      res.status(201).send(chotchkie);
    } catch (e) {
      res.status(500).send(e.toString());
    }
  });

  router.delete('/chotchkies/:id', async (req, res) => {
    try {
      const chotchkieId = parseInt(req.params.id);
      if (!chotchkieId) {
        res.status(500).send('ID not a valid number');
      } else {
        await db.deleteChotchkie(chotchkieId);
        res.status(204).send(`Deleted Chotchkie ${chotchkieId}`);
      }
    } catch (e) {
      // TODO better exception handling
      res.status(500).send(e.toString());
    }
  });

  router.post('/chotchkies/:id/decrementInventory/:amount', async (req, res) => {
    try {
      const chotchkieId = parseInt(req.params.id);
      const amount = parseInt(req.params.amount);
      // TODO - param error check
      const updatedChotchkie = await db.purchaseNChotchkies(chotchkieId, amount);
      res.status(200).send(updatedChotchkie);
    } catch (e) {
      if (e === 'NOT_FOUND') {
        res.status(409).send('chotchkie not found');
      } else if (e === 'LOW_QTY') { 
        res.status(409).send('chotckie quantity is below your order point');
      } else {
        res.status(500).send(e.toString());
      }
    }
  });

  router.get('/chotchkies', (req, res) => {
    res.contentType('json');
    res.status(200).send(db.getAllChotchkies());
  });

  return router;
};


module.exports = createRoutes;
