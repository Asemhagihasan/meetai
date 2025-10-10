import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";

interface Props {
  errorMessage?: string | null;
}

const ErrorAlert = ({ errorMessage }: Props) => {
  if (!errorMessage) return null;

  return (
    <Alert className="bg-destructive/10 border-none">
      <OctagonAlertIcon className="!text-destructive h-4 w-4" />
      <AlertTitle>{errorMessage}</AlertTitle>
    </Alert>
  );
};

export default ErrorAlert;
