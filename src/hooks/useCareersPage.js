import { useEffect, useState } from "react";

export default function useCareersPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/careers-page")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return data; // { page, jobs } or null while loading
}