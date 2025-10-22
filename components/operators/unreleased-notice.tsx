import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function UnreleasedNotice({ contentType }: {contentType?: string}) {
  return (
    <Alert className="mb-4">
      <AlertCircleIcon />
      <AlertTitle>
        {contentType
          ? `This ${contentType} is not yet available on the Global server of Arknights.`
          : "This content is not yet available on the Global server of Arknights."}
      </AlertTitle>
    </Alert>
  );
}
