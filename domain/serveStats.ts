import { db } from "@/firebase/config";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export const serveStats = async (region: string) => {
  const dbCollection = process.env.DB_COLLECTION;
  const statsRef = collection(db, dbCollection);
  const snapshot = await getDocs(
    query(statsRef, where("region", "==", region), orderBy("timestamp", "desc"), limit(1))
  );
  return snapshot.docs[0].data();
};
