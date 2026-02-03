import Form from "../components/Form";

const ContactUs = () => {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-[#dbe9ea] pt-32 pb-20 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-600">
          Have a question or want to work with us? We’re here to help.
        </p>
      </section>

      {/* FORM + NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#e6f1f2] rounded-2xl p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Phone" />
            <input className="input md:col-span-2" placeholder="Name" />
            <textarea
              rows="5"
              className="input md:col-span-2"
              placeholder="Message"
            />
            <button className="btn-primary w-fit">
              Submit
            </button>
          </form>
        </div>

        {/* Newsletter */}
        <div className="bg-[#7fa9ad] text-white rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4">Our Newsletter</h3>
          <p className="text-sm opacity-90 mb-6">
            Subscribe to get updates directly in your inbox.
          </p>
          <input className="input mb-4 text-black" placeholder="Email" />
          <button className="btn-dark w-full">Subscribe</button>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Phone" value="+91 98765 43210" />
        <InfoCard title="Email" value="contact@startup.com" />
        <InfoCard title="Location" value="Bangalore, India" />
      </section>

      {/* MAP */}
      <section className="px-6 pb-20">
        <iframe
          title="map"
          className="w-full h-[350px] rounded-2xl border"
          src="https://www.google.com/maps?q=bangalore&output=embed"
          loading="lazy"
        />
      </section>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-[#e6f1f2] rounded-2xl p-6 text-center">
    <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{value}</p>
  </div>
);

export default ContactUs;
