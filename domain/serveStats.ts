import { db } from "@/firebase/config";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export const serveStats = async (region: string) => {
  const statsRef = collection(db, "snapshot");
  const snapshot = await getDocs(
    query(
      statsRef,
      where("region", "==", region),
      where("is_prod", "==", "true"),
      orderBy("timestamp", "desc"),
      limit(1)
    )
  );
  return snapshot.docs[0].data();
};
