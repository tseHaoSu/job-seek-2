const Header = ({
  title = "Tools Walkthrough",
  subtitle = "Confidently learn workplace tools through easy, guided walkthroughs. Choose a recommended path or explore on your own to get started.",
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
