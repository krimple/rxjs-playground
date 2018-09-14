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

  router.get('/chotchkies', (req, res) => {
    res.contentType('json');
    const searchTerm = req.query.searchTerm;
    const name = req.query.name;

    debugger;
    if (!searchTerm && !name) {
      delayedSendChotchkiesList(res);
    } else {
     if (name) {
        delayedSearchForChotchkieByName(req, res, name);
      } else {
        delayedHandleFuzzySearchTerm(req, res, searchTerm);
      }
    }
  });

  function delayedSendChotchkiesList(res) {
    setTimeout(() => {
        res.status(200).send(db.getAllChotchkies());
      }, Math.random() * 500);
  }

  async function delayedSearchForChotchkieByName(req, res, name) {
   console.log(`Searching for ${decodedName}`);
    try {
      const result = await db.chotchkieByNameExists(safelyDecodeString(decodedName));
      setTimeout(() => {
        res.status(200).send(result);
      }, Math.random() * 3000);
    } catch (e) {
      console.log(e);
      res.status(404).send(`Chotchkie with name ${decodedName} not found. Reason ${JSON.stringify(e)}`);
    }
  }

  async function delayedHandleFuzzySearchTerm(req, res, searchTerm) {
    const decodedSearchTerm = safelyDecodeString(searchTerm);
    try {
      const result = await db.findChotchkiesByFuzzySearchTerm(safelyDecodeString(decodedSearchTerm));
      setTimeout(() => {
        res.status(200).send(result);
      }, Math.random() * 3000);
    } catch (e) {
      console.log(e);
      res.status(404).send(`Chotchkie with search term ${decodedSearchTerm} not found. Reason ${JSON.stringify(e)}`);
    }
  }

  function safelyDecodeString(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      console.log(`cannot decode search term`, e);
      return '';
    }
  }

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

  router.patch('/chotchkies/:id', async (req, res) => {
    try {
      const chotchkieId = parseInt(req.params.id);
      console.log(`Patching ${chotchkieId}`);
      if (!chotchkieId) {
        res.status(500).send('ID not a valid number');
      } else {
        const targetChanges = req.body;
        const updatedChotchkie = await db.patchChotchkie(chotchkieId, targetChanges);
        res.status(200).send(updatedChotchkie);
      }
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


  return router;
};


function getChotchkieId(req) {
  return parseInt(req.params.id) || undefined;
}

module.exports = createRoutes;
