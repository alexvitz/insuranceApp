let request: IDBOpenDBRequest | undefined;
let db: IDBDatabase;
const version = 1;
const usersStoreName = 'usersDatabaseStore';
const offersStoreName = 'offersDatabaseStore';

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open('usersDatabase', version);

    request.onupgradeneeded = (e) => {
      db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(usersStoreName)) {
        const store = db.createObjectStore(usersStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('email', 'email', { unique: true });
      }
      if (!db.objectStoreNames.contains(offersStoreName)) {
        db.createObjectStore(offersStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (e) => {
      db = (e.target as IDBOpenDBRequest).result;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addUser = async (userData: any) => {
  try {
    const userResult = await addDataToStore(userData, usersStoreName);

    return {
      userData: userResult,
    };
  } catch (error) {
    console.error('Error adding data:', error);
    return null;
  }
};

export const addOFferToDB = async (offerData: any) => {
  try {
    const offerResult = await addDataToStore(offerData, offersStoreName);

    return {
      offerData: offerResult,
    };
  } catch (error) {
    console.error('Error adding data:', error);
    return null;
  }
};

const addDataToStore = (data: any, storeName: string): Promise<any> => {
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    const dataStored = store.add(data);

    tx.oncomplete = () => {
      resolve(dataStored);
    };

    tx.onerror = () => {
      const error = tx.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const getStoreData = (storeName: string): Promise<any[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open('usersDatabase', version);

    request.onsuccess = (e) => {
      db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const getOffersData = async (userID: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open('usersDatabase', version);

    request.onsuccess = (e) => {
      db = (e.target as IDBOpenDBRequest).result;
      const tx = db.transaction(offersStoreName, 'readonly');
      const store = tx.objectStore(offersStoreName);
      const res = store.getAll();
      res.onsuccess = () => {
        const data = res.result.filter((offer) => {
          return offer.uid === userID;
        });
        resolve(data);
      };
      res.onerror = () => {
        reject(new Error('Error retrieving offers data.'));
      };
    };

    request.onerror = () => {
      reject(new Error('Error opening IndexedDB.'));
    };
  });
};

export const loginWithIndexedDB = async (email: any, password: any) => {
  return new Promise((resolve) => {
    const request = indexedDB.open('usersDatabase');

    request.onsuccess = (e: Event) => {
      const db = (e.target as IDBRequest).result as IDBDatabase;
      const tx = db.transaction(usersStoreName, 'readonly');
      const store = tx.objectStore(usersStoreName);
      const index = store.index('email');

      const getRequest = index.get(email);

      getRequest.onsuccess = () => {
        const user = getRequest.result;

        if (user) {
          if (user.password === password) {
            resolve(user);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => {
        resolve(null);
      };
    };

    request.onerror = () => {
      resolve(null);
    };
  });
};
