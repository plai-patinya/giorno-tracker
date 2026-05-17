import { openDB } from "idb";

const DB_NAME =
  "giorno-tracker-db";

const DB_VERSION = 1;

const EXPENSE_STORE =
  "expenses";

const FUEL_STORE =
  "fuelRecords";

export const initDB =
  async () => {

    return openDB(
      DB_NAME,
      DB_VERSION,

      {

        upgrade(db) {

          // expenses
          if (
            !db.objectStoreNames.contains(
              EXPENSE_STORE
            )
          ) {

            db.createObjectStore(
              EXPENSE_STORE,
              {
                keyPath: "id"
              }
            );

          }

          // fuel
          if (
            !db.objectStoreNames.contains(
              FUEL_STORE
            )
          ) {

            db.createObjectStore(
              FUEL_STORE,
              {
                keyPath: "id"
              }
            );

          }

        }

      }
    );

};

//
// EXPENSES
//

export const saveExpensesToDB =
  async (expenses) => {

    const db = await initDB();

    const tx =
      db.transaction(
        EXPENSE_STORE,
        "readwrite"
      );

    const store =
      tx.objectStore(
        EXPENSE_STORE
      );

    // clear old
    await store.clear();

    // insert new
    for (const item of expenses) {

      await store.put(item);

    }

    await tx.done;

};

export const getExpensesFromDB =
  async () => {

    const db = await initDB();

    return db.getAll(
      EXPENSE_STORE
    );

};

//
// FUEL
//

export const saveFuelToDB =
  async (fuelRecords) => {

    const db = await initDB();

    const tx =
      db.transaction(
        FUEL_STORE,
        "readwrite"
      );

    const store =
      tx.objectStore(
        FUEL_STORE
      );

    await store.clear();

    for (const item of fuelRecords) {

      await store.put(item);

    }

    await tx.done;

};

export const getFuelFromDB =
  async () => {

    const db = await initDB();

    return db.getAll(
      FUEL_STORE
    );

};