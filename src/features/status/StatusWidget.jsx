import { useStatus } from "./useStatus";

export default function StatusWidget() {
  const { status, loading } = useStatus();

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      {loading ? (
        <p className="text-gray-500">Loading API...</p>
      ) : (
        <p className="text-cyan-400 text-xl">
          API STATUS → {status}
        </p>
      )}
    </div>
  );
}
