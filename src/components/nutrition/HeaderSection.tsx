import { CalendarIcon } from '@heroicons/react/24/solid';

export default function HeaderSection({ date }: { date: string }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Pelacak Nutrisi Harian</h1>
                <div className="flex items-center text-gray-600 mt-1">
                    <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
}
