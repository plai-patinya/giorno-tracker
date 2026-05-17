import { openDB } from "idb";

const DB_NAME =
  "giorno-mutation-queue";

const STORE_NAME =
  "mutations";

const initQueueDB =
  async () => {

    return openDB(
      DB_NAME,
      1,
      {

        upgrade(db) {

          if (
            !db.objectStoreNames.contains(
              STORE_NAME
            )
          ) {

            db.createObjectStore(
              STORE_NAME,
              {
                keyPath: "id",
                autoIncrement: true
              }
            );

          }

        }

      }
    );

};

//
// ➕ Add mutation
//

export const addMutation =
  async (mutation) => {

    const db =
      await initQueueDB();

    return db.add(
      STORE_NAME,
      {
        ...mutation,

        createdAt:
          Date.now()
      }
    );

};

//
// 📥 Get all mutations
//

export const getMutations =
  async () => {

    const db =
      await initQueueDB();

    return db.getAll(
      STORE_NAME
    );

};

//
// ❌ Delete mutation
//

export const deleteMutation =
  async (id) => {

    const db =
      await initQueueDB();

    return db.delete(
      STORE_NAME,
      id
    );

};

//
// 🔄 Replay queued mutations
//

export const replayMutations =
  async (
    replayHandler
  ) => {

    const mutations =
      await getMutations();

    for (const mutation of mutations) {

      try {

        await replayHandler(
          mutation
        );

        // ✅ success
        await deleteMutation(
          mutation.id
        );

      } catch (error) {

        console.error(
          "Replay failed:",
          error
        );

      }

    }

};