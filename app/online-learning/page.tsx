import Banner from "./_components/Banner";
import Categories from "./_components/Categories";
import Header from "./_components/Header";
import Header2 from "./_components/Header2";

const Page = () => {
  return (
    <div className="space-y-20 p-4 sm:px-6 lg:px-8">
      <Header />
      <Banner />
      <Header2 />
      <Categories />
      <Header2
        title="Get recommendation"
        subtitle="Take a quick test and let us help you choose a course to start studying"
      />
    </div>
  );
};

export default Page;
