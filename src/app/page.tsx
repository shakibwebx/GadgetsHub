import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import FeaturedBrandsSlider from '@/components/Home/FeaturedBrand/FeaturedBrandsSlider';
import HeroSlider from '@/components/Home/HeroSlider/HeroSlider';
import DealProduct from '@/components/Home/DealProduct';
import CategorySection from '@/components/Home/Categorysection';

const Home = () => {
  return (
    <DefaultLayout>
      <HeroSlider />
      <div className="mx-auto max-w-7xl">
        <CategorySection />
      {/* <MediCard /> */}
      <FeaturedBrandsSlider />

      <Featured />
      <DealProduct />

      <Testimonial />
      </div>
    </DefaultLayout>
  );
};

export default Home;
