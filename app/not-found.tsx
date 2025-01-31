import { BODY_EXTRA_MARGIN } from "@/domain/constants";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center" style={{ minHeight: BODY_EXTRA_MARGIN }}>
      <h2>Not Found</h2>
    </div>
  );
}
