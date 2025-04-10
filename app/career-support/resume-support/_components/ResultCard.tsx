import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, XIcon } from "lucide-react";

interface ResultCardProps {
  resumeData: any;
  onClose: () => void;
}

const ResultCard = ({ resumeData, onClose }: ResultCardProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto border-none ">
      <CardHeader className=" border-none">
        <CardTitle className="text-red-800">Generated Resume Guidance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(resumeData).map(([key, value]) => (
            <div
              key={key}
              className="p-4 border-none rounded-md bg-red-50/40"
            >
              <h3 className="font-medium text-red-800 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
              </h3>
              <p className="whitespace-pre-wrap text-gray-700">
                {typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onClose}
          variant="outline"
          className="mr-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          <XIcon size={16} className="mr-1" />
          Close
        </Button>
        <Button className="bg-red-800 hover:bg-red-900 focus:ring-red-400">
          <DownloadIcon size={16} className="mr-1" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
