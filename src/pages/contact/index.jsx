import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ContactMap from "./components/Map";
import ContactInfo from "./components/ContactInfo";
import RegisterForm from "../../components/Forms/RegisterForm";
const ContactPage = () => {
  return (
    <div>
      <PageHeader text={"We Are Happy To Hear From You"} />
      <div className="flex flex-col justify-center items-center pb-12">
        <div className="w-[80vw] bg-ServicesBackGround backdrop-blur-[21px] h-full shadow-lg -mt-[15vh] rounded-md grid md:grid-cols-2 place-items-center lg:p-20 space-y-12 border-[1px] border-white/80 border-r-white/70 border-b-white/70">
          <div className="w-[80%]">
            <RegisterForm />
          </div>
          <div className="w-[80%] h-full">
            <ContactInfo />
          </div>
          <div className="col-span-full w-[90%] h-[50vh]">
            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
