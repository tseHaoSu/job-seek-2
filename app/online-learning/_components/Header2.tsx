const Header = ({
  title = "Tools Walkthrough",
  subtitle = "Navigate the job market with ease using practical, guided tools built to support your journey! Course Tools provide commonly used communication and practical tools. Choose recommended tools or select your own. Each tool includes a walkthrough to help you get started.",
}) => {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl font-extrabold lg:text-4xl text-red-900 leading-tight">
        {title}
      </h1>
      <h3 className="text-xl md:text-l text-gray-700 leading-relaxed">
        {subtitle}
      </h3>
    </div>
  );
};

export default Header;
