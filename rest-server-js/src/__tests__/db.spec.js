const Database = require('../db');
const originalSeedData = JSON.stringify(require('../seed'));
describe('Database API', () => {
  let db;

  beforeEach(() => {
    db = new Database(JSON.parse(originalSeedData));
  });

  it('should exist', () => {
    expect(db).toBeDefined();
  });

  it('should find an item', async () => {
    const item = await db.getChotchkieById(1);
    expect(item).toBeDefined();
  });

  it('should update an item', async () => {
    const item = await db.getChotchkieById(1);
    const updatedItem = await db.updateChotchkie(1, {
      name: 'foo',
      value: 'bar'
    });

    const fetchedUpdatedItem = await db.getChotchkieById(1);
    expect(fetchedUpdatedItem).toEqual({
      id: 1,
      name: 'foo',
      value: 'bar'
    });
    expect(fetchedUpdatedItem).not.toEqual(item);
  });

  it('should patch an item', async () => {
    const item = await db.getChotchkieById(1);
    const updatedItem = await db.patchChotchkie(1, {
      name: 'foo',
      value: 'bar'
    });

    const fetchedUpdatedItem = await db.getChotchkieById(1);
    expect(fetchedUpdatedItem).not.toEqual({
      id: 1,
      name: 'foo',
      value: 'bar'
    });
    expect(fetchedUpdatedItem.description).toBeDefined();
    expect(fetchedUpdatedItem).not.toEqual(item);   
  });

  it('should delete an item', async () => {
    let chotchkies = await db.getAllChotchkies();
    const numItems = chotchkies.length;
    await db.deleteChotchkie(1);
    chotchkies = await db.getAllChotchkies();
    expect(chotchkies.length === numItems - 1);
  })

});