class Database {
  constructor(seed) {
    this.database = seed;
    this.nextKey = this.database.chotchkies.reduce((acc, curr) => { return curr.id > acc ? curr.id : acc }, 0);
  }

  /** return a clone of the collection */
  getAllChotchkies() {
   return [ ...this.database.chotchkies];
  }

  /** return a clone of the item of the collection with the given id */
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

  /** TODO: deal with case sensitivity */
  chotchkieByNameExists(term) {
    const result = this.database.chotchkies.findIndex(chotchkie => {
      console.log(`comparing ${term} to ${chotchkie.name} in ${JSON.stringify(term)}`);
      return chotchkie.name === term;
    });
    console.log(`search results: ${result}`);
    return result > -1;
  }

  /** TODO: deal with case sensitivity and handle missing values in name, description, even term */
  findChotchkiesByFuzzySearchTerm(term) {
    const matches = this.database.chotchkies.filter(chotchkie =>
      chotchkie.name.search(term) > -1 ||
      chotchkie.description.search(term) > -1);
    if (matches) {
      return [ ...matches ];
    } else {
      return [];
    }
  }

  /** Add a new item, incrementing the current key. This isn't a
   * real world database, just a toy, so we do the increment internally.
   * TODO: Someday convert this whole thing to a real database
   */
  addChotchkie(chotchkie) {
    // The worst concurrency bug ever. This is just a toy app, folks
    this.nextKey++;
    chotchkie.id = this.nextKey;
    this.database.chotchkies.push(chotchkie);
    return Promise.resolve({ ...chotchkie });
  }

  /** Replace the chotchkie with the given id with all the props and the key */
  updateChotchkie(id, props) {
    const chotchkieIndex = this.database.chotchkies.findIndex(c => c.id === id);
    if (chotchkieIndex > -1) {
      this.database.chotchkies[chotchkieIndex] = { id, ...props };
      return Promise.resolve({ ...this.database.chotchkies[chotchkieIndex] });
    }

    throw new Error(`Could not find chotchkie with id ${id}`);
  }

  /** Patch only the field changes passed. If the user passes purchasedQuantity,
   * look up the quantity on hand, and verify the user can purchase that quantity
   * without running negative. If so, make the change.
   *
   * TODO: real dataase, real locking. This.is.a.toy.
   */
  async patchChotchkie(id, props) {
    const chotchkieIndex = this.database.chotchkies.findIndex(c => c.id === id);
    if (chotchkieIndex === -1) {
      return Promise.reject('NOT_FOUND');
    }
    const currentChotchkie = this.database.chotchkies[chotchkieIndex];

    if (!currentChotchkie) {
      return Promise.reject('NOT_FOUND');
    }

    if (props.purchasedQuantity) {
      const newQuantity = currentChotchkie.quantityOnHand - props.purchasedQuantity;
      if (newQuantity < 0) {
        return Promise.reject('LOW_QTY');
      }

      // remove the artificial prop
      delete props.purchasedQuantity;

      this.database.chotchkies[chotchkieIndex] = {
        ...currentChotchkie,
        ...props,
        quantityOnHand: newQuantity
      };

    } else {
      this.database.chotchkies[chotchkieIndex] = {
        ...currentChotchkie,
        ...props
      };
    }
    return Promise.resolve({ ...this.database.chotchkies[chotchkieIndex] });
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
