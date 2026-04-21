const DB_NAME = "al-lord-store-db";
const STORE_NAME = "admin-statuses";

export async function initDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveStatuses(statuses: any[]) {
  const db = await initDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  // Clear existing to sync with current state
  await new Promise((resolve) => {
    const clearReq = store.clear();
    clearReq.onsuccess = resolve;
  });

  for (const status of statuses) {
    store.put(status);
  }
  
  return new Promise((resolve) => {
    tx.oncomplete = resolve;
  });
}

export async function getStatuses(): Promise<any[]> {
  const db = await initDb();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
