import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import FeaturedBrandsSlider from '@/components/Home/FeaturedBrand/FeaturedBrandsSlider';
import HeroSlider from '@/components/Home/HeroSlider/HeroSlider';
import DealProduct from '@/components/Home/DealProduct';
import CategorySection from '@/components/Home/Categorysection';
import Banner from '@/components/Home/Banner';

const Home = () => {
  return (
    <DefaultLayout>
      <HeroSlider />
      <div className="mx-auto">
        <CategorySection />
      
    
      <Featured />
      <FeaturedBrandsSlider />
      
      <Banner />
      <DealProduct />

      <Testimonial />
      </div>
    </DefaultLayout>
  );
};

export default Home;
