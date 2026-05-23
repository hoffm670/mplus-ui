import { db } from "@/firebase/config";
import { getStatsCollection, Title } from "@/domain/constants";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export const serveStats = async (region: string, title: Title) => {
  const statsRef = collection(db, getStatsCollection(title));
  const snapshot = await getDocs(
    query(statsRef, where("region", "==", region), orderBy("timestamp", "desc"), limit(1))
  );
  return snapshot.docs[0].data();
};
