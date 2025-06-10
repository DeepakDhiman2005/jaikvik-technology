import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const CRMPage: React.FC = () => {
  useEffect(() => {
    const jtInitAnimations = () => {
      const elements = document.querySelectorAll(
        ".jt-content-block, .jt-section-heading"
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      elements.forEach((element) => observer.observe(element));
    };

    const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(
            anchor.getAttribute("href") as string
          );
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    };

    const handleExpandButtons = () => {
      document.querySelectorAll(".jt-expand-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const section = button.getAttribute("data-section");
          const content =
            button.parentElement?.querySelector(".jt-expand-content");
          const ellipsis = button.parentElement?.querySelector(".ellipsis");
          if (
            content &&
            (content.style.display === "none" || !content.style.display)
          ) {
            content.style.display = "inline";
            if (ellipsis) ellipsis.style.display = "none";
            button.textContent = "Read Less";
          } else if (content) {
            content.style.display = "none";
            if (ellipsis) ellipsis.style.display = "inline";
            button.textContent = "Read More";
          }
        });
      });
    };

    window.addEventListener("load", () => {
      jtInitAnimations();
      handleSmoothScroll();
      handleExpandButtons();
    });

    return () => {
      window.removeEventListener("load", jtInitAnimations);
    };
  }, []);

  return (
    <div className="font-poppins text-white bg-black m-0 p-0 box-border relative z-0 scroll-smooth">
      <style>
        {`
          @keyframes jt-slideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes jt-typing {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes jt-blink-caret {
            50% { border-color: transparent; }
          }
          @keyframes jt-fadeIn {
            to { opacity: 1; }
          }
          @keyframes jt-revealText {
            0% { transform: scaleX(1); }
            100% { transform: scaleX(0); }
          }
        `}
      </style>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white text-center z-10 overflow-hidden"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1733306696471-807493ff845b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q1JNfGVufDB8fDB8fHww')`,
        }}
        aria-label="CRM Solutions Hero"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 animate-[jt-slideIn_1.2s_ease-out_forwards] px-5 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold overflow-hidden whitespace-normal border-r-4 border-red-600 animate-[jt-typing_4s_steps(50,end),jt-blink-caret_0.8s_step-end_infinite] mx-auto">
            Transform Your Business with CRM
          </h1>
          <p className="text-lg sm:text-xl mt-5 animate-[jt-fadeIn_1.5s_ease-out_0.5s_forwards] opacity-0">
            Unlock the power of customer relationships with Jaikvik Technology
          </p>
          <a
            href="#jt-crm-overview"
            className="inline-block bg-red-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer mt-4 text-sm font-medium transition-all duration-400 ease hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
            role="button"
            aria-label="Explore CRM Solutions"
          >
            Explore Now
            <FaArrowRight className="inline ml-2" />
            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-left duration-600 ease group-hover:left-full"></span>
          </a>
        </div>
      </section>

      <div
        className="w-full mx-auto px-5 py-8 relative z-20 bg-black"
        id="jt-crm-overview"
      >
        <div className="my-10 bg-gray-800 p-5 rounded-xl">
          {/* What is CRM Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-gray-800 p-5 mb-8 rounded-xl shadow-md opacity-0 translate-y-10 transition-all duration-1000 ease-out jt-content-block">
            <div className="flex-1 flex flex-col items-start justify-center w-full">
              <h2 className="relative text-xl sm:text-2xl font-semibold text-white mb-6 opacity-0 translate-y-8 transition-all duration-800 ease-out jt-section-heading">
                What Is CRM?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                CRM, which stands for Customer Relationship Management, refers
                to a strategic method of interacting with a company and its
                present and potential customers. It combines technology,
                processes, and data to efficiently operate sales, marketing, and
                consumer care.
                <br />
                CRMs act as a central house for businesses to keep some vital
                information on their customers: contact information, sales
                history, communication logs, etc. It is not merely a large
                database but a business operation backbone encouraging staff
                collaboration, automation of mundane tasks, and the construction
                of a genuine camaraderie with its clientele.
                <br />
                Modern CRMs feature artificial Intelligence insights as well as
                the possibility of integrating more advanced ways for
                achievement purposes, which help a business significantly
                forward its capacity to make clear, goal-aligning decisions. In
                the end, it is a principle of a customer strategy applicable to
                businesses in all territories, regardless of their size or
                industry.<span className="ellipsis">...</span>
                <span className="jt-expand-content hidden">
                  <br />
                  At Jaikvik Technology, our CRM solutions are designed to
                  empower businesses by integrating seamlessly with existing
                  systems, offering customizable workflows, and providing
                  real-time insights. Whether you're a small startup or a large
                  enterprise, our CRM adapts to your needs, ensuring you stay
                  connected with your audience at every touchpoint. From lead
                  generation to post-sale support, CRM transforms how businesses
                  nurture relationships and drive growth.
                  <br />
                  In today's fast-paced digital landscape, businesses must
                  prioritize customer relationships to stay competitive. A CRM
                  system is not just a tool but a strategic asset that helps
                  companies understand their customers better, anticipate their
                  needs, and deliver exceptional experiences. By leveraging CRM,
                  businesses can foster long-term loyalty, drive repeat sales,
                  and build a strong brand reputation. For instance, a retail
                  business using CRM can analyze customer purchase patterns to
                  offer personalized discounts, while a healthcare provider can
                  use it to send timely reminders for appointments, reducing
                  no-shows and improving patient satisfaction.
                </span>
              </p>
              <button
                className="bg-red-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer mt-4 text-sm font-medium transition-all duration-400 ease hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group jt-expand-btn"
                data-section="0"
                aria-label="Toggle CRM Description"
              >
                Read More
                <FaArrowRight className="inline ml-2" />
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-left duration-600 ease group-hover:left-full"></span>
              </button>
            </div>
            <img
              src="https://img.freepik.com/free-vector/flat-design-crm-illustration_23-2149364431.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
              alt="CRM Solutions"
              className="w-full max-w-md md:max-w-lg max-h-[900px] rounded-xl transition-all duration-500 ease brightness-75 contrast-110 hover:brightness-100 hover:scale-105"
            />
          </div>

          {/* What Does CRM Do Section */}
          <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-8 bg-gray-800 p-5 mb-8 rounded-xl shadow-md opacity-0 translate-y-10 transition-all duration-1000 ease-out jt-content-block">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-crm-infographic_23-2149388654.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
              alt="CRM Features"
              className="w-full max-w-md md:max-w-lg max-h-[450px] rounded-xl transition-all duration-500 ease brightness-75 contrast-110 hover:brightness-100 hover:scale-105"
            />
            <div className="flex-1 flex flex-col items-start justify-center w-full">
              <h2 className="relative text-xl sm:text-2xl font-semibold text-white mb-6 opacity-0 translate-y-8 transition-all duration-800 ease-out jt-section-heading">
                What Does CRM Do?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                At its core, a CRM is designed to aid businesses in organizing,
                tracking, and enhancing their interactions with customers. Here
                is the rundown on its functionality:
                <br />
                <strong>Centralizing Customer Data</strong>
                <br />
                Every detail concerning a customer is to be managed by the CRM
                in a single database. This embraces such insightful facts as
                contact details, sales history, preferences, and communication
                threads. This in turn guarantees that information does not get
                lost or overlooked and is instantly available to responsible
                units.
                <br />
                <strong>Administering Sales Pipelines</strong>
                <br />
                A CRM system is able to monitor leads along several stages of
                the sales process. This empowers salespeople to see who is most
                likely to convert and where efforts should be concentrated.
                <br />
                <span className="ellipsis">...</span>
                <span className="jt-expand-content hidden">
                  <strong>Automation of Repetitive Tasks</strong>
                  <br />
                  In essence, an application that is CRM-based can automate
                  tasks. Such tasks include email follow-ups, reminders,
                  invoicing, and many others. Democratizing workflow could
                  streamline operations while reducing error margin and time
                  needed while maintaining overall quality control
                  <br />
                  <strong>Marketing Tools</strong>
                  <br />
                  Built-in the same system, CRM provides marketing automation
                  with a program automatizing campaign preparation, audience
                  segments, and an overarching view on one's marketing ROI.
                  <br />
                  <strong>Customer Support</strong>
                  <br />
                  CRM can be useful in solving helpdesk inquiries, complaints,
                  and service requests to make sure that every single customer
                  experiences the best disposition in a commensurate and timely
                  response.
                  <br />
                  Beyond these essentials, Jaikvik Technology's CRM offers
                  advanced features like AI-driven predictive analytics to
                  forecast customer behavior, mobile app access for on-the-go
                  management, and integration with tools like Slack, Google
                  Workspace, and accounting software. This ensures your team
                  stays productive and your customers stay engaged, no matter
                  where business takes you.
                </span>
              </p>
              <button
                className="bg-red-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer mt-4 text-sm font-medium transition-all duration-400 ease hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group jt-expand-btn"
                data-section="1"
                aria-label="Toggle CRM Functionality"
              >
                Read More
                <FaArrowRight className="inline ml-2" />
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-left duration-600 ease group-hover:left-full"></span>
              </button>
            </div>
          </div>

          {/* Why Should Enterprises Opt for CRMs Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-gray-800 p-5 mb-8 rounded-xl shadow-md opacity-0 translate-y-10 transition-all duration-1000 ease-out jt-content-block">
            <div className="flex-1 flex flex-col items-start justify-center w-full">
              <h2 className="relative text-xl sm:text-2xl font-semibold text-white mb-6 opacity-0 translate-y-8 transition-all duration-800 ease-out jt-section-heading">
                Why Should Enterprises Opt for CRMs?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                There are so many reasons why CRM systems are essential:
                <br />
                <strong>Customer-Centric:</strong> This is vital in creating and
                sustaining strong customer satisfaction through personalized
                care.
                <br />
                <strong>Insight into Data:</strong> Harnessing analytical
                functionalities, a CRM makes it possible to comport data into
                palatable, relevant understandings that can guide forecasting,
                measurement, and opportunity identification accurately.
                <br />
                <strong>Scalability:</strong> It is good to note that CRMs are
                adaptable to businesses of any size, growing with the
                organization.
                <br />
                <strong>Increased Efficiency:</strong> By allowing hands-free
                attention to lower priorities during the progress of tasks, CRM
                brings higher efficiency to the business.
                <br />
                <span className="ellipsis">...</span>
                <span className="jt-expand-content hidden">
                  <strong>Savings in Cost:</strong> Removing manual effort and
                  thus improving productivity while helping eliminate potential
                  errors offers far-reaching resource savings for the business.
                  <br />
                  <strong>Essential Blocks Of CRM</strong>
                  <br />
                  A fully functional CRM system generally consists of the
                  following core components:
                  <br />
                  <strong>Contact Management</strong>
                  <br />
                  Base-structured entities of all CRM. It forever seeks to
                  arrange all customer information into manageable forms for
                  easy retrieval and use
                  <br />
                  <strong>Sales Automation</strong>
                  <br />
                  Sales aggregation tool for leads, deals, and tracking
                  activities at each stage of a sales cycle.
                  <br />
                  <strong>Marketing Integration</strong>
                  <br />
                  Email or campaign track worsens with audience segmentation;
                  Marketing tools form part of CRM for many companies.
                  <br />
                  <strong>Customer Service Desk</strong>
                  <br />
                  Manifold interweaving with customer service would mean dealing
                  with service tickets and inquiries into pertinent information
                  concerning various CRM modules.
                  <br />
                  <strong>Analytics and Reports</strong>
                  <br />
                  Mitigate in-depth business analytics from reporting tools; it
                  shows performance with clients, customer behavior, and market
                  trends.
                  <br />
                  <strong>Collaboration Tools</strong>
                  <br />
                  Occupy unique calendars amongst others, which encourage
                  teamwork, be in task management, unified communication, or
                  discussion mode.
                  <br />
                  Enterprises choosing Jaikvik Technology's CRM also benefit
                  from enhanced security with encrypted data storage, 24/7
                  customer support, and regular updates that keep your system
                  ahead of industry trends. Studies show businesses using CRM
                  can see up to a 300% increase in lead conversion rates and a
                  30% reduction in operational costs—proof that CRM isn't just a
                  tool, it's a competitive advantage.
                </span>
              </p>
              <button
                className="bg-red-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer mt-4 text-sm font-medium transition-all duration-400 ease hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group jt-expand-btn"
                data-section="2"
                aria-label="Toggle CRM Benefits"
              >
                Read More
                <FaArrowRight className="inline ml-2" />
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-left duration-600 ease group-hover:left-full"></span>
              </button>
            </div>
            <img
              src="https://img.freepik.com/free-vector/gradient-crm-illustration_23-2149379653.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
              alt="CRM Benefits"
              className="w-full max-w-md md:max-w-lg max-h-[450px] rounded-xl transition-all duration-500 ease brightness-75 contrast-110 hover:brightness-100 hover:scale-105"
            />
          </div>

          {/* CRM for Different Ventures Section */}
          <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-8 bg-gray-800 p-5 mb-8 rounded-xl shadow-md opacity-0 translate-y-10 transition-all duration-1000 ease-out jt-content-block">
            <img
              src="https://img.freepik.com/free-vector/gradient-crm-infographic_23-2149379654.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
              alt="CRM Use Cases"
              className="w-full max-w-md md:max-w-lg max-h-[450px] rounded-xl transition-all duration-500 ease brightness-75 contrast-110 hover:brightness-100 hover:scale-105"
            />
            <div className="flex-1 flex flex-col items-start justify-center w-full">
              <h2 className="relative text-xl sm:text-2xl font-semibold text-white mb-6 opacity-0 translate-y-8 transition-all duration-800 ease-out jt-section-heading">
                CRM for Different Ventures
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
                The use of CRMs has advanced in many industries today. It allows
                the provision of tailor-made solutions for meeting specified
                operational needs. An overview is now presented for how various
                industries employ CRM for increased efficiency and to better
                customer relationships:
                <br />
                <strong>1. Retail and E-commerce</strong>
                <br />
                ● CRMs help retailers to track customer preferences, monitor
                customer habits of purchase, and produce custom marketing
                promotions.
                <br />
                ● For their part, e-commerce platforms utilize CRM information
                to serve customer requirements better with custom offers or deal
                with loyalty programs and cases optimized for convenient
                shopping.
                <br />
                <strong>2. Healthcare</strong>
                <br />
                ● Where patient details, appointments for checkups, and
                medication refill notices are concerned, CRMs help keep an
                updated patient index.
                <br />
                <span className="ellipsis">...</span>
                <span className="jt-expand-content hidden">
                  ● On further reflection, they resume a digitized treatment
                  history and provide a bridge for seamless interaction between
                  medical staff and clients.
                  <br />
                  <strong>3. Real Estate</strong>
                  <br />
                  ● CRM helps real estate agents manage property listings,
                  monitor customer inquiries, and track the sales cycle.
                  <br />
                  ● Agents use the CRM for follow-ups and also to supply timely
                  updates to clients on properties
                  <br />
                  <strong>4. Nonprofit Organizations</strong>
                  <br />
                  ● CRM has empowered nonprofit organizations to develop
                  strategies of fundraising besides administering campaigns to
                  reach their governing bodies and donors.
                  <br />
                  ● CRM-based key performance indicators support donor
                  development immensely.
                  <br />
                  ● The crux of CRM, as a tool, is to enable impactful donor
                  engagement.
                  <br />
                  <strong>5. B2B Enterprises</strong>
                  <br />
                  CRMs for B2B businesses are considered handy for generating
                  leads, nurturing relationships, and making sales forecasts.
                  Their common application includes the management of long-term
                  contracts and for effective execution of inter-divisional
                  coordination.
                  <br />
                  <strong>6. Education</strong>
                  <br />
                  ● CRMs are used by schools, colleges, and training centers to
                  manage student applications, monitor enrollment data, and
                  maintain alumni relationships.
                  <br />
                  ● They help enhance interdepartmental communication, staff
                  communication, and communication with guardians.
                  <br />
                  <strong>7. Hospitality</strong>
                  <br />
                  ● Hoteliers and F&B providers are very popular users. CRM
                  tools allow the tracking of preferences of guests concerning
                  hospitality, reservations, and other similar services.
                  <br />
                  ● They can also keep channelized promotional messages to
                  retain loyal customers.
                  <br />
                  ● CRMs remain very adaptable to specific industry
                  requirements, assisting organizations in literally anything
                  when it comes to operational excellence and building long-term
                  relationships with their clients.
                  <br />
                  <strong>Business-to-Business Contacts</strong>
                  <br />
                  CRM is a source of lead generation capacity, which might lead
                  to nurturing a 10-15-year partnership, far longer than what
                  most people right now could envisage. For B2B, one additional
                  service involves collaboration within internal teams to
                  ascertain their customer/deal-follow issues faster than
                  everyone else arduous, time-saving efforts with positive
                  outcomes like improving profit expectations for forecasting
                  sales revenues, service and consultation processes, etc.
                  <br />
                  <strong>Who Can Implement CRM?</strong>
                  <br />
                  The use of CRMs is not reserved for a particular industry or
                  business size. Their versatility and adaptability have led to
                  them serving users in a broad variety of areas. The following
                  is a breakdown of some CRM users:
                  <br />
                  <strong>1. Small Businesses</strong>
                  <br />
                  ● Most small businesses do not have the resources to boast
                  about more complicated procedures hence the importance of CRM
                  in pushing the consolidation of their work.
                  <br />
                  ● It helps in tracking leads, automating follow-up, and
                  managing data entry until you have a large team to help.
                  <br />
                  <strong>2. Big Enterprises</strong>
                  <br />
                  ● Large organizations are bound to have distributions of CRMs
                  to control their vast client bases as well as employ huge
                  numbers of sales pipelines and an array of complex layers of
                  marketing systems.
                  <br />
                  ● With advanced analytics and integration capabilities, this
                  tool brings together data for various departments, leading to
                  efficiency and collaboration.
                  <br />
                  <strong>3. Sales Teams</strong>
                  <br />
                  ● Sales executives need CRM to be the hub of their lead
                  tracking, deal management as well as automating routine work
                  like follow-ups and data entry.
                  <br />
                  ● This system provides visibility over a sales pipeline with a
                  more solid support to forecasting and performance tracking.
                  <br />
                  <strong>4. Marketing Teams</strong>
                  <br />
                  ● CRM gives marketing people the ability to segment their
                  market, craft personalized campaigns, and measure the impact
                  on ROI.
                  <br />
                  ● It is indispensable for old-fashioned digital marketing with
                  its email automation, social media tracking, and campaign
                  analytics.
                  <br />
                  <strong>5. Customer Service Teams</strong>
                  <br />
                  CRMs make the ticket resolution quicker and more efficient for
                  service representatives and retain for them the files on what
                  interaction each customer has had with them. So it is about
                  customer happiness and retention.
                  <br />
                  <strong>6. Freelancers and Consultants</strong>
                  <br />
                  ● Freelancers and independent consultants turn to CRMs to
                  manage their client base, track project deadlines, and
                  schedule follow-ups.
                  <br />
                  ● Invoicing and reporting have been simplified by CRMs so that
                  they can lighten their focus on their real services.
                  <br />
                  <strong>7. Nonprofit Organizations</strong>
                  <br />
                  ● CRMs have empowered nonprofits to manage donor
                  relationships, plan fundraising campaigns, and track volunteer
                  activities.
                  <br />
                  ● They foster optimization of outreach strategies to maximize
                  impact.
                  <br />
                  <strong>8. Educational Institutions</strong>
                  <br />
                  ● Universities and schools use CRM to streamline enrollment,
                  manage student information, and create alumni relations.
                  <br />
                  ● They also tie staff, students, and parents for enhanced
                  communication.
                  <br />
                  <strong>9. Healthcare Providers</strong>
                  <br />
                  ● Healthcare service providers use CRMs for patient record
                  management, appointment organization, and treatment plan
                  management.
                  <br />
                  ● This improves the patient's care and operational efficiency.
                  <br />
                  <strong>10. E-commerce Platforms</strong>
                  <br />
                  ● CRMs are vital to tracking customer activities and
                  interactions for e-commerce businesses, managing stimulus
                  programs, or simply making product suggestions via
                  recommendations.
                  <br />
                  ● They also increase retention by allowing for solid
                  personalized shopping experiences.
                  <br />
                  <strong>11. Real Estate Agents</strong>
                  <br />
                  ● Real estate practitioners capitalize on CRMs to manage
                  property listings, customize email campaign activities for
                  each client's interest, and make appointments with their
                  clients.
                  <br />
                  ● It helps in building a good client relationship in the long
                  run.
                  <br />
                  A definable feature of CRMs is that it presents numerous
                  possibilities and scalability making them ideal for anyone
                  needing effective customer relationship management, increased
                  efficiency, and better business growth. Whichever level you
                  are on, solo entrepreneur to multinational corporation, CRM
                  will be the change that turns all the events for you by
                  nurturing the success and growth of managing your
                  interactions.
                  <br />
                  <strong>Benefits of Using a CRM</strong>
                  <br />
                  A CRM system is not just like any ordinary software available
                  in the market. Instead, it is considered to be very
                  influential at changing the way business is conducted. They
                  help businesses in their levels of automation and data-driven
                  marketing acceleration.
                  <br />
                  <strong>
                    Improved Business-Customer Relationships:
                  </strong>{" "}
                  This implies a more specialized customer service experience,
                  hence an immediate leap in customer satisfaction and loyalty.
                  <br />
                  <strong>Streamline Business Processes:</strong> Automation in
                  streamlining processes gives its user's businesses an
                  invaluable relief from burden.
                  <br />
                  <strong>Enhanced Sales Performance:</strong> Data-based
                  information provided within CRMs could sooner than later help
                  the sales/ISP to push through leads driving into winners for
                  the company.
                  <br />
                  <strong>Improved Collaboration:</strong> SinceRD it
                  facilitates fast and efficient data accessibility; much
                  expectantly this fosters good teamwork.
                  <br />
                  <strong>Reduced Costs:</strong> By doing away with manual
                  administrative activities, CRMs can cut down operational costs
                  caused by inefficiencies and incomplete projects, meaning CRMs
                  serve as cost-effective machines.
                  <br />
                  <strong>Key Attributes of CRM</strong>
                  <br />
                  Modern CRMs feature capabilities designed specifically around
                  recent business-centric needs:
                  <br />
                  <strong>Personalized Dashboards</strong>
                  <br />
                  As one would find with a wide variety of applications, these
                  usually grant the user a deep-level, personal view of his/her
                  tasks, priorities, and other carefully mapped metrics across
                  real-time-competitive levels.
                  <br />
                  <strong>Mobile Access</strong>
                  <br />
                  Access through a mobile device has lately turned into an
                  essential means for productivity.
                  <br />
                  <strong>AI Insights</strong>
                  <br />
                  Using the ever-popular term, it is generally "big data"-CRM
                  insight cycles that lead to forecasting, as well as directing
                  correct data, at scalable levels of pace and capacity using AI
                  logic.
                  <br />
                  <strong>Automation of Tasks</strong>
                  <br />
                  Sequencing through the workflow to automate post-task
                  activities to leverage resources.
                  <br />
                  <strong>Implementing a CRM</strong>
                  <br />
                  The CRM application should be able to connect with an email
                  application, e-commerce platform, or an accounting program.
                  <br />
                  <strong>Implementing a CRM Solution</strong>
                  <br />
                  The step on which everything else relies—PREPARE YOURSELF and
                  be prepared. And to dazzle on all fronts, CRM changeover wants
                  to be:
                  <br />
                  <strong>Set Goals</strong>
                  <br />
                  Define the reason for purchasing your system, for instance,
                  better customer service, streamlining of sales, or
                  simplification of processes.
                  <br />
                  <strong>Choose a CRM Platform</strong>
                  <br />
                  Review different CRM solutions until you find one that fits
                  your goals.
                  <br />
                  <strong>Train Your Team</strong>
                  <br />
                  Help your team become familiar with the software.
                  <br />
                  <strong>Migrating Data</strong>
                  <br />
                  Get the current customer data into the new CRM with good
                  diligence enforced for accuracy and timeliness.
                  <br />
                  <strong>Monitor and Evaluate</strong>
                  <br />
                  Define these benchmarks to monitor: user adoption, task
                  completion time, and customer response to CRM functions should
                  be reasonable and based on the time remaining.
                  <br />
                  <strong>
                    Embark Your CRM Journey with Jaikvik Technology
                  </strong>
                  <br />
                  Undertaking your CRM travel with Jaikvik Technology will
                  carefully encompass the needs of your business. We dedicate
                  several forces in creating innovative CRM strategies that will
                  facilitate broader networking, enhance efficiency, and bring
                  about business growth. The team of professionals works
                  together with you in a very close embrace to seek an
                  understanding of all of your specific business requirements
                  and to suggest the ideal CRM strategy and tools that would
                  inject commerce elixir into your business model.
                  <br />
                  Jaikvik Technology is considered one of the best software
                  companies in Delhi NCR that provides CRM solutions. Tailored
                  exclusively to lift customer satisfaction levels, streamline
                  sales channels, and enhance productivity, Jaikvik's CRM
                  Solutions can be custom-fitted to the needs of any buyer. CRM
                  solutions offer 100% flexibility, range, and user-friendliness
                  to facilitate easy interaction with your existing systems to
                  enable you to cater to your customer data management, track
                  today's interactions in your customer life, and automate the
                  best possible business process.
                  <br />
                  Get into Jaikvik Technology for an all-inclusive,
                  customer-generating environment with a huge competitive
                  advantage. Allow us to redefine customer engagement
                  capabilities and grow your business beyond that level!
                  <br />
                  <strong>
                    Here are 6 frequently asked questions (FAQs) for CRM:
                  </strong>
                  <br />
                  <strong>
                    1. Define CRM and how it is significant for a Business.
                  </strong>
                  <br />
                  CRM stands for Customer Relationship Management. It is a tool
                  used to also further manage operations, streamline processes,
                  and increase important customer relationships. It is important
                  for centralizing information, which improves customer
                  satisfaction, enhances team collaboration, and culminates in
                  increased sales and profitability as workflows are automated
                  and useful insights help in decision-making.
                  <br />
                  <strong>2. Is CRM useful for small businesses?</strong>
                  <br />
                  Yes, small businesses can benefit from using CRM. However,
                  it's not just for large corporations.
                  <br />
                  CRMs organize customer data automate it, or even personalize
                  communication. This would lead to streamlined efficiencies,
                  time management, and positive customer experiences without
                  spending too much money on resources.
                  <br />
                  <strong>
                    3. What are the primary features to be looked at in a CRM?
                  </strong>
                  <br />
                  The CRM provides some key features to these following:
                  <br />
                  ● Contact and lead management
                  <br />
                  ● Sales pipeline tracking
                  <br />
                  ● Marketing automation
                  <br />
                  ● Reporting and analytics
                  <br />
                  ● Integration with other tools (Email, Calendars, etc.)
                  <br />
                  ● Mobile Accessibility
                  <br />
                  The functionalities above increase productivity and
                  decision-making.
                  <br />
                  <strong>
                    4. How can CRM contribute to customer satisfaction?
                  </strong>
                  <br />
                  Well, CRM provides user data, interaction records, and insight
                  into customer preferences. This allows businesses to deliver
                  personalized services, stretch a hand in responding promptly
                  to concerns, and waste their time on issues to achieve a
                  higher degree of satisfaction and loyalty from the customer.
                  <br />
                  <strong>5. How difficult is it to implement a CRM?</strong>
                  <br />
                  The implementation of CRM varies case by case depending on the
                  complexity of the system and the size of the business.
                  However, several CRMs offer interfaces that are easy to use
                  and onboarding support for training and tutorials. Going
                  forward, working with a CRM implementation team will simplify
                  the process.
                  <br />
                  <strong>
                    6. Can CRM integrate with other tools and software?
                  </strong>
                  <br />
                  In short, yes. Most of the modern and latest CRM versions
                  easily integrate with lots of other tools and software, mainly
                  emails, project management, e-commerce storefronts, and
                  accounting software. Such integrations facilitate smooth
                  workflows and harmonized data sync between each of your
                  business systems.
                  <br />
                  Additionally, Jaikvik Technology's CRM supports industries
                  like manufacturing (for supply chain management), hospitality
                  (for guest experience tracking), and finance (for client
                  portfolio management). For example, a retail business might
                  use our CRM to reduce cart abandonment by 25% through
                  automated reminders, while a healthcare provider could cut
                  appointment no-shows by 15% with SMS notifications. Whatever
                  your sector, our CRM delivers measurable results tailored to
                  your unique challenges.
                </span>
              </p>
              <button
                className="bg-red-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer mt-4 text-sm font-medium transition-all duration-400 ease hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group jt-expand-btn"
                data-section="3"
                aria-label="Toggle CRM Use Cases"
              >
                Read More
                <FaArrowRight className="inline ml-2" />
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-left duration-600 ease group-hover:left-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPage;
