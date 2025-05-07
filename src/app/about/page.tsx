import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';

const About = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-100 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg border border-gray-200">
          <h1 className="mb-6 text-3xl font-semibold text-teal-800">
            About Gadgets-Hub
          </h1>

          <p className="mb-4 text-lg text-gray-800">
            At <span className="font-bold text-teal-600">Gadgets-Hub</span>, we aim to transform the way you discover, buy, and interact with the latest tech and gadgets. Our mission is simple: bring cutting-edge electronics and accessories to your doorstep with ease and reliability.
          </p>

          <p className="mb-4 text-lg text-gray-800">
            Founded by a group of technology enthusiasts, Gadgets-Hub offers an online shopping platform where you can browse the latest smartphones, laptops, wearables, gaming gear, and more—all with the convenience of quick delivery and seamless customer service.
          </p>

          <p className="mb-4 text-lg text-gray-800">
            Whether you&#39;re a gamer, a professional, or someone who loves the latest tech, we have products to meet your needs. Our platform is designed to be intuitive, mobile-friendly, and secure, ensuring a smooth shopping experience.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-teal-700">
            Why Choose Gadgets-Hub?
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Exclusive access to the latest tech gadgets</li>
            <li>Fast and secure delivery options</li>
            <li>24/7 customer support via chat, email, and phone</li>
            <li>Easy-to-use, mobile-friendly shopping experience</li>
            <li>Trusted by thousands of gadget enthusiasts worldwide</li>
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-teal-700">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700">
            To become the leading online destination for gadget lovers, offering an extensive range of high-quality electronics and accessories, while ensuring an unmatched customer experience.
          </p>

          <div className="mt-10 text-sm text-gray-500">
            <p>📍 Head Office: 123 Tech Avenue, Silicon Valley, USA</p>
            <p>📞 Helpline: +1 800 123 4567</p>
            <p>📧 Email: support@gadgetshub.com</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
