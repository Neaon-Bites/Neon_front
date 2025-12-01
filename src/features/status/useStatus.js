import { useEffect, useState } from "react";
import { api } from "../../api/apiClient";

export const useStatus = () => {
  const [status, setStatus] = useState("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/ping/")
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false));
  }, []);

  return { status, loading };
};
