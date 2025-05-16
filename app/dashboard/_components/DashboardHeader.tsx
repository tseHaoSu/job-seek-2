export const DashboardHeader = () => {
  return (
    <div className="mb-8 space-y-15">
      <h1 className="text-3xl font-extrabold text-red-900 mb-4">
        My Dashboard
      </h1>
      <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-md mb-6">
        <h3 className="text-lg md:text-xl text-red-800 text-center">
          Build your own dashboard — your tools, your way.<br />
          <em>
            Pick and arrange the cards that matter most to you and get started
            with your digital journey.
          </em>
        </h3>
      </div>
    </div>
  );
};
