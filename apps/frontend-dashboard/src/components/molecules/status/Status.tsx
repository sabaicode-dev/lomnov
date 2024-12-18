interface StatusProps {
  status: boolean; // Status fetched from the database
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className="w-[100%] mt-[40px] text-[14px]">
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Status</h2>
        <div className="mt-4 flex items-center space-x-3">
          <div
            className={`w-10 h-6 flex items-center rounded-full p-1 ${
              status ? "bg-Primary" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform ${
                status ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {status ? "Public" : "Private"}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {status
            ? "This property is visible to all users."
            : "This property is hidden from all users."}
        </p>
      </div>
    </div>
  );
};

export default Status;
