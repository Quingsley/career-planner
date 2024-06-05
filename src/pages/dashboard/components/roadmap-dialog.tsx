import { RoadMapResponse } from "../../../common";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent } from "../../../components/ui/dialog";

type Props = {
  data: RoadMapResponse;
  isOpen: boolean;
  role: string;
  onClose: () => void;
};
export function RoadMapDialog(props: Props) {
  const { data, isOpen, onClose, role } = props;

  return (
    <Dialog defaultOpen={isOpen} onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[800px] w-full h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-8 p-6 sm:p-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold"> Career Roadmap</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Become a skilled {role} with this comprehensive roadmap.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold">Who is a {role}?</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{data.aboutTheRole}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Why Become a {role}?</h3>
              <ul className="space-y-2 mt-2">
                {data.reasonItsAGoodFit.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckIcon className="w-10 h-10 text-green-500 mt-0.5" />
                    <div>{reason}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div>
            <h3 className="text-xl font-bold">What You'll Learn</h3>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Fundamentals of programming and computer science</div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Proficiency in one or more programming languages</div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Web development, including HTML, CSS, and JavaScript</div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Database design and management</div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Software design patterns and architectural principles</div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>Agile development methodologies and project management</div>
              </li>
            </ul>
          </div> */}
          <div>
            <h3 className="text-xl font-bold">Career Roadmap</h3>
            <ol className="space-y-4 mt-2">
              {data.roadmap.map((entry, index) =>
                Object.entries(entry).map(([key, value]) => (
                  <li key={index}>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-900 dark:bg-gray-50 rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-50 dark:text-gray-900">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-bold">{key}</h4>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{value}</p>
                  </li>
                )),
              )}
            </ol>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
