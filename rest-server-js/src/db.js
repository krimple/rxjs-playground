class Database {
  constructor(seed) {
    this.database = seed;
    this.nextKey = this.database.chotchkies.reduce((acc, curr) => { return curr.id > acc ? curr.id : acc }, 0);
  }

  getAllChotchkies() {
   return [ ...this.database.chotchkies];
  }

  getChotchkieById(id) {
    const chotchkie = this.database.chotchkies.find((candidate) => {
      return (candidate.id === id);
    });
    if (chotchkie) {
      return Promise.resolve({ ...chotchkie});

    } else {
      throw new Error(`No chotchkie found with id of ${id}`);
    }
  }

  addChotchkie(chotchkie) {
    // The worst concurrency bug ever. This is just a toy app, folks
    this.nextKey++;
    chotchkie.id = this.nextKey;
    this.database.chotchkies.push(chotchkie);
    return Promise.resolve({ ...chotchkie });
  }

  updateChotchkie(id, props) {
    const chotchkieIndex = this.database.chotchkies.findIndex(c => c.id === id);
    if (chotchkieIndex > -1) {
      this.database.chotchkies[chotchkieIndex] = { id, ...props };
      return Promise.resolve({ ...this.database.chotchkies[chotchkieIndex] });
    }

    throw new Error(`Could not find chotchkie with id ${id}`);
  }

  patchChotchkie(id, props) {
    const chotchkieIndex = this.database.chotchkies.findIndex(c => c.id === id);
    if (chotchkieIndex > -1) {
      const currentChotchkie = this.database.chotchkies[chotchkieIndex];
      const updatedChotchkie = { ...currentChotchkie, ...props };
      this.database.chotchkies[chotchkieIndex] = updatedChotchkie;
      return Promise.resolve({ ... updatedChotchkie });
    }
    throw new Error(`Could not find chotchkie with id ${id}`);
  }

  purchaseNChotchkies(id, qty) {
    const chotchkie = findChotchkie(this.database, id);
    if (!chotchkie) {
      return Promise.reject('NOT_FOUND');
    } else if (chotchkie.quantityOnHand - qty < 0) {
      return Promise.reject('LOW_QTY');
    } else {
      chotchkie.quantityOnHand -= qty;
      return Promise.resolve({ ...chotchkie });
    }
  }

  deleteChotchkie(id) {
    if (!id || typeof id !== 'number') {
      return promise.reject('no id passed');
    } 

    const chotchkieIndex = this.database.chotchkies.findIndex(c => c.id === id);
    if (chotchkieIndex > -1) {
      this.database.chotchkies.splice(chotchkieIndex, 1);
      return Promise.resolve('deleted.');
    } else {
      return Promise.reject('id not found');
    }
  }
}

function findChotchkie(db, id) {
  return db.chotchkies.find(c => c.id === id);
}

module.exports = Database;