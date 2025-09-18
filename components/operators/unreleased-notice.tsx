import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function UnreleasedNotice({ entityType }: {entityType?: string}) {
  return (
    <Alert className="mb-4">
      <AlertCircleIcon />
      <AlertTitle>
        {entityType
          ? `This ${entityType} is not yet available on the EN server of Arknights.`
          : "This content is not yet available on the EN server of Arknights."}
      </AlertTitle>
    </Alert>
  );
}
